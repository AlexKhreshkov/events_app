import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import { Error } from './pages/Error';
import { Main } from './pages/Main';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout /> }>
        <Route index element={<Main />} />
        <Route path='*' element={<Error />} />
    </Route>
))

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
