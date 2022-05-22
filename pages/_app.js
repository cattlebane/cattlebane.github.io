// import { useEffect, useContext } from "react";
import Layout from "../components/Layout";
import UserProvider from "../store/UserProvider";
import "../styles/main.scss";
// import userContext from "../store/user-context";

function MyApp({ Component, pageProps }) {
  /* const userCtx = useContext(userContext);

  useEffect(() => {
    console.log("_app");
    console.log(" » userCtx.data:", userCtx.data);

    const getData = async () => {
      console.log("   » getData()");
      // const response = await fetch('/api/projects')
      const response = await fetch("https://gitconnected.com/v1/portfolio/cattlebane");

      const data = await response.json();

      console.log("   » data:", data);
      userCtx.setData(data);
    };

    getData();
  }, []); */

  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
