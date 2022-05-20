import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import breadcrumbsContext from '../../../store/breadcrumbs-context';
import GlobalControls from '../../units/GlobalControls/GlobalControls';

// import { getUnitsByProject } from '../../../data/dummy-data';

const Header = (props) => {
  // const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const breadcrumbsCtx = useContext(breadcrumbsContext);

  /* const projectid = router.query.projectid;
  const data = getUnitsByProject(projectid);
  const { client, campaign, project, units } = data;
  const title = `${client} - ${campaign} - ${project}`; */

  useEffect(() => {
    const dash = (
      <span className="bread-crumb-separator bread-crumb-grey">›</span>
    );
    const breadcrumbList = breadcrumbsCtx.breadcrumbs.map(
      (breadcrumb, index) => {
        return (
          <li key={`breadcrumb-${index}`}>
            {index < breadcrumbsCtx.breadcrumbs.length - 1 ? (
              <Link href={breadcrumb.path}>
                <a className="bread-crumb bread-crumb-grey">
                  {breadcrumb.title}
                </a>
              </Link>
            ) : (
              <span className="bread-crumb-white">{breadcrumb.title}</span>
            )}
            {index < breadcrumbsCtx.breadcrumbs.length - 1 ? dash : ''}
          </li>
        );
      }
    );
    setBreadcrumbs([...breadcrumbList]);
  }, [breadcrumbsCtx.breadcrumbs]);

  // let title = props.projectName ? props.projectName.split('-').join(' ') : '';

  return (
    <header className="Header">
      <div className="Header-lockup">
        <Link href="/">
          <a className="btn-global-controls btn-global-controls-icon btn-global-controls-white Header-lockup-apple">
            {/* <img
              className="Header-lockup-apple"
              src={logo_apple.src}
              alt="Apple Logo"
            /> */}
            
          </a>
        </Link>
        {/* <h1 className="Header-lockup-title">&nbsp; {title}</h1> */}
        <h1 className="Header-lockup-title">
          &nbsp;
          <ul>{breadcrumbs.length < 1 ? 'NO CRUMBS' : breadcrumbs}</ul>
        </h1>
      </div>
      <GlobalControls />
    </header>
  );
};

export default Header;
