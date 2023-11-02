import { MdLanguage } from "react-icons/md";

export default {
  name: 'language',
  type: 'document',
  title: 'Language',
  icon: MdLanguage,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().error('title cannot be left blank')
    },
    {
      description: 'i18n code',
      name:'code',
      type: 'string',
      title: 'i18n code'
    },
    {
      description: 'locale code',
      name:'locale',
      type: 'string',
      title: 'locale to use for time conversion (mainly to get weekday and month names)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'EHCN',
      type: 'string',
      title: 'Experimental Humanities Collaborative Network'
    },
    {
        description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
        name:'aboutEHCN',
        type: 'string',
        title: 'About EHCN'
    },
    {
        description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
        name:'archive',
        type: 'string',
        title: 'Archive'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'aboutP2',
      type: 'string',
      title: 'About Page text that goes with three pillars'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'aboutP1',
      type: 'string',
      title: 'About Page text that goes above three pillars'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'calendar',
      type: 'string',
      title: 'Calendar'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'availableIn',
      type: 'string',
      title: 'This text is also available in'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'learningResources',
      type: 'string',
      title: 'Learning Resources'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'learningResource',
      type: 'string',
      title: 'Learning Resource'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'page',
      type: 'string',
      title: 'Page'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'researchThread',
      type: 'string',
      title: 'Research Thread'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'search',
      type: 'string',
      title: 'Search'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'researchThreads',
      type: 'string',
      title: 'Research Threads'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'fundingOpportunities',
      type: 'string',
      title: 'Funding Opportunities'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'fundingOpportunity',
      type: 'string',
      title: 'Funding Opportunity'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'course',
      type: 'string',
      title: 'Course'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'courses',
      type: 'string',
      title: 'Courses'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'workingGroup',
      type: 'string',
      title: 'Working Group'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'workingGroups',
      type: 'string',
      title: 'Working Groups'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'event',
      type: 'string',
      title: 'Event'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'events',
      type: 'string',
      title: 'Events'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'upcomingEvents',
      type: 'string',
      title: 'Upcoming'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'pastEvents',
      type: 'string',
      title: 'Past'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'currentEvents',
      type: 'string',
      title: 'Current'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'partners',
      type: 'string',
      title: 'Partner Institutions'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'featured',
      type: 'string',
      title: 'Featured'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'partner',
      type: 'string',
      title: 'Partner Institution'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'ourPartners',
      type: 'string',
      title: 'Our Partners'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'project',
      type: 'string',
      title: 'Project'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'projects',
      type: 'string',
      title: 'Projects'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'news',
      type: 'string',
      title: 'News'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'studentLed',
      type: 'string',
      title: 'Student-Led'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'facultyLed',
      type: 'string',
      title: 'faculty-Led'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'selectCat',
      type: 'string',
      title: 'Select a category'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'listview',
      type: 'string',
      title: 'List View'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'networkWide',
      type: 'string',
      title: 'Network-Wide'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'selectInstitution',
      type: 'string',
      title: 'Select your institution'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'availableOpps',
      type: 'string',
      title: 'Available opportunities'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'institutionSpecific',
      type: 'string',
      title: 'Institution-Specific'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'results',
      type: 'string',
      title: 'Results'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'noResults',
      type: 'string',
      title: 'No results for'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'eventsByLocation',
      type: 'string',
      title: 'Display Events Happening In',
      description: '(location)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'eventsByTopic',
      type: 'string',
      title: 'Display Events Happening About',
      description: '(topic)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'eventsByTimezone',
      type: 'string',
      title: 'Display Events in',
      description: '(timezone)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'application',
      type: 'string',
      title: 'Application'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'timezone',
      type: 'string',
      title: 'timezone',
      description: '(timezone)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'technology',
      type: 'string',
      title: 'technology',
      description: '(technology)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'justice',
      type: 'string',
      title: 'justice',
      description: '(justice)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'creativepractice',
      type: 'string',
      title: 'creative practice',
      description: '(creative practice)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'sunday',
      type: 'string',
      title: 'Sunday'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'monday',
      type: 'string',
      title: 'Monday'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'tuesday',
      type: 'string',
      title: 'Tuesday'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'wednesday',
      type: 'string',
      title: 'Wednesday'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'thursday',
      type: 'string',
      title: 'Thursday'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'friday',
      type: 'string',
      title: 'Friday'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'saturday',
      type: 'string',
      title: 'Saturday'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'january',
      type: 'string',
      title: 'January'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'february',
      type: 'string',
      title: 'February'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'march',
      type: 'string',
      title: 'March'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'april',
      type: 'string',
      title: 'April'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'may',
      type: 'string',
      title: 'May'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'june',
      type: 'string',
      title: 'June'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'july',
      type: 'string',
      title: 'July'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'august',
      type: 'string',
      title: 'August'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'september',
      type: 'string',
      title: 'September'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'october',
      type: 'string',
      title: 'October'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'november',
      type: 'string',
      title: 'November'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'december',
      type: 'string',
      title: 'December'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'seeMore',
      type: 'string',
      title: 'See More',
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'back',
      type: 'string',
      title: 'Back',
      description: '(as in back to previous page)'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'relatedContent',
      type: 'string',
      title: 'Related Content'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'relatedWorkingGroups',
      type: 'string',
      title: 'Related Working Groups'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'relatedProjects',
      type: 'string',
      title: 'Related Projects'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'relatedCourses',
      type: 'string',
      title: 'Related Courses'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'relatedLearningResources',
      type: 'string',
      title: 'Related Learning Resources'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'relatedNews',
      type: 'string',
      title: 'Related News'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'relatedPartners',
      type: 'string',
      title: 'Related Partners'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'relatedResearchThreads',
      type: 'string',
      title: 'Related Research Threads'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'newsletter',
      type: 'string',
      title: 'newsletter'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'filters',
      type: 'string',
      title: 'Filters'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'year',
      type: 'string',
      title: 'Year'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'medium',
      type: 'string',
      title: 'Medium/Format'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'theme',
      type: 'string',
      title: 'Theme/topic'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'relatedEvents',
      type: 'string',
      title: 'Related Events'
    },
    {
      description: 'This translation is for cross-site navigation. Page-specific translations can be added via their own page in the CMS',
      name:'ehcnSupported',
      type: 'string',
      title: 'EHCN is supported by the <a href="https://opensocietyuniversitynetwork.org/">Open Society University Network</a>.'
    }
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
