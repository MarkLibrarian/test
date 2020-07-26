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

export function toSlateExit(title) {
  return {
    type: Elements.Exit.type,
    title,
    children: [{ text: '' }]
  };
}

export function parseExit(text) {
  // "enter the library" | "enter the library|go inside"
  if (text.includes('|')) {
    const parts = text.split('|');
    return {
      title: parts[0].trim(),
      text: parts[1].trim()
    };
  } else {
    return {
      title: text.trim(),
      text: text.trim()
    };
  }
}
