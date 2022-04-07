export default{
    title: 'Media Item',
    name: 'mediaItem',
    type: 'object',
    description: "Choose from the three options below: Image, pdf, or embed",
    options: {
        collapsible: true,
        collapsed: true,
    },
    fields: [
        {name: 'image', type: 'image', title: 'Image', description: 'upload image if your media item is an image', options: { hotspot:true
        }, fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true // <-- make this field easily accessible
              }
            },
        ]},
        {name: 'pdf', type: 'file', title: 'PDF', description: 'upload pdf if your media item is a pdf', options: {}, fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true // <-- make this field easily accessible
              }
            },
        ]},
        {name: 'embed', type: 'embed', title: 'Embed', description: 'paste embed code if your media item is from soundcloud, vimeo, youtube, etc. or if your media item is an iframe', options: {
            collapsible: true,
        }}
      ],
      preview: {
        select: {
            media: 'image'
        }
      }
  }