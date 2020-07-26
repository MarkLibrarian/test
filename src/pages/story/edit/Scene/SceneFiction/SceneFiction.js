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
import { newPassage, selectPassages } from '../../../../../store/stories';
import './SceneFiction.css';
import {
  defaultNewPassageSlateContent,
  toSlateContent,
  toSlateExit,
  toSlatePassage
} from './index';
import {
  ExitOption,
  Portal,
  renderElement,
  renderLeaf,
  withExits
} from './Elements';

export default connect(null, { newPassage })(SceneFiction);

function findAllPassagesMatching(passages, search) {
  return passages.filter(passage =>
    passage.title.toLowerCase().startsWith(search.toLowerCase())
  );
}

function hasAnyPassagesMatching(passages, search) {
  return findAllPassagesMatching(passages, search).length > 0;
}

function SceneFiction({ sceneId, newPassage }) {
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

  const [editorState, setEditorState] = useState(toSlateContent(scenePassages));

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
        const exitMention = beforeText && beforeText.match(/^@(\w+)$/);

        if (exitMention) {
          const exitSearchText = exitMention[1];
          setExitSearch(exitSearchText);
          const hits = hasAnyPassagesMatching(scenePassages, exitSearchText);
          if (hits) {
            setExitTarget(beforeRange);
            setExitIndex(0);
            return;
          }
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
            setExitSearch('');
            break;
          case 'Escape':
            event.preventDefault();
            setExitTarget(null);
            setExitSearch('');
            break;
          default:
            break;
        }
      } else if (exitSearch) {
        switch (event.key) {
          case ' ':
            event.preventDefault();

            const { selection } = editor;
            if (selection) {
              const [start] = Range.edges(selection);
              const wordBefore = Editor.before(editor, start, { unit: 'word' });
              const before = wordBefore && Editor.before(editor, wordBefore);
              const beforeRange = before && Editor.range(editor, before, start);
              const beforeText =
                beforeRange && Editor.string(editor, beforeRange);

              const title =
                beforeText.charAt(1).toUpperCase() +
                beforeText.trim().substring(2);
              const p = newPassage({
                sceneId,
                title,
                content: defaultNewPassageSlateContent()
              });

              Transforms.select(editor, beforeRange);
              insertExit(editor, beforeText.trim().substring(1));
              Transforms.insertNodes(
                editor,
                toSlatePassage({ title, content: p.payload.content }),
                {
                  at: [editor.children.length] // stick it at the end
                }
              );
            }
            setExitSearch('');
            setExitTarget(null);
            break;
          default:
            break;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [exitIndex, exitTarget, exitSearch, sceneId, editor, exits]
  );

  const insertExit = (editor, text) => {
    Transforms.insertNodes(editor, toSlateExit(text));
    Transforms.move(editor);
  };

  const theExitMenuShouldBeDisplayed = useCallback(
    () => exitTarget && exits.length > 0,
    [exitTarget, exits]
  );

  useEffect(() => {
    if (theExitMenuShouldBeDisplayed()) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, exitTarget);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [theExitMenuShouldBeDisplayed, editor, exitTarget]);

  return (
    <div className="scene-fiction">
      <Slate editor={editor} value={editorState} onChange={onFictionChange}>
        <Editable
          onKeyDown={onKeyDown}
          renderLeaf={useCallback(renderLeaf, [])}
          renderElement={useCallback(renderElement, [])}
        />

        {theExitMenuShouldBeDisplayed() && (
          <Portal>
            <div ref={ref} className="exit-picker">
              {exits.map((passage, i) => (
                <ExitOption passage={passage} isSelected={i === exitIndex} />
              ))}
            </div>
          </Portal>
        )}
      </Slate>
    </div>
  );
}
