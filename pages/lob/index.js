import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import CampaignList from '../../components/campaigns/campaign-list';
import { getClients } from '../../data/dummy-data';
import breadcrumbsContext from '../../store/breadcrumbs-context';

const LobsPage = () => {
  const router = useRouter();
  const breadcrumbsCtx = useContext(breadcrumbsContext);
  const [data, setData] = useState({});

  useEffect(() => {
    const tempData = getClients();
    setData(tempData);
    const crumbs = [{ title: 'Lines of Business', path: '/lob' }];
    breadcrumbsCtx.updateBreadcrumbs(crumbs);
  }, [router]);

  if (!data.clients) {
    return <p>No entry found!</p>;
  }

  return (
    <div className="page">
      <h1 className="page-headline">Advertisers</h1>
      <CampaignList items={data.clients} />
    </div>
  );
};

export default LobsPage;
