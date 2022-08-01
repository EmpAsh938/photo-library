import { Navbar, Hero, Search } from '../components';
import Upload from '../components/Upload';
import { useGlobalContext } from '../context';

const Home = () => {
  const { activeUploadModal } = useGlobalContext();
  return (
    <>
      <Navbar />
      <main>
        <Search />
        <Hero />
      </main>
      {activeUploadModal && <Upload />}
    </>
  );
}

export default Home;
