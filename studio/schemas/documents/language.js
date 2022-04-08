import { MdLanguage } from "react-icons/md";

export default {
  name: 'language',
  type: 'document',
  title: 'Language',
  icon: MdLanguage,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().error('title cannot be left blank')
    },
    {
        description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
        name:'menu',
        type: 'string',
        title: 'Menu'
     },
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
