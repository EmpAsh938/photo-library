import { Navbar, Hero, Search } from '../components';
import Upload from '../components/Upload';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Search />
        <Hero />
      </main>
      <Upload />
    </>
  );
}

export default Home;
