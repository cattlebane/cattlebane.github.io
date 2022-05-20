import chalk from 'chalk';

const DUMMY_DATA = {
  clients: [
    { id: 'music', title: 'Music' },
    { id: 'tvapp', title: 'tv app' },
  ],
  campaigns: [
    { id: 'voice', title: 'Voice', clientID: 'music' },
    { id: 'spacial', title: 'Spacial Audio', clientID: 'music' },
    { id: 'upnext', title: 'Up Next', clientID: 'music' },
    {
      id: 'titles_partners',
      title: 'Multi-Titles and Partners',
      clientID: 'tvapp',
    },
  ],
  projects: [
    { id: 'ama', title: 'AMAs and Maria', campaignID: 'voice', profiles: [] },
    { id: 'shenseea', title: 'Shenseea', campaignID: 'upnext', profiles: [] },
    {
      id: 'thebeatles',
      title: 'The Beatles',
      campaignID: 'spacial',
      profiles: [],
    },
    {
      id: 'lockers',
      title: 'Lockers',
      campaignID: 'titles_partners',
      profiles: [],
    },
    {
      id: 'cinemagraphs',
      title: 'Cinemagraphs',
      campaignID: 'titles_partners',
      profiles: [],
    },
  ],
  units: [
    {
      project: 'ama',
      id: 'Music_Voice_AMA_AotY_320x480_NA_1x_v1',
      size: '320x480',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/voice/ama/Music_Voice_AMA_AotY_320x480_NA_1x_v1/index.html',
    },
    {
      project: 'ama',
      id: 'Music_Voice_AMA_BAotY_320x480_NA_1x_v1',
      size: '320x480',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/voice/ama/Music_Voice_AMA_BAotY_320x480_NA_1x_v1/index.html',
    },
    {
      project: 'ama',
      id: 'Music_Voice_AMA_SotY_320x480_NA_1x_v1',
      size: '320x480',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/voice/ama/Music_Voice_AMA_SotY_320x480_NA_1x_v1/index.html',
    },
    {
      project: 'ama',
      id: 'Music_Voice_AMA_tQoC_320x480_NA_1x_v1',
      size: '320x480',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/voice/ama/Music_Voice_AMA_tQoC_320x480_NA_1x_v1/index.html',
    },
    {
      project: 'ama',
      id: 'Music_Voice_AMA_tQoC_320x480_NA_1x_v1_cta',
      size: '320x480',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/voice/ama/Music_Voice_AMA_tQoC_320x480_NA_1x_v1_cta/index.html',
    },
    {
      project: 'ama',
      id: 'Music_Voice_AMA_tQoC_768x1024_NA_1x_v1',
      size: '768x1024',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/voice/ama/Music_Voice_AMA_tQoC_768x1024_NA_1x_v1/index.html',
    },
    {
      project: 'ama',
      id: 'Music_Voice_AMA_tQoC_768x1024_NA_1x_v1_cta',
      size: '768x1024',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/voice/ama/Music_Voice_AMA_tQoC_768x1024_NA_1x_v1_cta/index.html',
    },
    {
      project: 'ama',
      id: 'Music_Voice_AMA_tQoC_1024x768_NA_1x_v1',
      size: '1024x768',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/voice/ama/Music_Voice_AMA_tQoC_1024x768_NA_1x_v1/index.html',
    },
    {
      project: 'ama',
      id: 'Music_Voice_AMA_tQoC_1024x768_NA_1x_v1_cta',
      size: '1024x768',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/voice/ama/Music_Voice_AMA_tQoC_1024x768_NA_1x_v1_cta/index.html',
    },
    {
      project: 'lockers',
      id: 'ATVApp_Titles_Partners_300x250_v1',
      size: '300x250',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/tvapp/titles_partners/lockers/ATVApp_Titles_Partners_300x250_v1/index.html',
    },
    {
      project: 'cinemagraphs',
      id: 'ATVApp_Titles_Cinemagraphs_300x600_NA_1x_Bustle',
      size: '300x600',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/tvapp/titles_partners/cinemagraphs/ATVApp_Titles_Cinemagraphs_300x600_NA_1x_Bustle/index.html',
    },
    {
      project: 'cinemagraphs',
      id: 'ATVApp_Titles_Cinemagraphs_300x600_NA_1x_RS',
      size: '300x600',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/tvapp/titles_partners/cinemagraphs/ATVApp_Titles_Cinemagraphs_300x600_NA_1x_RS/index.html',
    },
    {
      project: 'cinemagraphs',
      id: 'ATVApp_Titles_Cinemagraphs_300x600_NA_1x_V2R29',
      size: '300x600',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/tvapp/titles_partners/cinemagraphs/ATVApp_Titles_Cinemagraphs_300x600_NA_1x_V2R29/index.html',
    },
    {
      project: 'cinemagraphs',
      id: 'ATVApp_Titles_Cinemagraphs_970x250_NA_1x_V1Variety',
      size: '970x250',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/tvapp/titles_partners/cinemagraphs/ATVApp_Titles_Cinemagraphs_970x250_NA_1x_V1Variety/index.html',
    },
    {
      project: 'cinemagraphs',
      id: 'ATVApp_Titles_Cinemagraphs_970x250_NA_1x_V2R29',
      size: '970x250',
      type: 'text/html', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/tvapp/titles_partners/cinemagraphs/ATVApp_Titles_Cinemagraphs_970x250_NA_1x_V2R29/index.html',
    },

    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Performance_300x50_2x_static',
      size: '300x50',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Performance_300x50_2x.jpg',
    },
    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Performance_300x250_2x_static',
      size: '300x250',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Performance_300x250_2x.jpg',
    },
    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Performance_300x600_2x_static',
      size: '300x600',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Performance_300x600_2x.jpg',
    },
    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Performance_320x50_2x_static',
      size: '320x50',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Performance_320x50_2x.jpg',
    },
    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Performance_320x480_2x_static',
      size: '320x480',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Performance_320x480_2x.jpg',
    },
    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Performance_480x320_2x_static',
      size: '480x320',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Performance_480x320_2x.jpg',
    },
    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Performance_728x90_2x_static',
      size: '728x90',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Performance_728x90_2x.jpg',
    },
    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Performance_768x1024_2x_static',
      size: '768x1024',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Performance_768x1024_2x.jpg',
    },
    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Performance_1024x768_2x_static',
      size: '1024x768',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Performance_1024x768_2x.jpg',
    },
    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Social-Snapchat_1080x1920_static',
      size: '1080x1920',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Social-Snapchat_1080x1920.jpg',
    },
    {
      project: 'shenseea',
      id: 'AM_UpNext_Shenseea_Social-Twitter_800x418_static',
      size: '800x418',
      type: 'image/jpeg', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/statics/AM_UpNext_Shenseea_Social-Twitter_800x418.jpg',
    },

    {
      project: 'shenseea',
      id: 'AppleMusic_UpNext_Shenseea_Programmatic_Motion_15sec_1080x1920',
      size: '1080x1920',
      type: 'video/mp4', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/motion/AppleMusic_UpNext_Shenseea_Programmatic_Motion_15sec_1080x1920.mp4',
    },
    {
      project: 'shenseea',
      id: 'AppleMusic_UpNext_Shenseea_Programmatic_Motion_15sec_1920x1080',
      size: '1920x1080',
      type: 'video/mp4', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/motion/AppleMusic_UpNext_Shenseea_Programmatic_Motion_15sec_1920x1080.mp4',
    },
    {
      project: 'shenseea',
      id: 'AppleMusic_UpNext_Shenseea_YT_Motion_15s_1920x1080mp4_trimmed',
      size: '1920x1080',
      type: 'video/mp4', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/motion/AppleMusic_UpNext_Shenseea_YT_Motion_15s_1920x1080mp4_trimmed.mp4',
    },
    {
      project: 'shenseea',
      id: 'AppleMusic_UpNext_Shenseea_YT_Motion_15s_1920x1080mp4',
      size: '1920x1080',
      type: 'video/mp4', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/upnext/shenseea/motion/AppleMusic_UpNext_Shenseea_YT_Motion_15s_1920x1080mp4.mp4',
    },

    {
      project: 'thebeatles',
      id: 'US_TheBeatles_Static_Light_480x320_2x',
      size: '480x320',
      type: 'image/png', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/spacial/thebeatles/static/US_TheBeatles_Static_Light_480x320_2x.png',
    },
    {
      project: 'thebeatles',
      id: 'US_TheBeatles_Static_Light_768x1024_2x',
      size: '768x1024',
      type: 'image/png', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/spacial/thebeatles/static/US_TheBeatles_Static_Light_768x1024_2x.png',
    },
    {
      project: 'thebeatles',
      id: 'US_TheBeatles_Static_Light_1024x768_2x',
      size: '1024x768',
      type: 'image/png', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/spacial/thebeatles/static/US_TheBeatles_Static_Light_1024x768_2x.png',
    },
    {
      project: 'thebeatles',
      id: 'US_TheBeatles_Static_Light_TradeDesk_300x250_2x',
      size: '300x250',
      type: 'image/png', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/spacial/thebeatles/static/US_TheBeatles_Static_Light_TradeDesk_300x250_2x.png',
    },
    {
      project: 'thebeatles',
      id: 'US_TheBeatles_Static_Light_TradeDesk_320x480_2x',
      size: '320x480',
      type: 'image/png', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/spacial/thebeatles/static/US_TheBeatles_Static_Light_TradeDesk_320x480_2x.png',
    },

    {
      project: 'thebeatles',
      id: 'US_The-Beatles_Motion_Medium_TTD_1080x1920',
      size: '1080x1920',
      type: 'video/mp4', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/spacial/thebeatles/motion/US_The-Beatles_Motion_Medium_TTD_1080x1920.mp4',
    },
    {
      project: 'thebeatles',
      id: 'US_The-Beatles_Motion_Medium_TTD_1920x1080',
      size: '1920x1080',
      type: 'video/mp4', // ** mime types (text/html) (image/png) (image/svg+xml) (image/jpeg) (video/mp4)
      path: '/units/music/spacial/thebeatles/motion/US_The-Beatles_Motion_Medium_TTD_1920x1080.mp4',
    },
  ],
};

/* export function getFeaturedUnits() {
    return DUMMY_DATA.filter((event) => event.isFeatured);
  } */

export function getAllUnits() {
  return DUMMY_DATA.units;
}

/* export function getFilteredEntries(dateFilter) {
    const { year, month } = dateFilter;
  
    let filteredEntries = DUMMY_DATA.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });
  
    return filteredEntries;
  } */

export function getClients() {
  const clients = [...DUMMY_DATA.clients];
  clients.map((client) => {
    client.path = `/lob/${client.id}`;
  });
  const data = { clients: [...clients] };
  return data;
}

export function getCampaignsByClient(clientID) {
  console.log('DUMMY_DATA', 'getCampaignsByClient()');
  console.log(' » clientID:', clientID);
  if (!clientID) return {};

  const client = DUMMY_DATA.clients.find((client) => client.id === clientID);
  console.log(' » client:', client);

  const campaigns = DUMMY_DATA.campaigns.filter(
    (campaign) => campaign.clientID === clientID
  );
  campaigns.map((campaign) => {
    campaign.path = `/lob/${clientID}/${campaign.id}`;
  });
  console.log(' » campaigns:', campaigns);

  // ** include client/campiagn data with the units list
  const campaignsData = {
    client: { title: client.title, id: clientID },
    campaigns: campaigns,
  };

  return campaignsData;
}

export function getProjectsByCampaign(campaignID) {
  console.log('DUMMY_DATA', 'getProjectsByCampaign()');
  console.log(' » campaignID:', campaignID);
  if (!campaignID) return {};

  const campaign = DUMMY_DATA.campaigns.find(
    (campaign) => campaign.id === campaignID
  );
  console.log(' » campaign:', campaign);

  const client = DUMMY_DATA.clients.find(
    (client) => client.id === campaign.clientID
  );
  console.log(' » client:', client);

  const projects = DUMMY_DATA.projects.filter(
    (project) => project.campaignID === campaignID
  );
  projects.map((project) => {
    project.path = `/lob/${client.id}/${campaignID}/${project.id}`;
    // return { ...project, path: `/lob/${client.id}/${campaignID}` };
  });
  console.log(' » projects:', projects);

  // ** include client/campiagn/project data with the units list
  const projectsData = {
    client: { title: client.title, id: client.id },
    campaign: { title: campaign.title, id: campaign.id },
    projects: projects,
  };

  return projectsData;
}

export function getUnitsByProject(projectID) {
  console.log(chalk.red('DUMMY_DATA')); //, 'getUnitsByProject() using chalk');
  const style =
    'background-color: yellow; color: black; font-weight: bold; font-size: 17px; padding: 10px; border-radius: 10px';
  console.log(
    chalk.yellow('%cDUMMY_DATA getUnitsByProject() using styles'),
    style
  );
  console.log('\x1B[32;1mDUMMY_DATA\x1B[m getUnitsByProject()');
  console.log(' » projectID:', projectID);
  if (!projectID) return {};

  const units = DUMMY_DATA.units.filter((unit) => unit.project === projectID);
  console.log(' » units:', units);

  const project = DUMMY_DATA.projects.find(
    (project) => project.id === projectID
  );
  console.log(' » project:', project);

  const campaign = DUMMY_DATA.campaigns.find(
    (campaign) => campaign.id === project.campaignID
  );
  console.log(' » campaign:', campaign);

  const client = DUMMY_DATA.clients.find(
    (client) => client.id === campaign.clientID
  );
  console.log(' » client:', client);

  // ** include client/campiagn/project data with the units list
  const unitsData = {
    client: { title: client.title, id: client.id },
    campaign: { title: campaign.title, id: campaign.id },
    project: { title: project.title, id: project.id },
    units: units,
  };

  return unitsData;
}

export function getUnitById(id) {
  return DUMMY_DATA.find((unit) => unit.id === id);
}
