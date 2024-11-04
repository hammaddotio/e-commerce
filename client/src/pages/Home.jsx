import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";

const Home = () => {
  const { auth } = useAuth()
  return (
    <Layout>
      <h1>Home</h1>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </Layout>
  );
};

export default Home;
