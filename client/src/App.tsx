import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { useGlobalContext } from './context';
import { ProtectedRoute } from './helper/routes';
import { Home, Login, Signup, Error} from './pages';

const App = () => {
  const { isLoggedIn } = useGlobalContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={
          <ProtectedRoute isLoggedIn={isLoggedIn} outlet={<Login />} />
        } />
        <Route path='/signup' element={
          <ProtectedRoute isLoggedIn={isLoggedIn} outlet={<Signup />} />
        } />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
