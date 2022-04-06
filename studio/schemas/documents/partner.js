import { MdLocationPin } from "react-icons/md";

export default {
  name: 'partner',
  type: 'document',
  title: 'Partner Institution',
  icon: MdLocationPin,
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
        name: 'people',
        type: 'reference',
        description: 'EHCN Personnel associated with this institution',
        title: 'EHCN Personnel',
        to: [{type: 'person'}]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richText'
    },
    {
      name: 'mainLink',
      title: 'Link to Insitution website',
      type: 'link'
    },
    {
        name: 'media',
        title: 'Image(s)',
        type: 'array',
        of: [{type: 'image'}],
    },
    {
        name: 'events',
        type: 'reference',
        description: 'Events associated with this partner (if any)',
        title: 'Associated Events',
        to: [{type: 'event'}]
    },
    {
        name: 'learningResources',
        type: 'reference',
        description: 'Learning Resources associated with this partner (if any)',
        title: 'Associated Learning Resources',
        to: [{type: 'learningResource'}]
    },
    {
        name: 'newsItems',
        type: 'reference',
        description: 'News Items associated with this partner (if any)',
        title: 'Associated News Items',
        to: [{type: 'newsItem'}]
    },
    {
        name: 'Courses',
        type: 'reference',
        description: 'Courses associated with this partner (if any)',
        title: 'Associated Courses',
        to: [{type: 'course'}] 
    },
    {
        name: 'Projects',
        type: 'reference',
        description: 'Projects associated with this partner (if any)',
        title: 'Associated Projects',
        to: [{type: 'project'}]
    },
    {
        name: 'researchThreads',
        type: 'reference',
        description: 'Research Threads associated with this partner (if any)',
        title: 'Associated Research Threads',
        to: [{type: 'researchThread'}]
    },
    {
        name: 'workingGroups',
        type: 'reference',
        description: 'Working Groups associated with this partner (if any)',
        title: 'Associated Working Groups',
        to: [{type: 'workingGroup'}]
    },
    {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Add keywords that describe this partner (optional)',
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
