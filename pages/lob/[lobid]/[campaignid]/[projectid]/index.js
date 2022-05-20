import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import BuildModules from '../../../../../components/units/BuildModules/BuildModules';
import FilterTools from '../../../../../components/units/FilterTools/FilterTools';
// import CampaignItem from '../../../../../components/campaigns/campaign-item';
// import UnitItem from '../../../../../components/units/unit-item';
import UnitList from '../../../../../components/units/unit-list';
// import { getEntryById } from '../../../../../data/dummy-entries';
import { getUnitsByProject } from '../../../../../data/dummy-data';
import breadcrumbsContext from '../../../../../store/breadcrumbs-context';
import FilterContext from '../../../../../store/filter-context';
import GlobalControlsContext from '../../../../../store/globalcontrols-context';

const ProjectPage = () => {
  const router = useRouter();
  const breadcrumbsCtx = useContext(breadcrumbsContext);
  const [data, setData] = useState();
  const filterCtx = useContext(FilterContext);
  const globalControlsCtx = useContext(GlobalControlsContext);

  useEffect(() => {
    // ** initially reset zoom level to 100%
    if (globalControlsCtx) {
      globalControlsCtx.setZoomLevel(100);
    }

    return () => {
      console.log('[projectid] cleanup');
      // ** remove all filters on exit
      if (filterCtx) {
        console.log(' » clear filters');
        filterCtx.clear();
      }
      // ** reset zoom level to 100% on exit
      if (globalControlsCtx) {
        console.log(' » reset zoomLevel');
        globalControlsCtx.setZoomLevel(100);
      }
    };
  }, []);

  useEffect(() => {
    const projectid = router.query.projectid;
    console.log('[projectid]');
    console.log(' » projectid:', projectid);
    const data = getUnitsByProject(projectid);
    // const { client, campaign, project, units } = data;
    setData(data);
    const { client, campaign, project } = data;
    if (!client) return;
    const crumbs = [
      { title: client.title, path: `/lob/${client.id}` },
      { title: campaign.title, path: `/lob/${client.id}/${campaign.id}` },
      {
        title: project.title,
        path: `/lob/${client.id}/${campaign.id}/${project.id}`,
      },
    ];
    breadcrumbsCtx.updateBreadcrumbs(crumbs);
  }, [router]);

  // console.log(' » client:', client);
  // console.log(' » campaign:', campaign);
  // console.log(' » project:', project);
  // console.log(' » units:', units);

  if (!data) {
    return <p>No entry found!</p>;
  }

  return (
    <div>
      <FilterTools builds={data.units} />
      {/* <h1>LOB: {client}</h1>
      <h2>Campaign: {campaign}</h2>
    <h3>Project: {project}</h3> */}
      {/* <h2>Filters and Profiles to organize Units</h2> */}
      <h1 className="page-headline">Units</h1>
      {/* <UnitList items={data.units} /> */}
      <BuildModules builds={data.units} />
    </div>
  );
};

export default ProjectPage;
