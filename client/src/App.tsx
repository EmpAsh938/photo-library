import React, { FC } from 'react';
import { Navbar, Hero, Search } from './components';

const App:FC = () => {
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

export default App;
