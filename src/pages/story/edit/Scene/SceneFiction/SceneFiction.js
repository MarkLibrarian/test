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
  parseExit,
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
  const [linkingToExit, setLinkingToExit] = useState(false);

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
        const mentioningExistingExit =
          beforeText && beforeText.match(/^@(\w+)$/);

        if (mentioningExistingExit) {
          const exitSearchText = mentioningExistingExit[1];
          setExitSearch(exitSearchText);
          const hits = hasAnyPassagesMatching(scenePassages, exitSearchText);
          if (hits) {
            // noinspection JSCheckFunctionSignatures
            setExitTarget(beforeRange);
            setExitIndex(0);
          }
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
      } else {
        switch (event.key) {
          case '[': {
            const { selection } = editor;
            if (selection) {
              const [start] = Range.edges(selection);
              const lineBefore = Editor.before(editor, start, { unit: 'line' });
              const before = lineBefore && Editor.before(editor, lineBefore);
              const beforeRange = before && Editor.range(editor, before, start);
              const beforeText =
                beforeRange && Editor.string(editor, beforeRange);

              if (beforeText.substr(beforeText.length - 1) === '[') {
                setLinkingToExit(true);
              }
            }
            break;
          }
          case ']': {
            const { selection } = editor;
            if (selection && linkingToExit) {
              const [start] = Range.edges(selection);
              const lineBefore = Editor.before(editor, start, { unit: 'line' });
              const before = lineBefore && Editor.before(editor, lineBefore);
              const beforeRange = before && Editor.range(editor, before, start);
              const beforeText =
                beforeRange && Editor.string(editor, beforeRange);
              const linkExpression =
                beforeText && beforeText.match(/\[\[(.+)\]/);

              if (linkExpression) {
                const exit = parseExit(linkExpression[1]);
                event.preventDefault();
                setLinkingToExit(false);

                const p = newPassage({
                  sceneId,
                  title: exit.title,
                  content: defaultNewPassageSlateContent()
                });
                Transforms.select(editor, {
                  ...selection,
                  anchor: {
                    ...selection.anchor,
                    offset:
                      selection.anchor.offset -
                      linkExpression[1].length -
                      3 /* 3 to account for the surrounding [[]*/
                  }
                });
                insertExit(editor, exit.text);
                Transforms.insertNodes(
                  editor,
                  toSlatePassage({
                    title: exit.title,
                    content: p.payload.content
                  }),
                  {
                    at: [editor.children.length] // stick it at the end
                  }
                );
              }
            }
            break;
          }
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
      // noinspection JSUnresolvedVariable
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      // noinspection JSUnresolvedVariable
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
                <ExitOption
                  key={`exit-${i}`}
                  passage={passage}
                  isSelected={i === exitIndex}
                />
              ))}
            </div>
          </Portal>
        )}
      </Slate>
    </div>
  );
}
