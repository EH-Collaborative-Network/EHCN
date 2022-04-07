import { MdWaves } from "react-icons/md";

export default {
  name: 'researchThread',
  type: 'document',
  title: 'Research Thread',
  icon: MdWaves,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
       name:'slug',
       type: 'slug',
       title: 'Slug (what should the link to this page look like)'
    },
    {
        name:'studentLed',
        type: 'boolean',
        title: 'Is this research thread student-lead?',
        description: 'If this thread is faculty-led, set to false',
    },
    {
        name: 'mainLink',
        title: 'Link to Research Thread website (if any)',
        type: 'link'
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
        name: 'people',
        type: 'array',
        description: 'EHCN Personnel associated with this research thread (if any)',
        title: 'EHCN Personnel',
        of:[{type:'reference', title:'Associated EHCN Personnel', to: [{type: 'person'}]}]
    },
    {
        name: 'media',
        title: 'Image(s)',
        type: 'array',
        options: {layout: 'grid'},
        of: [{type: 'mediaItem'}],
    },
    {
        name: 'events',
        type: 'array',
        description: 'Events associated with this research thread (if any)',
        title: 'Associated Events',
        of:[{type:'reference', title:'Associated Event', to: [{type: 'event'}]}]
    },
    {
        name: 'learningResources',
        type: 'array',
        description: 'Learning Resources associated with this research thread (if any)',
        title: 'Associated Learning Resources',
        of:[{type:'reference', title:'Associated Learning Resource', to: [{type: 'learningResource'}]}]
    },
    {
        name: 'newsItems',
        type: 'array',
        description: 'News Items associated with this research thread (if any)',
        title: 'Associated News Items',
        of:[{type:'reference', title:'Associated News Item', to: [{type: 'newsItem'}]}]
    },
    {
        name: 'partners',
        type: 'array',
        description: 'Partner Institutions associated with this research thread (if any)',
        title: 'Associated Partners',
        of:[{type:'reference', title:'Associated Partner', to: [{type: 'partner'}]}]
    },
    {
        name: 'Courses',
        type: 'array',
        description: 'Courses associated with this research thread (if any)',
        title: 'Associated Courses',
        of:[{type:'reference', title:'Associated Course', to: [{type: 'course'}]}]
    },
    {
        name: 'Projects',
        type: 'array',
        description: 'Projects associated with this research thread (if any)',
        title: 'Associated Projects',
        of:[{type:'reference', title:'Associated Project', to: [{type: 'project'}]}]
    },
    {
        name: 'workingGroups',
        type: 'array',
        description: 'Working Groups associated with this research thread (if any)',
        title: 'Associated Working Groups',
        of:[{type:'reference', title:'Associated Working Group', to: [{type: 'workingGroup'}]}]
    },
    {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Add keywords that describe this research thread (optional)',
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