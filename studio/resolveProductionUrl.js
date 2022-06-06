// ./resolveProductionUrl.js
const isDraft = id => id.includes('drafts');
const remoteURL = "https://ehcn.netlify.app";
const localURL = "http://localhost:8000";
const baseURL =
  window.location.hostname === "localhost" ? localURL : remoteURL;


  export default function resolveProductionUrl(document) {
    // First, we select a specific type of document

    let temp;
     
      switch (document._type) {
        case 'page': return `${baseURL}/${document.slug.current}?preview=true`;
        case 'event':return `${baseURL}/event/${document.slug.current}?preview=true`;
        case 'project': return `${baseURL}/project/${document.slug.current}?preview=true`;
        case 'newsItem': return `${baseURL}/news/${document.slug.current}?preview=true`;
        case 'course': return `${baseURL}/course/${document.slug.current}?preview=true`;
        case 'partner': return `${baseURL}/partner/${document.slug.current}?preview=true`;
        case 'learningResource': temp = `${baseURL}/learning-resource/${document.slug.current}?preview=true`;
        case 'researchThread': return `${baseURL}/research-thread/${document.slug.current}?preview=true`;
        case 'workingGroup': return `${baseURL}/working-group/${document.slug.current}?preview=true`;
        default: temp = 'document._type';
      }

      
      // And return a template string reflecting the URL structure we want. In this case, we're doing a
      // simple conditional to return '&isDraft=true' as a param for drafts as we'll query them
      // differently in the front-end
      return temp;
    
  }