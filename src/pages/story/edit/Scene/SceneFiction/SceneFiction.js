import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createEditor, Editor, Range, Transforms } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { connect, useSelector } from 'react-redux';
import { selectPassages } from '../../../../../store/stories';
import './SceneFiction.css';
import { toSlateContentModel } from './index';
import {
  DefaultElement,
  ExitElement,
  Leaf,
  PassageElement,
  Portal
} from './Elements';

export default connect(null, {})(SceneFiction);

function SceneFiction({ sceneId }) {
  const withExits = editor => {
    const { isInline, isVoid } = editor;

    editor.isInline = element => {
      return element.type === 'exit' ? true : isInline(element);
    };

    editor.isVoid = element => {
      return element.type === 'exit' ? true : isVoid(element);
    };

    return editor;
  };

  const ref = useRef();

  const [exitTarget, setExitTarget] = useState();
  const [exitIndex, setExitIndex] = useState(0);
  const [exitSearch, setExitSearch] = useState('');

  const editor = useMemo(
    () => withExits(withReact(withHistory(createEditor()))),
    []
  );

  const scenePassages = useSelector(selectPassages(sceneId));

  const exits = scenePassages
    .filter(passage =>
      passage.title.toLowerCase().startsWith(exitSearch.toLowerCase())
    )
    .slice(0, 10);

  const [editorState, setEditorState] = useState(
    toSlateContentModel(scenePassages)
  );

  const onFictionChange = state => {
    setEditorState(state);

    const { selection } = editor;

    if (selection) {
      if (Range.isCollapsed(selection)) {
        const [start] = Range.edges(selection);
        const wordBefore = Editor.before(editor, start, { unit: 'word' });
        const before = wordBefore && Editor.before(editor, wordBefore);
        const beforeRange = before && Editor.range(editor, before, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
        const after = Editor.after(editor, start);
        const afterRange = Editor.range(editor, start, after);
        const afterText = Editor.string(editor, afterRange);
        const afterMatch = afterText.match(/^(\s|$)/);

        if (beforeMatch && afterMatch) {
          setExitTarget(beforeRange);
          setExitSearch(beforeMatch[1]);
          setExitIndex(0);
          return;
        }
      }
    }

    setExitTarget(null);
  };

  const onKeyDown = useCallback(
    event => {
      if (exitTarget) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = exitIndex >= exits.length - 1 ? 0 : exitIndex + 1;
            setExitIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = exitIndex <= 0 ? exits.length - 1 : exitIndex - 1;
            setExitIndex(nextIndex);
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, exitTarget);
            insertExit(editor, exits[exitIndex].title);
            setExitTarget(null);
            break;
          case 'Escape':
            event.preventDefault();
            setExitTarget(null);
            break;
          default:
            break;
        }
      }
    },
    [exitIndex, exitTarget, editor, exits]
  );

  const insertExit = (editor, text) => {
    const exit = {
      type: 'exit',
      title: text,
      children: [{ text: '' }]
    };
    console.log('Before', editor.children);
    Transforms.insertNodes(editor, exit);
    console.log('After', JSON.stringify(editor.children));
    Transforms.move(editor);
  };

  const weShouldDisplayTheExitsMenu = useCallback(
    () => exitTarget && exits.length,
    [exitTarget, exits]
  );

  useEffect(() => {
    if (weShouldDisplayTheExitsMenu()) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, exitTarget);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [weShouldDisplayTheExitsMenu, editor, exitTarget]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'passage':
        return <PassageElement {...props} />;
      case 'exit':
        return <ExitElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <div className="scene-fiction">
      <Slate editor={editor} value={editorState} onChange={onFictionChange}>
        <Editable
          onKeyDown={onKeyDown}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
        />

        {weShouldDisplayTheExitsMenu() > 0 && (
          <Portal>
            <div ref={ref} className="exit-picker">
              {exits.map((passage, i) => (
                <div
                  key={passage.id}
                  className={`exit-option ${i === exitIndex ? 'active' : ''}`}
                >
                  {passage.title}
                </div>
              ))}
            </div>
          </Portal>
        )}
      </Slate>
    </div>
  );
}
