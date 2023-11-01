import { MdWaves } from "react-icons/md";

export default {
  name: 'theme',
  type: 'document',
  title: 'Theme',
  icon: MdWaves,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name (Internal use only)',
      validation: Rule => Rule.required().error('name cannot be left blank')
    },
    {
      name: 'titles',
      title: 'Titles to Display',
      type: 'array',
      description:"select add item to add a title in any language (including English)",
      of: [{type: 'titleTranslation'}],
  }
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
