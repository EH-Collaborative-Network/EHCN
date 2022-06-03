// ./resolveProductionUrl.js
const remoteURL = "https://ehcn.netlify.app";
const localURL = "http://localhost:8000";
const baseURL =
  window.location.hostname === "localhost" ? localURL : remoteURL;

export default function resolvePreviewURLs(document) {
    switch (document._type) {
      case 'page': return `${baseURL}/${document.slug.current}`;
      case 'event': return `${baseURL}/event/${document.id}`;
      case 'project': return `${baseURL}/project/${document.slug.current}`;
      case 'newsItem': return `${baseURL}/news/${document.slug.current}`;
      case 'course': return `${baseURL}/course/${document.slug.current}`;
      case 'partner': return `${baseURL}/partner/${document.slug.current}`;
      case 'learningResource': return `${baseURL}/learning-resource/${document.slug.current}`;
      case 'researchThread': return `${baseURL}/research-thread/${document.slug.current}`;
      case 'workingGroup': return `${baseURL}/working-group/${document.slug.current}`;
      default: return baseURL;
    }
  }