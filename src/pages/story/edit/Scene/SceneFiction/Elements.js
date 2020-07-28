import React from 'react';
import ReactDOM from 'react-dom';

export const Elements = Object.freeze({
  Header: {
    type: 'header',
    className: 'title'
  },
  Passage: {
    type: 'passage',
    className: 'passage'
  },
  Exit: {
    type: 'exit',
    className: 'exit'
  }
});

export function ExitOption({ passage, isSelected }) {
  return (
    <div
      key={passage.id}
      className={`exit-option ${isSelected ? 'active' : ''}`}
    >
      {passage.title}
    </div>
  );
}

export function Leaf({ attributes, children, leaf }) {
  switch (leaf.type) {
    case Elements.Header.type:
      return (
        <div {...attributes} className={Elements.Header.className}>
          {children}
        </div>
      );
    default:
      return <span {...attributes}>{children}</span>;
  }
}

export const PassageElement = props => {
  return (
    <div {...props.attributes} className={Elements.Passage.className}>
      {props.children}
    </div>
  );
};

export const DefaultElement = props => {
  return <div {...props.attributes}>{props.children}</div>;
};

export const ExitElement = ({ attributes, children, element }) => {
  return (
    <span
      {...attributes}
      contentEditable={false}
      className={Elements.Exit.className}
    >
      @{element.title}
      {children}
    </span>
  );
};

export const withExits = editor => {
  const { isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === Elements.Exit.type ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === Elements.Exit.type ? true : isVoid(element);
  };

  return editor;
};

export const renderElement = props => {
  switch (props.element.type) {
    case Elements.Passage.type:
      return <PassageElement {...props} />;
    case Elements.Exit.type:
      return <ExitElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

export const renderLeaf = props => <Leaf {...props} />;

export const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};
