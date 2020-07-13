import React from 'react';

export function Leaf({ attributes, children, leaf }) {
  switch(leaf.type) {
    case 'header':
      return (<div {...attributes} className='title'>{children}</div>);
    case 'footer':
      return (<div {...attributes} className='footer'/>);
    default:
      return (<span {...attributes}>{children}</span>);
  }
}

export const PassageElement = props => {
  return (
    <div {...props.attributes} className='passage'>
      {props.children}
    </div>
  )
}

export const DefaultElement = props => {
  return <div {...props.attributes}>{props.children}</div>
}
