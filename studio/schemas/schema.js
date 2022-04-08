// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
// Document types
import course from './documents/course'
import event from './documents/event'
import language from './documents/language'
import learningResource from './documents/learningResource'
import newsItem from './documents/newsItem'
import opportunity from './documents/opportunity'
import person from './documents/person'
import partner from './documents/partner'
import project from './documents/project'
import researchThread from './documents/researchThread'
import siteSettings from './documents/siteSettings'
import workingGroup from './documents/workingGroup'
import sampleProject from './documents/sampleProject'
// Object types
import applicationLink from './objects/applicationLink'
import embed from './objects/embed'
import figure from './objects/figure'
import link from './objects/link'
import mediaItem from './objects/mediaItem'
import pdf from './objects/pdf'
import richText from './objects/richText'
import translation from './objects/translation'
// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'portfolio',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    applicationLink,
    embed,
    figure,
    link,
    mediaItem,
    pdf,
    richText,
    translation,
    // The following are document types which will appear
    // in the studio.
    course,
    event,
    language,
    learningResource,
    newsItem,
    sampleProject,
    opportunity,
    person,
    partner,
    project,
    researchThread,
    siteSettings,
    workingGroup
  ])
})
