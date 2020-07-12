export function toSlateContentModel(passages) {
  return passages.flatMap(passage => {
    const content = [{
      type: 'passage',
      children: [...passage.content]
    }];

    content.unshift({
      children: [{ type: 'header', text: passage.title }]
    });

    content.push({
      children: [{ type: 'footer', text: '' }]
    });

    return content;
  });
}

export function toPassagesModel(content) {
  throw new Error('Not implemented');
}
