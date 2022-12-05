import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import { Error } from './pages/Error';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Register } from './pages/Register';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
    </Route>
))

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
