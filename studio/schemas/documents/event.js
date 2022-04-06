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
        name: 'people',
        type: 'reference',
        description: 'EHCN Personnel associated with this event (if any)',
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
      title: 'Link to event website (if any)',
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
        description: 'Events associated with this event (if any)',
        title: 'Associated Events',
        to: [{type: 'event'}]
    },
    {
        name: 'learningResources',
        type: 'reference',
        description: 'Learning Resources associated with this event (if any)',
        title: 'Associated Learning Resources',
        to: [{type: 'learningResource'}]
    },
    {
        name: 'newsItems',
        type: 'reference',
        description: 'News Items associated with this event (if any)',
        title: 'Associated News Items',
        to: [{type: 'newsItem'}]
    },
    {
        name: 'partners',
        type: 'reference',
        description: 'Partner Institutions associated with this event (if any)',
        title: 'Associated Partners',
        to: [{type: 'partner'}]
    },
    {
        name: 'Courses',
        type: 'reference',
        description: 'Courses associated with this event (if any)',
        title: 'Associated Courses',
        to: [{type: 'course'}] 
    },
    {
        name: 'Projects',
        type: 'reference',
        description: 'Projects associated with this event (if any)',
        title: 'Associated Projects',
        to: [{type: 'project'}]
    },
    {
        name: 'researchThreads',
        type: 'reference',
        description: 'Research Threads associated with this event (if any)',
        title: 'Associated Research Threads',
        to: [{type: 'researchThread'}]
    },
    {
        name: 'workingGroups',
        type: 'reference',
        description: 'Working Groups associated with this event (if any)',
        title: 'Associated Working Groups',
        to: [{type: 'workingGroup'}]
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
