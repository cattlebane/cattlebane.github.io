import Link from 'next/link';
import CampaignList from '../components/campaigns/campaign-list';
import breadcrumbsContext from '../store/breadcrumbs-context';
import { getFeaturedEntries } from '../data/dummy-entries';
import { useContext, useEffect } from 'react';
import CampaignItem from '../components/campaigns/campaign-item';

const HomePage = () => {
  const featuredEntries = getFeaturedEntries();
  const breadcrumbsCtx = useContext(breadcrumbsContext);

  useEffect(() => {
    breadcrumbsCtx.updateBreadcrumbs([{ title: '', path: '/' }]);
  }, []);

  return (
    <div>
      <ul>
        {/* <CampaignItem item={{ title: 'Admin', path: '/admin' }} />
        <CampaignItem item={{ title: 'Lines Of Business', path: '/lob' }} /> */}
        <CampaignList
          items={[
            { id: 'admin', title: 'Admin', path: '/admin' },
            { id: 'lob', title: 'Lines Of Business', path: '/lob' },
          ]}
        />

        {/* <li>
          <Link href="/admin">Admin</Link>
        </li>
        <li>
          <Link href="/lob">Lines Of Business</Link>
        </li> */}
      </ul>
      {/* <div>
        <h2>Most Recent Campaigns</h2>
        <CampaignList items={featuredEntries} />
      </div> */}
    </div>
  );
};

export default HomePage;
