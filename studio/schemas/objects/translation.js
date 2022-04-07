export default{
    title: 'Translation',
    name: 'translation',
    type: 'object',
    fields: [
        {name: 'language', type: 'reference', title: 'language', description: 'choose language', to:{ type: 'language'}},
        {name: 'text', type: 'richText', title: 'text', description: 'translation text'},
      ]
  }