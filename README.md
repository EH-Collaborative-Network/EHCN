# EHCN
Website for The Experimental Humanities Collaborative Network

## Dev Stack
- Sanity.io - our CMS which is queried via GraphQL
- GraphQL - to query our CMS
- Gatsby.js - React-based static site builder.
- flexsearch - for search functionality on website
- Netlify - for hosting and continuous deployment

## Credentials you would need from Aarati
- You would need write access to this repository
- You would also need access to the Netlify team 

## Domain
- Our domain is managed through the IT department at Bard College - Annandale

## Quick start
1. Clone this repository from your GitHub account
2. `npm install` in the project root folder on local
3. `npm run dev` to start the Studio and frontend locally
   - Your Studio should be running on [http://localhost:3333](http://localhost:3333)
   - Your frontend should be running on [http://localhost:8000](http://localhost:8000)
4. `npm run build` to build to production locally


## Deploy changes
Netlify automatically deploys new changes commited to the `master` branch on GitHub. If you want to change the deployment branch you may do so in [build & deploy settings on Netlify](https://www.netlify.com/docs/continuous-deployment/#branches-deploys).
--------------
# Studio - Schema Structure:
## Documents
- **Course**: Network courses. Can be associated with events, learning resources, news items, partners, projects, research threads, & working groups.
- **Event**: Events. Can be associated with other events (useful for entering many sub-events that might fall under one big event such as a symposium), courses, learning resources, news items, partners, projects, research threads, & working groups.
- **Language**: (for translation purposes) Contains language name, ii8n code, and several phrase fields that are used across the website for things like navigation. Not every language entered will appear as a global translation option on the website so "ad hoc" languages can be added for the purposes of translating a specific description. In these cases, the phrase fields would just be left blank. (More on translation in the next section).
- **Learning Resource**: Educational resources such as assignment prompts, lesson plans, research materials, etc. that are displayed on the learning resources page of the website and can also be associated with courses, events, partners, projects, research threads, & working groups.
- **NewsItem**: Essentially blog posts. We don't really have this section fully set up yet because there hasn't been much news to post. We may need to think about the effort involved in this as well.
- **Opportunity**: These are our funding opportunities. These are only displayed on the funding page and also associated partner pages.
- **Page**: Can be used to add "ad hoc" pages as needed.
- **Partner**: Pages for partner institutions. Can be associated with courses, events, learning resources, news items, people, projects, research threads, & working groups.
- **Person**: This is displayed as "EHCN Personnel" in the CMS. Bio's and pictures for staff and steering committee.
- **Project**: Any EHCN Project that does not fall under the category of Event, Course, or Working Group. Can be associated with events, learning resources, news items, partners, courses, research threads, & working groups.
- **Research Thread**: These essentially act as "themes." This allows visitors to filter and sort content based on topic/subject matter.
- **Site Settings**: Contains seo settings (which actually currently aren't being queried bc of a graphql bloating issue), settings for the marquee on the website, settings for which languages are available globally on the website.
- **Time Zone**: Stores time zone information-- specifically the utf offset (for the calendar) and name of the timezone.
- **Working Group**: Formerly known as Clusters. These could either be student-led or faculty-led working groups based around a topic (i.e. Food or Urban gardening). Can be associated with events, learning resources, news items, partners, projects, research threads, & courses.

## Note on Translation
I'm not using any kind of out-of-the-box translation solution so the way we are doing translation on this website might seem a little unconventional but it's working well so far! The gist of it is that there are languages that are available *globally* across the site (meaning navigation is translated, titles are translated, the about page text is translated, etc.), but there are also *ad-hoc* translations, meaning the ability to add translations for specific pieces of content (for example, translating the description of an event in Thessaly into Greek). Both ad-hoc and global languages are added as Language Documents (see above list), but globally translated languages are indicated in the CMS by adding them under site-settings. To create an ad-hoc translation, one would not necessarily need to create a new language document if it happens to already exist -- they would just directly add the translation in the field they were editing (such as an event description) and select the language of the translation. All rich text fields on the CMS and titles exist as "translation objects," meaning you can add multiple translations and every piece of text needs to have the language indicated. So if I am adding a description for an event, I would add a "translation," add my text and set the language of the translation to english. I could then, add another translation if I have it in another language. 

## Objects
- **Application Link**: Link to application, text, and associated partner institutions
- **Date Object**:
- **Embed**: For embedding video or audio (used in the Media Item object)
- **Figure**: For adding images (used in the Media Item object)
- **Link**: Link url and text to display
- **Media Item**: For adding media. Gives you three options: embed code, image, or pdf file
- **Pdf**: For adding pdf files (used in the Media Item object)
- **Rich Text**: A custom rich text editor (see sanity documentation for more info on customization)
- **Title Translation**: Text of the translation, language associated with the translation
- **Translation**: Same as above, but with rich text instead of plain text. 

## Components
- **Image Renderer**: This allows inline images to be rendered in the CMS richtext editor.

--------------

# Web - Structure:

## Components
Each component (with a few exceptions) has it's own folder with a js file and css file.
- **Carousel**: Carousel module used on partner pages, course pages, research thread pages, working group pages, learning resource pages, & the research *threads* index page.
- **Container**: Kind of a global wrapper for every page
- **context**: Not really a component, this allows for there to be a global varialbes so that things such as the currently displayed language don't have to be passed down to every component one by one.
- **Figure**: For rendering images (uses gatsby image to make them responsive).
- **FundingOpportunity**: Only displayed on Funding page and on associated partner pages. Institution specific opportunities will display multiple application links, whereas general opportunities will have one application link. All that logic is in here.
- **Layout**: Also kind of a global wrapper for every page, but holds things like the marquee and lightbox.
- **LearningResource**: Module for showing a summary of a learning resource. Used on the learning resources index page and also if a learning resource is associated on another page such as a partner page.
- **Lightbox**: Used for media items across the site.
- **Map**: The interactive map that is on the homepage. Uses p5js
- **Marquee**: The marquee that is on several pages
- **Masonry**: For the masonry media item layout used on events & projects pages
- **MediaItem**: For displaying media (can be a video embed, audio embed, image, or pdf)
- **Modal**: For modal ui mainly used for EHCN personnel bios within rich text or on the about page.
- **Navigation**: The global site navigation
- **Person**: Button component for displaying an EHCN personnel bio (triggers the modal) and name.
- **Popover**: For a "popover" description used mainly on the calendar when hovering over event titles.
- **RelatedBlock**: For the bottom of content pages where associated content is displayed.
- **ResearchThread**: Module for showing a summary of a research thread. Used on the research threads index page and uses the carousel module.
- **Search**: Module for the search field used both in the navigation and on the Search page
- **Time**: Contains several components used in displaying/converting dates and times as well as the weekly and monthly view on the calendar.
- **TranslationHelpers**: Contains several components used in translating plain and rich text across the site.

## pages
- **404**: 404 page
- **about**: About EHCN
- **calendar**: Contains a calendar for viewing events by week or month
- **funding**: Funding Opportunities
- **index**: The homepage
- **learning resources**: Featured learning resources and allows for searching through learning resources
- **research threads**: Lists all research threads and content that falls under each
- **search**: Global site search

## templates
- **course**: Network Course template
- **event**: Event template
- **learning resource**: Learning Resource template
- **news item**: News item template (kind of like a blog post)
- **page**: Default page template
- **partner**: Partner Institution page template
- **project**: Project page template
- **research thread**: Research Thread page template
- **working group**: Working Group page template (fka Clusters)

## styles
- **custom media**: global media query sizes
- **custom properties**: global css variables
- **layout**: global css (has also become kind of a catch-all that needs to be cleaned up a bit)