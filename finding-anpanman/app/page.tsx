// pages/index.tsx
import Head from 'next/head';
import Layout from '../components/Layout';
import Game from '../components/Game';

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Pokemon Finder</title>
        <meta name="description" content="A fun game to find Pokemon in an image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Game />
    </Layout>
  );
};

export default Home;
