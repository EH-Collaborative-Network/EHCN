// ./resolveProductionUrl.js
const isDraft = id => id.includes('drafts');
const remoteURL = "https://ehcn.netlify.app";
const localURL = "http://localhost:8000";
const baseURL =
  window.location.hostname === "localhost" ? localURL : remoteURL;


  export default function resolveProductionUrl(document) {
    // First, we select a specific type of document

    let temp;
    if (document._type === 'page' || document._type === 'event' || document._type === 'project' || document._type === 'newsItem' || document._type === 'course' || document._type === 'partner' || document._type === 'learningResource' || document._type === 'researchThread' || document._type === 'workingGroup') {
      switch (document._type) {
        case 'page': temp = `${baseURL}/${document.slug.current}`;
        case 'event': temp = `${baseURL}/event/${document.slug.current}`;
        case 'project': temp = `${baseURL}/project/${document.slug.current}`;
        case 'newsItem': temp = `${baseURL}/news/${document.slug.current}`;
        case 'course': temp = `${baseURL}/course/${document.slug.current}`;
        case 'partner': temp = `${baseURL}/partner/${document.slug.current}`;
        case 'learningResource': temp = `${baseURL}/learning-resource/${document.slug.current}`;
        case 'researchThread': temp = `${baseURL}/research-thread/${document.slug.current}`;
        case 'workingGroup': temp = `${baseURL}/working-group/${document.slug.current}`;
        default: temp = "";
      }

      // Then we get its ID
      let id = document._id;
      // if it's a draft, we split its _id with the "drafts." substring, which will return an array,
      // and get the second item in it, which will be the isolated _id without "drafts."
      if (isDraft(id)) {
        id = document._id.split('drafts.')[1];
      }
      // And return a template string reflecting the URL structure we want. In this case, we're doing a
      // simple conditional to return '&isDraft=true' as a param for drafts as we'll query them
      // differently in the front-end
      return `${temp}${
        isDraft(document._id) ? '&isDraft=true' : ''
      }`;
    }
    return undefined;
  }