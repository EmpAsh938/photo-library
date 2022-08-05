import { Navbar, Hero, Search } from '../components';
import Upload from '../components/Upload';
import { useAppContext } from '../hooks/useAppContext';

const Home = () => {
  const { activeUploadModal } = useAppContext();
  return (
    <>
      <Navbar />
      <main>
        <Search />
        <Hero />
      </main>
      {(activeUploadModal) && <Upload />}
    </>
  );
}

export default Home;
