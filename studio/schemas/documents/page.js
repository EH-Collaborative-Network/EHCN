import { MdPages } from "react-icons/md";

export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: MdPages,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().error('title cannot be left blank')
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
        title: 'Text',
        description: 'text to go on page',
        type: 'richText'
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
