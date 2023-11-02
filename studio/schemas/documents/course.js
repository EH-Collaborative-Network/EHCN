import { MdCastForEducation } from "react-icons/md";

export default {
  name: 'course',
  type: 'document',
  title: 'Course',
  icon: MdCastForEducation,
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
       name:'slug',
       type: 'slug',
       title: 'Slug (what should the link to this page look like)',
       description: 'No hashtags, spaces, or punctuation. Use a dash instead of a space.',
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
        name: 'mainLink',
        title: 'Link to course website (if any)',
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
        name: 'media',
        title: 'Image(s)',
        type: 'array',
        options: {layout: 'grid'},
        of: [{type: 'mediaItem'}],
    },
    {
        name: 'events',
        type: 'array',
        description: 'Events associated with this course (if any)',
        title: 'Associated Events',
        of:[{type:'reference', title:'Associated Event', to: [{type: 'event'}]}]
    },
    {
        name: 'learningResources',
        type: 'array',
        description: 'Learning Resources associated with this course (if any)',
        title: 'Associated Learning Resources',
        of:[{type:'reference', title:'Associated Learning Resource', to: [{type: 'learningResource'}]}]
    },
    {
        name: 'newsItems',
        type: 'array',
        description: 'News Items associated with this course (if any)',
        title: 'Associated News Items',
        of:[{type:'reference', title:'Associated News Item', to: [{type: 'newsItem'}]}]
    },
    {
        name: 'partners',
        type: 'array',
        description: 'Partner Institutions associated with this course (if any)',
        title: 'EHCN Partners involved',
        of:[{type:'reference', title:'Associated Partner', to: [{type: 'partner'}]}]
    },
    {
        name: 'projects',
        type: 'array',
        description: 'Projects associated with this course (if any)',
        title: 'Associated Projects',
        of:[{type:'reference', title:'Associated Project', to: [{type: 'project'}]}]
    },
    {
        name: 'researchThreads',
        type: 'array',
        description: 'Research Threads associated with this course (if any)',
        title: 'Associated Research Threads',
        of:[{type:'reference', title:'Associated Research Thread', to: [{type: 'researchThread'}]}]
    },
    {
        name: 'workingGroups',
        type: 'array',
        description: 'Working Groups associated with this course (if any)',
        title: 'Associated Working Groups',
        of:[{type:'reference', title:'Associated Working Group', to: [{type: 'workingGroup'}]}]
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
},
    {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Add keywords that describe this course (optional)',
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
