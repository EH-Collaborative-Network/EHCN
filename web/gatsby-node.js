const {isFuture,parseISO} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
/* Project */


async function createProjectPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityProject(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []

  projectEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/project/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/project.js'),
        context: {id}
      })
    })
}
/* COURSE */
async function createCoursePages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityCourse(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const courseEdges = (result.data.allSanityCourse || {}).edges || []

  courseEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/course/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/course.js'),
        context: {id}
      })
    })
}

/* EVENT */
async function createEventPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityEvent(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const eventEdges = (result.data.allSanityEvent || {}).edges || []

  eventEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/event/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/event.js'),
        context: {id}
      })
    })
}


/* Learning Resource */
async function createLearningResourcePages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityLearningResource(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const learningResourceEdges = (result.data.allSanityLearningResource || {}).edges || []

  learningResourceEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/learning-resource/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/learningResource.js'),
        context: {id}
      })
    })
}


/* News Item */
async function createNewsItemPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityNewsItem(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const newsItemEdges = (result.data.allSanityNewsItem || {}).edges || []

  newsItemEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/news-item/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/newsItem.js'),
        context: {id}
      })
    })
}

/* Page */
async function createDefaultPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityPage(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const pageEdges = (result.data.allSanityPage || {}).edges || []

  pageEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/page.js'),
        context: {id}
      })
    })
}

/* Partner */
async function createPartnerPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityPartner(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const partnerEdges = (result.data.allSanityPartner || {}).edges || []

  partnerEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/partner/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/partner.js'),
        context: {id}
      })
    })
}



/* Research Thread */
async function createResearchThreadPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityResearchThread(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const researchThreadEdges = (result.data.allSanityResearchThread || {}).edges || []

  researchThreadEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/research-thread/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/researchThread.js'),
        context: {id}
      })
    
    })
  }


/* Research Thread */
async function createWorkingGroupPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      allSanityWorkingGroup(filter: {slug: {current: {ne: null}}}) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const workingGroupEdges = (result.data.allSanityWorkingGroup || {}).edges || []

  workingGroupEdges
    .forEach(edge => {
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `/working-group/${slug}/`

      createPage({
        path,
        component: require.resolve('./src/templates/workingGroup.js'),
        context: {id}
      })
    
    })
  }

exports.createPages = async ({graphql, actions}) => {
  await createProjectPages(graphql, actions)
  await createCoursePages(graphql, actions)
  await createEventPages(graphql, actions)
  await createLearningResourcePages(graphql, actions)
  await createNewsItemPages(graphql, actions)
  await createPartnerPages(graphql, actions)
  await createDefaultPages(graphql, actions)
  await createResearchThreadPages(graphql, actions)
  await createWorkingGroupPages(graphql, actions)
}
