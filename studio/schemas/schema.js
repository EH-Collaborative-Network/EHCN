// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import siteSettings from './documents/siteSettings'
import person from './documents/person'
import opportunity from './documents/opportunity'
import course from './documents/course'
import event from './documents/event'
import learningResource from './documents/learningResource'
import newsItem from './documents/newsItem'
import partner from './documents/partner'
import project from './documents/project'
import researchThread from './documents/researchThread'
import workingGroup from './documents/workingGroup'

// Object types
import richText from './objects/richText'
import link from './objects/link'
import mediaItem from './objects/mediaItem'
import embed from './objects/embed'



// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'portfolio',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    richText,
    link,
    mediaItem,
    embed,
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    opportunity,
    person,
    course,
    event,
    learningResource,
    newsItem,
    partner,
    project,
    researchThread,
    workingGroup
  ])
})
