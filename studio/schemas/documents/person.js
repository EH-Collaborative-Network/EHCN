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
      title: 'Name'
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
      name: 'profilePicture',
      title: 'Image',
      type: 'image'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'richText'
    },
    {
      name: 'translatedBios',
      title: 'Translated Bios',
      type: 'array',
      of: [{type: 'translation'}],
  },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
