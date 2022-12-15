import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import { AccountActivation } from './pages/AccountActivation';
import { AdDetail } from './pages/AdDetail';
import { Error } from './pages/Error';
import { Main } from './pages/Main';
import { ResetPassword } from './pages/SetNewPassword';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='activate/:uid/:token' element={<AccountActivation />} />
        <Route path='password/reset/confirm/:uid/:token' element={<ResetPassword />} />
        <Route path='announcement/:adSlug' element={<AdDetail />} />
        <Route path='*' element={<Error />} />
    </Route>
))

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
