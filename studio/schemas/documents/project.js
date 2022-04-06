import { MdAutoAwesome } from "react-icons/md";

export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  icon: MdAutoAwesome,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title'
    },
    {
       name:'slug',
       type: 'slug',
       title: 'Slug (what should the link to this page look like)'
    },
    {
        name:'studentLed',
        type: 'boolean',
        title: 'Is this project student-lead?',
        description: 'If this project is faculty-led, set to false',
    },
    {
        name: 'people',
        type: 'reference',
        description: 'EHCN Personnel associated with this project (if any)',
        title: 'EHCN Personnel',
        to: [{type: 'person'}]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richText'
    },
    {
        name: 'credits',
        title: 'additional credits',
        description: 'this is an optional space to put any other credits to people, organizations, etc.',
        type: 'richText'
    },
    {
      name: 'mainLink',
      title: 'Link to project website (if any)',
      type: 'link'
    },
    {
        name: 'media',
        title: 'Image(s)',
        type: 'array',
        of: [{type: 'mediaItem'}],
    },
    {
        name: 'events',
        type: 'reference',
        description: 'Events associated with this project (if any)',
        title: 'Associated Events',
        to: [{type: 'event'}]
    },
    {
        name: 'learningResources',
        type: 'reference',
        description: 'Learning Resources associated with this project (if any)',
        title: 'Associated Learning Resources',
        to: [{type: 'learningResource'}]
    },
    {
        name: 'newsItems',
        type: 'reference',
        description: 'News Items associated with this project (if any)',
        title: 'Associated News Items',
        to: [{type: 'newsItem'}]
    },
    {
        name: 'partners',
        type: 'reference',
        description: 'Partner Institutions associated with this project (if any)',
        title: 'Associated Partners',
        to: [{type: 'partner'}]
    },
    {
        name: 'Courses',
        type: 'reference',
        description: 'Courses associated with this project (if any)',
        title: 'Associated Courses',
        to: [{type: 'course'}] 
    },
    {
        name: 'researchThreads',
        type: 'reference',
        description: 'Research Threads associated with this project (if any)',
        title: 'Associated Research Threads',
        to: [{type: 'researchThread'}]
    },
    {
        name: 'workingGroups',
        type: 'reference',
        description: 'Working Groups associated with this project (if any)',
        title: 'Associated Working Groups',
        to: [{type: 'workingGroup'}]
    },
    {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Add keywords that describe this working group (optional)',
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
