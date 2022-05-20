import Layout from '../components/layout/layout';
import GlobalControlsProvider from '../store/GlobalControlsProvider';
import '../sass/main.scss';
import { gsap } from 'gsap';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalControlsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalControlsProvider>
  );
}

export default MyApp;
