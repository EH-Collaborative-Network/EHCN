import { MdFeed } from "react-icons/md";

export default {
  name: 'newsItem',
  type: 'document',
  title: 'News Item',
  icon: MdFeed,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title'
    },
    {
        name: 'author',
        type: 'string',
        title: 'Author (optional)'
    },
    {
       name:'slug',
       type: 'slug',
       title: 'Slug (what should the link to this page look like)'
    },
    {
        name: 'people',
        type: 'reference',
        description: 'EHCN Personnel associated with this news item (if any)',
        title: 'EHCN Personnel',
        to: [{type: 'person'}]
    },
    {
      name: 'body',
      title: 'Body text',
      type: 'richText'
    },
    {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        description: 'short summary'
      },
    {
        name: 'credits',
        title: 'additional credits',
        description: 'this is an optional space to put any other credits to people, organizations, etc.',
        type: 'richText'
    },
    {
        name: 'events',
        type: 'reference',
        description: 'Events associated with this news item (if any)',
        title: 'Associated Events',
        to: [{type: 'event'}]
    },
    {
        name: 'learningResources',
        type: 'reference',
        description: 'Learning Resources associated with this news item (if any)',
        title: 'Associated Learning Resources',
        to: [{type: 'learningResource'}]
    },
    {
        name: 'partners',
        type: 'reference',
        description: 'Partner Institutions associated with this news item (if any)',
        title: 'Associated Partners',
        to: [{type: 'partner'}]
    },
    {
        name: 'Courses',
        type: 'reference',
        description: 'Courses associated with this news item (if any)',
        title: 'Associated Courses',
        to: [{type: 'course'}] 
    },
    {
        name: 'Projects',
        type: 'reference',
        description: 'Projects associated with this news item (if any)',
        title: 'Associated Projects',
        to: [{type: 'project'}]
    },
    {
        name: 'researchThreads',
        type: 'reference',
        description: 'Research Threads associated with this news item (if any)',
        title: 'Associated Research Threads',
        to: [{type: 'researchThread'}]
    },
    {
        name: 'workingGroups',
        type: 'reference',
        description: 'Working Groups associated with this news item (if any)',
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
