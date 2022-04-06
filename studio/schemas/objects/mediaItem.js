export default{
    title: 'Media Item',
    name: 'mediaItem',
    type: 'object',
    fields: [
        {name: 'image', type: 'image', title: 'Image', description: 'upload image if your media item is an image', collapsible: true, collapsed: true},
        {name: 'pdf', type: 'file', title: 'PDF', description: 'upload pdf if your media item is a pdf', collapsible: true, collapsed: true},
        {name: 'embed', type: 'embed', title: 'Embed', description: 'paste embed code if your media item is from soundcloud, vimeo, youtube, etc. or if your media item is an iframe', collapsible: true, collapsed: true}
      ]
  }