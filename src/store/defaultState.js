export function defaultState() {
  return {
    stories: ['24'],
    storiesById: {
      '24': {
        id: '24',
        title: 'Oxford Central Library',
        scenes: ['S001']
      }
    },
    scenesById: {
      S001: {
        id: 'S001',
        storyId: '24',
        title: 'Borrowing A Book',
        passages: ['P001', 'P002'],
        image: 'I001'
      },
      S002: {
        id: 'S002',
        storyId: '24',
        title: 'Exploring The MakerSpace',
        passages: ['P003', 'P004'],
        image: 'I002'
      }
    },
    passagesById: {
      P001: {
        id: 'P001',
        sceneId: 'S001',
        title: 'Choosing a book',
        text: 'The library has tons of books to choose from.',
        links: [
          {
            text: 'Choose the green book',
            target: 'P002'
          }
        ]
      },
      P002: {
        id: 'P002',
        sceneId: 'S001',
        title: 'Choosing a CD',
        text: "The library's music selection is vast and eclectic.",
        links: [
          {
            text: 'Choose the classical CD',
            target: 'P001'
          }
        ]
      },
      P003: {
        id: 'P003',
        sceneId: 'S002',
        title: 'The Raspberry PII',
        text: 'The MakerSpace has loads of Raspberry PIIs for you to use.',
        links: [
          {
            text: 'The 3D printer',
            target: 'P004'
          }
        ]
      },
      P004: {
        id: 'P004',
        sceneId: 'S002',
        title: 'The 3D Printer',
        text: 'The MakerSpace has a working 3D printer!',
        links: [
          {
            text: 'The Raspberry PII',
            target: 'P003'
          }
        ]
      }
    },
    imagesById: {
      I001: {
        id: 'I001',
        source: null
      },
      I002: {
        id: 'I002',
        source: null
      }
    }
  };
}
