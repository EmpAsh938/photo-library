import { Navbar, Hero, Search } from '../components';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Search />
        <Hero />
      </main>
    </>
  );
}

export default Home;
