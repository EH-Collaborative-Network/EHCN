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
      title: 'Title'
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
