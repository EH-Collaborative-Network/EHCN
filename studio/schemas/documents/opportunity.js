import { MdAttachMoney } from "react-icons/md";

export default {
  name: 'opportunity',
  type: 'document',
  title: 'Funding Opportunity',
  icon: MdAttachMoney,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().error('title cannot be left blank')
    },
    {
       name:'institution',
       type: 'boolean',
       title: 'Is this Institution-specific?',
       description:'(if network-wide, set to false)'
    },
    {
      name: 'descriptions',
      title: 'Description',
      type: 'array',
      description:"select add item to add a description in any language (including English)",
      of: [{type: 'translation'}],
  },
    {
        name: 'applications',
        type: 'array',
        title: 'Application Links',
        description: 'Add application links',
        of: [{type: 'applicationLink'}]
      },
      {
        name: 'keywords',
        type: 'array',
        title: 'Keywords',
        description: 'Add keywords that describe this grant/opportunity.',
        of: [{type: 'string'}],
        options: {
          layout: 'tags'
        }
      }
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}
