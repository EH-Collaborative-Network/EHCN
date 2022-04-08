import { MdPerson } from "react-icons/md";

export default {
  name: 'sampleProject',
  type: 'document',
  title: 'Sample Project',
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
      name: 'image',
      title: 'Image',
      type: 'figure'
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
