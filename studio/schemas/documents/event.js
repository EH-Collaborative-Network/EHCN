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
      title: 'Title (Internal use only)',
      validation: Rule => Rule.required().error('title cannot be left blank')
    },
    {
      name: 'titles',
      title: 'Titles to Display',
      type: 'array',
      description:"select add item to add a title in any language (including English)",
      of: [{type: 'titleTranslation'}],
  },
  {
    name: 'subtitles',
    title: 'Subtitles to Display',
    type: 'array',
    description:"select add item to add a title in any language (including English)",
    of: [{type: 'titleTranslation'}],
},
    {
      name: 'mainImage',
      title: 'Thumbnail Image',
      type: 'figure',
    },
    {
       name:'slug',
       type: 'slug',
       title: 'Slug (what should the link to this page look like)',
       validation: Rule => Rule.required().error('slug cannot be left blank'),
       options: {
        source: 'name',
        maxLength: 200, // will be ignored if slugify is set
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      }
    },
    {
      name:'timeZone',
      title: 'Timezone for start/end date & time',
      description: 'in which timezone are you entering the date and time?',
      type: 'reference',
      to:{ type: 'timezone'}
    },
     {
         name: 'startDate',
         title: 'Start Date & Time',
         type: 'dateObj',
         description: ''
     },
     {
      name: 'endDate',
      title: 'End Date & Time',
      type: 'dateObj',
      description: ''
    },
     {
        name: 'mainLink',
        title: 'Link to event website (if any)',
        type: 'link'
      },
      {
        name: 'locations',
        title: 'Location Information',
        type: 'array',
        description:"select add item to add a description in any language (including English)",
        of: [{type: 'translation'}],
    },
      {
        name: 'descriptions',
        title: 'Description',
        type: 'array',
        description:"select add item to add a description in any language (including English)",
        of: [{type: 'translation'}],
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
        name: 'courses',
        type: 'array',
        description: 'Courses associated with this event (if any)',
        title: 'Associated Courses',
        of:[{type:'reference', title:'Associated Course', to: [{type: 'course'}]}]
    },
    {
        name: 'projects',
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
