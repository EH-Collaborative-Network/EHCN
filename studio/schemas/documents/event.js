import { MdEventNote } from "react-icons/md";

export default {
  name: 'event',
  type: 'document',
  title: 'Event',
  icon: MdEventNote,
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
        name:'startDate',
        type: 'datetime',
        title: 'Start Date & Time (for sorting purposes)'
     },
     {
        name:'endDate',
        type: 'datetime',
        title: 'End Date & Time (for sorting purposes)'
     },
     {
         name: 'displayDate',
         type: 'richText',
         title: 'Display Date & Time',
         description: 'this will show up on the event page'
     },
     {
        name: 'mainLink',
        title: 'Link to event website (if any)',
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
        description: 'EHCN Personnel associated with this event (if any)',
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
        description: 'Events associated with this event (if any)',
        title: 'Associated Events',
        of:[{type:'reference', title:'Associated Event', to: [{type: 'event'}]}]
    },
    {
        name: 'learningResources',
        type: 'array',
        description: 'Learning Resources associated with this event (if any)',
        title: 'Associated Learning Resources',
        of:[{type:'reference', title:'Associated Learning Resource', to: [{type: 'learningResource'}]}]
    },
    {
        name: 'newsItems',
        type: 'array',
        description: 'News Items associated with this event (if any)',
        title: 'Associated News Items',
        of:[{type:'reference', title:'Associated News Item', to: [{type: 'newsItem'}]}]
    },
    {
        name: 'partners',
        type: 'array',
        description: 'Partner Institutions associated with this event (if any)',
        title: 'Associated Partners',
        of:[{type:'reference', title:'Associated Partner', to: [{type: 'partner'}]}]
    },
    {
        name: 'Courses',
        type: 'array',
        description: 'Courses associated with this event (if any)',
        title: 'Associated Courses',
        of:[{type:'reference', title:'Associated Course', to: [{type: 'course'}]}]
    },
    {
        name: 'Projects',
        type: 'array',
        description: 'Projects associated with this event (if any)',
        title: 'Associated Projects',
        of:[{type:'reference', title:'Associated Project', to: [{type: 'project'}]}]
    },
    {
        name: 'researchThreads',
        type: 'array',
        description: 'Research Threads associated with this event (if any)',
        title: 'Associated Research Threads',
        of:[{type:'reference', title:'Associated Research Thread', to: [{type: 'researchThread'}]}]
    },
    {
        name: 'workingGroups',
        type: 'array',
        description: 'Working Groups associated with this event (if any)',
        title: 'Associated Working Groups',
        of:[{type:'reference', title:'Associated Working Group', to: [{type: 'workingGroup'}]}]
    },
    {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Add keywords that describe this event (optional)',
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
