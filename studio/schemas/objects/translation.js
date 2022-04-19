export default{
    title: 'Translation',
    name: 'translation',
    type: 'object',
    fields: [
        {name: 'language', type: 'reference', title: 'language', description: 'choose language or add a new language', to:{ type: 'language'}},
        {name: 'text', type: 'richText', title: 'translated text', description: 'translated text'},
      ],
    preview: {
        select: {
            title: 'language.name'
        }
    }
  }