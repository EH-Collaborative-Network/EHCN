// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')
const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd,
        overlayDrafts: !isProd && token
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/images/favicon.png',
      }
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'items',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: 'speed',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allSanityCourse {
              edges {
                node {
                  credits {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  descriptions {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  name
                  people {
                    bios {
                      _rawText(resolveReferences: {maxDepth: 10})
                      language {
                        code
                        name
                      }
                    }
                  }
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityEvent {
              edges {
                node {
                  credits {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  descriptions {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  name
                  people {
                    bios {
                      _rawText(resolveReferences: {maxDepth: 10})
                      language {
                        code
                        name
                      }
                    }
                  }
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityLearningResource {
              edges {
                node {
                  descriptions {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityNewsItem {
              edges {
                node {
                  credits {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  bodies {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  name
                  people {
                    bios {
                      _rawText(resolveReferences: {maxDepth: 10})
                      language {
                        code
                        name
                      }
                    }
                  }
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityOpportunity {
              edges {
                node {
                  descriptions {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                }
              }
            }
            allSanityPage {
              edges {
                node {
                  bodies {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  name
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityPartner {
              edges {
                node {
                  descriptions {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  name
                  people {
                    bios {
                      _rawText(resolveReferences: {maxDepth: 10})
                      language {
                        code
                        name
                      }
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityProject {
              edges {
                node {
                  credits {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  descriptions {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  name
                  people {
                    bios {
                      _rawText(resolveReferences: {maxDepth: 10})
                      language {
                        code
                        name
                      }
                    }
                  }
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityResearchThread {
              edges {
                node {
                  credits {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  descriptions {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  name
                  people {
                    bios {
                      _rawText(resolveReferences: {maxDepth: 10})
                      language {
                        code
                        name
                      }
                    }
                  }
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
            allSanityWorkingGroup {
              edges {
                node {
                  credits {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  descriptions {
                    _rawText(resolveReferences: {maxDepth: 10})
                    language {
                      code
                      name
                    }
                  }
                  id
                  keywords
                  name
                  people {
                    bios {
                      _rawText(resolveReferences: {maxDepth: 10})
                      language {
                        code
                        name
                      }
                    }
                  }
                  titles {
                    text
                    language {
                      code
                      name
                    }
                  }
                  slug {
                    current
                  }
                }
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        // index: ['title', 'body'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        // store: ['id', 'path', 'title'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) => {

          let courses = data.allSanityCourse.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            people: edge.node.people,
            credits:  edge.node.credits,
            titles: edge.node.titles,
            slug:edge.node.slug,
            type: "Course"
          }))

          let events = data.allSanityEvent.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            people: edge.node.people,
            credits:  edge.node.credits,
            titles: edge.node.titles,
            slug:edge.node.slug,
            type: "Event"
          }))


          let resources = data.allSanityLearningResource.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            titles: edge.node.titles,
            slug:edge.node.slug,
            type: "Learning Resource"
          }))


          let news = data.allSanityNewsItem.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.bodies,
            people: edge.node.people,
            credits:  edge.node._rawCredits,
            titles: edge.node.titles,
            slug:edge.node.slug,
            type: "News Item"
          }))


          let opps = data.allSanityOpportunity.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            titles: edge.node.titles,
            type: "Funding Opportunity"
          }))

          let pages = data.allSanityPage.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.bodies,
            titles: edge.node.titles,
            slug:edge.node.slug,
            type: "Page"
          }))

          let partners = data.allSanityPartner.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            people: edge.node.people,
            credits:  edge.node.credits,
            name: edge.node.name,
            slug:edge.node.slug,
            type: "Partner"
          }))
          let projects = data.allSanityProject.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            people: edge.node.people,
            credits:  edge.node.credits,
            titles: edge.node.titles,
            slug: edge.node.slug,
            type: "Project"
          }))
          let threads = data.allSanityResearchThread.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            people: edge.node.people,
            credits:  edge.node.credits,
            titles: edge.node.titles,
            slug:edge.node.slug,
            type: "Research Thread"
          }))
          let groups = data.allSanityWorkingGroup.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            people: edge.node.people,
            credits:  edge.node.credits,
            titles: edge.node.titles,
            slug:edge.node.slug,
            type: "Working"
          }))

          let finalArray = courses.concat(events, resources, news, projects, partners, threads, groups, opps, pages)
          return(finalArray.flat(1))
        },
      },
    },
  ]
}
