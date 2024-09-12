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
      title: 'Name',
      validation: Rule => Rule.required().error('title cannot be left blank')
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
      name: 'descriptions',
      title: 'Description',
      type: 'array',
      description:"select add item to add a description in any language (including English)",
      of: [{type: 'translation'}],
  },
    {
      name: 'mainLink',
      title: 'Link to Insitution website',
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
        name: 'media',
        title: 'Image(s)',
        type: 'array',
        options: {layout: 'grid'},
        of: [{type: 'mediaItem'}],
    },
    {
      name: 'featured_events',
      type: 'array',
      description: 'Featured Events associated with this partner (if any)',
      title: 'Featured Events',
      of:[{type:'reference', title:'Associated Event', to: [{type: 'event'}]}]
    },
    {
        name: 'featured_projects',
        type: 'array',
        description: 'Featured Projects associated with this partner (if any)',
        title: 'Featured Projects',
        of:[{type:'reference', title:'Associated Project', to: [{type: 'project'}]}]
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
