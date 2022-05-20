import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import CampaignList from '../../../components/campaigns/campaign-list';
import { getCampaignsByClient } from '../../../data/dummy-data';
import breadcrumbsContext from '../../../store/breadcrumbs-context';

const LobPage = () => {
  const router = useRouter();
  const breadcrumbsCtx = useContext(breadcrumbsContext);
  const [data, setData] = useState({});

  useEffect(() => {
    const lobid = router.query.lobid;
    console.log('[lobid]');
    console.log(' » lobid:', lobid);
    if (!lobid) return;
    const tempData = getCampaignsByClient(lobid);
    // const { client, campaign, project, units } = data;
    /* tempData.projects.map((project) => {
      project.client = { ...tempData.client };
      project.campaign = { ...tempData.campaign };
    }); */
    setData(tempData);
    const { client } = tempData;
    if (!client) return;
    const crumbs = [{ title: client.title, path: `/lob/${lobid}` }];
    breadcrumbsCtx.updateBreadcrumbs(crumbs);
  }, [router]);

  if (!data.campaigns) {
    return <p>No entry found!</p>;
  }

  return (
    <div className="page">
      <h1 className="page-headline">Campaigns</h1>
      <CampaignList items={data.campaigns} />
    </div>
  );
};

export default LobPage;
