import React from 'react';
import ReactDOM from 'react-dom';

export function Leaf({ attributes, children, leaf }) {
  switch (leaf.type) {
    case 'header':
      return (<div {...attributes} className='title'>{children}</div>);
    default:
      return (<span {...attributes}>{children}</span>);
  }
}

export const PassageElement = props => {
  return (
    <div {...props.attributes} className='passage'>
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
      className='exit'>

      #{element.exit}
      {children}
    </span>
  );
};

export const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body)
}
