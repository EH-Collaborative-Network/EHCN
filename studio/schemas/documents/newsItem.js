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
      title: 'Title',
      validation: Rule => Rule.required().error('title cannot be left blank')
    },
    {
      name: 'mainImage',
      title: 'Thumbnail Image',
      type: 'figure',
    },
    {
        name: 'author',
        type: 'string',
        title: 'Author (optional)'
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
      name: 'body',
      title: 'Body text',
      type: 'richText'
    },
    {
        name: 'translatedTexts',
        title: 'Translated text',
        type: 'array',
        of: [{type: 'translation'}],
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
        name: 'people',
        type: 'array',
        description: 'EHCN Personnel associated with this news item (if any)',
        title: 'EHCN Personnel',
        of:[{type:'reference', title:'Associated EHCN Personnel', to: [{type: 'person'}]}]
    },
    {
        name: 'events',
        type: 'array',
        description: 'Events associated with this news item (if any)',
        title: 'Associated Events',
        of:[{type:'reference', title:'Associated Event', to: [{type: 'event'}]}]
    },
    {
        name: 'partners',
        type: 'array',
        description: 'Partner Institutions associated with this news item (if any)',
        title: 'Associated Partners',
        of:[{type:'reference', title:'Associated Partner', to: [{type: 'partner'}]}]
    },
    {
        name: 'Courses',
        type: 'array',
        description: 'Courses associated with this news item (if any)',
        title: 'Associated Courses',
        of:[{type:'reference', title:'Associated Course', to: [{type: 'course'}]}]
    },
    {
        name: 'Projects',
        type: 'array',
        description: 'Projects associated with this news item (if any)',
        title: 'Associated Projects',
        of:[{type:'reference', title:'Associated Projects', to: [{type: 'project'}]}]
    },
    {
        name: 'researchThreads',
        type: 'array',
        description: 'Research Threads associated with this news item (if any)',
        title: 'Associated Research Threads',
        of:[{type:'reference', title:'Associated Research Thread', to: [{type: 'researchThread'}]}]
    },
    {
        name: 'workingGroups',
        type: 'array',
        description: 'Working Groups associated with this news item (if any)',
        title: 'Associated Working Groups',
        of:[{type:'reference', title:'Associated Working Group', to: [{type: 'workingGroup'}]}]
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
