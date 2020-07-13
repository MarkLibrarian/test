import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { connect, useSelector } from 'react-redux';
import { selectPassages } from '../../../../../store/stories';

import './SceneFiction.css';
import { toSlateContentModel } from './index';
import { DefaultElement, Leaf, PassageElement } from './Leaf';

export default connect(null, {})(SceneFiction);

function SceneFiction({ sceneId }) {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [editorState, setEditorState] = useState(
    toSlateContentModel(
      useSelector(selectPassages(sceneId))
    )
  );

  const onFictionChange = state => {
    setEditorState(state);
  };

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'passage':
        return <PassageElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props =>
    (<Leaf {...props} />), []
  );

  return (
    <div className="scene-fiction">
      <Slate editor={editor}
             value={editorState}
             onChange={onFictionChange}>

        <Editable renderElement={renderElement}
                  renderLeaf={renderLeaf}/>
      </Slate>
    </div>
  );
}
