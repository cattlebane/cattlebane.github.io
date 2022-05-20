import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import CampaignList from '../../../../components/campaigns/campaign-list';
import { getProjectsByCampaign } from '../../../../data/dummy-data';
import breadcrumbsContext from '../../../../store/breadcrumbs-context';

const CampaignPage = () => {
  const router = useRouter();
  const breadcrumbsCtx = useContext(breadcrumbsContext);
  const [data, setData] = useState({});

  useEffect(() => {
    const campaignid = router.query.campaignid;
    console.log('[campaignid]');
    console.log(' » campaignid:', campaignid);
    if (!campaignid) return;
    const tempData = getProjectsByCampaign(campaignid);
    // const { client, campaign, project, units } = data;
    /* tempData.projects.map((project) => {
      project.client = { ...tempData.client };
      project.campaign = { ...tempData.campaign };
    }); */
    setData(tempData);
    const { client, campaign, projects } = tempData;
    if (!client) return;
    const crumbs = [
      { title: client.title, path: `/lob/${client.id}` },
      { title: campaign.title, path: `/lob/${client.id}/${campaign.id}` },
    ];
    breadcrumbsCtx.updateBreadcrumbs(crumbs);
  }, [router]);

  if (!data.projects) {
    return <p>No entry found!</p>;
  }

  return (
    <div className="page">
      <h1 className="page-headline">Projects</h1>
      <CampaignList items={data.projects} />
    </div>
  );
};

export default CampaignPage;
