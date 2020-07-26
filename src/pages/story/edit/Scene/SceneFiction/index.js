import { Elements } from './Elements';

export function toSlateContent(passages) {
  return passages.flatMap(toSlatePassage);
}

export function toSlatePassage(passage) {
  return [
    {
      type: 'paragraph',
      children: [{ type: Elements.Header.type, text: passage.title }]
    },
    {
      type: Elements.Passage.type,
      children: [...passage.content]
    }
  ];
}

export function defaultNewPassageSlateContent() {
  return [
    {
      type: 'paragraph',
      children: [{ text: 'Lorem ipsum dolor sit amet…' }]
    }
  ];
}

export function toSlateExit(text) {
  return {
    type: Elements.Exit.type,
    title: text,
    children: [{ text: '' }]
  };
}
