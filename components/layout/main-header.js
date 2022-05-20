import Link from 'next/link';

import classes from './main-header.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Home</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/lob">Browse All LOBs</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
