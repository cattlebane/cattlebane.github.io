import Layout from "../components/Layout";
import UserProvider from "../store/UserProvider";
import "../styles/main.scss";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
