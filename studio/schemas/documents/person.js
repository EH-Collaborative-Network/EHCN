import { MdPerson } from "react-icons/md";

export default {
  name: 'person',
  type: 'document',
  title: 'EHCN Personnel',
  icon: MdPerson,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required().error('name cannot be left blank')
    },
    {
       name:'staff',
       type: 'boolean',
       title: 'Is this person Staff?'
    },
    {
        name:'steering',
        type: 'boolean',
        title: 'Is this person on the Steering Committee?'
     },
    {
      name: 'image',
      title: 'Image',
      type: 'figure'
    },
    {
      name: 'bios',
      title: 'Bios',
      type: 'array',
      description:"select add item to add a bio in any language (including English)",
      of: [{type: 'translation'}],
  }
    
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
