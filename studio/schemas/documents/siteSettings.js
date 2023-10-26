export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish'
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your website for search engines and social media.'
    },
    {
      name: 'languages',
      type: 'array',
      description: 'Languages with translations available globally accross the website',
      title: 'Languages',
      of:[{type:'reference', title:'Language', to: [{type: 'language'}]}]
    },
    {
      name: 'highlightTitle',
      title: 'Title to Display over Highlight Carousel',
      type: 'array',
      description:"select add item to add a title in any language (including English)",
      of: [{type: 'titleTranslation'}],
    },
    {
      name: 'projectHighlights',
      type: 'array',
      description: 'projects to highlight',
      title: 'Project Highlights',
      of:[{type:'reference', title:'Project', to: [{type: 'project'}]}]
    },
    {
      name: 'eventHighlights',
      type: 'array',
      description: 'events to highlight',
      title: 'Event Highlights',
      of:[{type:'reference', title:'Event', to: [{type: 'event'}]}]
    },
    {
      name:'showMarquee',
      type: 'boolean',
      title: 'Do you want to show the marquee?'
    },
    {
      name: 'marqueeText',
      title: 'Marquee Text',
      type: 'array',
      description:"select add item to add a marquee text in any language (including English)",
      of: [{type: 'translation'}],
    },
    {
      name: 'aboutTechnology',
      title: 'Technology (About Page)',
      type: 'array',
      description:"select add item to add text in any language (including English)",
      of: [{type: 'translation'}],
    },
    {
      name: 'aboutJustice',
      title: 'Justice (About Page)',
      type: 'array',
      description:"select add item to add text in any language (including English)",
      of: [{type: 'translation'}],
    },
    {
      name: 'aboutCreativePractice',
      title: 'Creative Practice (About Page)',
      type: 'array',
      description:"select add item to add text in any language (including English)",
      of: [{type: 'translation'}],
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your website.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }
  ]
}
