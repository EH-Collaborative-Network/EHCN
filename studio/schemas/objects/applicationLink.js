export default{
    title: 'Application Link',
    name: 'applicationLink',
    type: 'object',
    fields: [
        {name: 'text', type: 'string', title: 'text', description: 'This is the text that will show up for your link'},
        {name: 'url', type: 'url', title: 'url', description: 'The address that your link will take the viewer to'},
        {name: 'partner', type: 'reference',to: [{type: 'partner'}], title: 'Partner Institution', description: 'Associated partner (leave blank for network-wide)'},
      ]
  }