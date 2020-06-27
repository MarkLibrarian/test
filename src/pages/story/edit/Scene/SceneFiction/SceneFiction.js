import React from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import { useTranslation } from 'react-i18next';
import { connect, useSelector } from 'react-redux';
import { selectPassages } from '../../../../../store/stories';

import './SceneFiction.css';
import 'draft-js/dist/Draft.css';

export default connect(null, {})(SceneFiction);

function SceneFiction({ sceneId }) {
  const { t } = useTranslation();
  const passages = useSelector(selectPassages(sceneId));
  const passagesAsContent = passages.map(passage => passage.text).join('\n\n');

  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(
      ContentState.createFromText(passagesAsContent)
    )
  );

  const onFictionChange = state => {
    setEditorState(state);
  };

  return (
    <div className="scene-fiction">
      <Editor
        editorState={editorState}
        placeholder={t('scene.placeholder.text')}
        stripPastedStyles={true}
        onChange={onFictionChange}
      />
    </div>
  );
}
