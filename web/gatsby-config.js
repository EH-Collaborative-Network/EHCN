// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')
const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  flags:{
    PARALLEL_QUERY_RUNNING: false
  },
  siteMetadata: {
    title: "Experimental Humanities Collaborative Network",
    titleTemplate: "%s · EHCN",
    description:
      "The Experimental Humanities Collaborative Network is a global network rethinking the humanities in the light of changing technologies, our increasingly connected planet, the ongoing ecological crisis, and the need to create more inclusive institutions.",
    url: "https://ehcn.bard.edu", // No trailing slash allowed!
    image: 'src/assets/logo.png', // Path to the image placed in the 'static' folder, in the project's root directory.
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-remove-fingerprints`,
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
                  mainImage {
                    crop {
                      _key
                      _type
                      top
                      bottom
                      left
                      right
                    }
                    asset {
                      _id
                    }
                    altText
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
                  mainImage {
                    crop {
                      _key
                      _type
                      top
                      bottom
                      left
                      right
                    }
                    asset {
                      _id
                    }
                    altText
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
                  excerpts {
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
                  slug {
                    current
                  }
                }
              }
            }
            allSanityProject {
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
                  mainImage {
                    crop {
                      _key
                      _type
                      top
                      bottom
                      left
                      right
                    }
                    asset {
                      _id
                    }
                    altText
                  }
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
            allSanityWorkingGroup {
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
                  mainImage {
                    crop {
                      _key
                      _type
                      top
                      bottom
                      left
                      right
                    }
                    asset {
                      _id
                    }
                    altText
                  }
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
            titles: edge.node.titles,
            mainImage: edge.node.mainImage,
            slug:edge.node.slug,
            type: "course"
          }))

          let events = data.allSanityEvent.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            titles: edge.node.titles,
            mainImage: edge.node.mainImage,
            slug:edge.node.slug,
            type: "event"
          }))


          let resources = data.allSanityLearningResource.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            excerpts:  edge.node.excerpts,
            titles: edge.node.titles,
            slug:edge.node.slug,
            type: "learningResource"
          }))


          let opps = data.allSanityOpportunity.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            titles: edge.node.titles,
            type: "fundingOpportunity"
          }))

          let pages = data.allSanityPage.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.bodies,
            titles: edge.node.titles,
            slug:edge.node.slug,
            type: "page"
          }))

          let partners = data.allSanityPartner.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            name: edge.node.name,
            slug:edge.node.slug,
            type: "partner"
          }))
          let projects = data.allSanityProject.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            titles: edge.node.titles,
            slug: edge.node.slug,
            mainImage: edge.node.mainImage,
            type: "project"
          }))
          let groups = data.allSanityWorkingGroup.edges.map((edge) => ({
            id: edge.node.id,
            descriptions:  edge.node.descriptions,
            titles: edge.node.titles,
            mainImage: edge.node.mainImage,
            slug:edge.node.slug,
            type: "workingGroup"
          }))

          let finalArray = courses.concat(events, resources, projects, partners, groups, opps, pages)
          return(finalArray.flat(1))
        },
      },
    },
  ]
}
