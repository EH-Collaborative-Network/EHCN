import { MdOutlineVolunteerActivism } from "react-icons/md";

export default {
  name: 'learningResource',
  type: 'document',
  title: 'Learning Resource',
  icon: MdOutlineVolunteerActivism,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'mainImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
            isHighlighted: true // <-- make this field easily accessible
          }
        },
      ]
    },
    {
       name:'slug',
       type: 'slug',
       title: 'Slug (what should the link to this page look like)'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richText'
    },
    {
        name: 'translatedDescriptions',
        title: 'Translated Descriptions',
        type: 'array',
        of: [{type: 'translation'}],
    },
    {
        name: 'credits',
        title: 'additional credits',
        description: 'this is an optional space to put any other credits to people, organizations, etc.',
        type: 'richText'
      },
      {
        name: 'translatedCredits',
        title: 'Translated Credits',
        type: 'array',
        of: [{type: 'translation'}],
    },
    {
      name: 'mainLink',
      title: 'Link to Working Group website (if any)',
      type: 'link'
    },
    {
        name: 'media',
        title: 'Image(s)',
        options: {layout: 'grid'},
        type: 'array',
        of: [{type: 'mediaItem'}],
    },
    {
        name: 'events',
        type: 'array',
        description: 'Events associated with this learning resource (if any)',
        title: 'Associated Events',
        of:[{type:'reference', title:'Associated Event', to: [{type: 'event'}]}]
    },
    {
        name: 'newsItems',
        type: 'array',
        description: 'News Items associated with this learning resource (if any)',
        title: 'Associated News Items',
        of:[{type:'reference', title:'Associated News Item', to: [{type: 'newsItem'}]}]
    },
    {
        name: 'partners',
        type: 'array',
        description: 'Partner Institutions associated with this learning resource (if any)',
        title: 'Associated Partners',
        of:[{type:'reference', title:'Associated Partner', to: [{type: 'partner'}]}]
    },
    {
        name: 'Courses',
        type: 'array',
        description: 'Courses associated with this learning resource (if any)',
        title: 'Associated Courses',
        of:[{type:'reference', title:'Associated Course', to: [{type: 'course'}]}]
    },
    {
        name: 'Projects',
        type: 'array',
        description: 'Projects associated with this learning resource (if any)',
        title: 'Associated Projects',
        of:[{type:'reference', title:'Associated Project', to: [{type: 'project'}]}]
    },
    {
        name: 'researchThreads',
        type: 'array',
        description: 'Research Threads associated with this learning resource (if any)',
        title: 'Associated Research Threads',
        of:[{type:'reference', title:'Associated Research Thread', to: [{type: 'researchThread'}]}]
    },
    {
        name: 'workingGroups',
        type: 'array',
        description: 'Working Groups associated with this learning resource (if any)',
        title: 'Associated Working Groups',
        of:[{type:'reference', title:'Associated Working Group', to: [{type: 'workingGroup'}]}]
    },
    {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Add keywords that describe this learning resource (optional)',
        of: [{type: 'string'}],
        options: {
          layout: 'tags'
        }
      }
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
