import S from '@sanity/desk-tool/structure-builder'
import { MdSettings } from "react-icons/md";

const hiddenDocTypes = listItem =>
  ![ 'person', 'siteSettings'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('EHCN Personnel')
        .schemaType('person')
        .child(S.documentTypeList('person').title('People')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
