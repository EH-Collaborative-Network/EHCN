import { MdAlarm } from "react-icons/md";

export default {
  name: 'timezone',
  type: 'document',
  title: 'Timezone',
  icon: MdAlarm,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of Timezone',
      validation: Rule => Rule.required().error('title cannot be left blank')
    },
    {
      name:'offset',
      type: 'number',
      title: 'UTF offset',
      validation: Rule => Rule.required().error('this cannot be left blank')
    }
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
