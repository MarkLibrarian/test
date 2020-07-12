import React from 'react';

export function Leaf({ attributes, children, leaf }) {
  switch(leaf.type) {
    case 'header':
      return (<div {...attributes} className='title'>{children}</div>);
    case 'footer':
      return (<hr {...attributes}/>);
    default:
      return (<span {...attributes}>{children}</span>);
  }
}
