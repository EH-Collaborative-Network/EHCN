import { MdGesture } from "react-icons/md";

export default {
  name: 'ongoingActivity',
  type: 'document',
  title: 'Ongoing Activity',
  icon: MdGesture,
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
      name: 'mainImage',
      title: 'Thumbnail Image',
      type: 'figure',
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
         description: 'If this is an ongoing project, leave blank'
     },
     {
      name: 'endDate',
      title: 'End Date & Time',
      type: 'dateObj',
      description: 'If this is an ongoing project, leave blank'
    },
     {
        name: 'mainLink',
        title: 'Link to event website (if any)',
        type: 'link'
      },
      {
        name: 'descriptions',
        title: 'Description',
        type: 'array',
        description:"select add item to add a description in any language (including English)",
        of: [{type: 'translation'}],
    },
    {
      name: 'locations',
      title: 'Location Information',
      type: 'array',
      description:"select add item to add a description in any language (including English)",
      of: [{type: 'translation'}],
     },
     {
      name:'online',
      type: 'boolean',
      title: 'Is this event online?',
      description: 'If this is in-person set to false',
      },
    {
          name: 'themes',
          type: 'array',
          description: 'themes associated with this (if any)',
          title: 'Associated Themes',
          of:[{type:'reference', title:'theme', to: [{type: 'theme'}]}]
      },
      {
        name: 'mediums',
        type: 'array',
        description: 'mediums associated with this (if any)',
        title: 'Associated Mediums',
        of:[{type:'reference', title:'medium', to: [{type: 'medium'}]}]
    }
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
