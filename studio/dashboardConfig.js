export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '623cde2abcb7724a30bbbb5c',
                  title: 'Sanity Studio',
                  name: 'ehcn-studio',
                  apiId: '4daaa898-ed3e-4dcd-b883-d3bfd748ac06'
                },
                {
                  buildHookId: '623cde2af1d31b47c1c4471e',
                  title: 'Portfolio Website',
                  name: 'ehcn',
                  apiId: 'c9fbc94a-26c5-4712-9ec0-0175ee0a4e04'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/AaratiAkkapeddi/EHCN',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://ehcn.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
