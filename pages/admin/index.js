import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminPage = () => {
  const router = useRouter();
  const path = `${router.pathname}/`;

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        <li>
          <Link href={`${path}lob`}>Lines Of Business</Link>
        </li>
        <li>
          <Link href={`${path}projects`}>Projects</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminPage;
