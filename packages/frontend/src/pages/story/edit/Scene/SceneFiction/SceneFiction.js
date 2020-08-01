import React, { useMemo, useState } from 'react';
import './SceneFiction.css';

import { createEditor, Node } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import { Icon } from 'semantic-ui-react';

const serializeEditorState = (nodes) =>
  nodes.map((n) => Node.string(n)).join('\n');

export default function SceneFiction({ scene, save }) {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  const [editorState, setEditorState] = useState([
    {
      children: [{ text: scene.content }],
    },
  ]);

  const onFictionChange = (state) => setEditorState(state);

  const saveFiction = () => {
    const fiction = serializeEditorState(editor.children);
    save({ sceneId: scene.id, fiction });
  };

  return (
    <div className="scene-fiction">
      <Slate editor={editor} value={editorState} onChange={onFictionChange}>
        <Toolbar>
          <Button onMouseDown={saveFiction}>
            <Icon name="save" size="large" color="olive" />
          </Button>
        </Toolbar>
        <Editable />
      </Slate>
    </div>
  );
}

const Button = (props) => <span {...props} className={'button'} />;

const Toolbar = (props) => <div {...props} className={'toolbar'} />;
