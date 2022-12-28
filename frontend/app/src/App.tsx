import './App.css';
import { Layout } from './components/Layout';
import { AccountActivation } from './pages/AccountActivation';
import { AdDetail } from './pages/AdDetail';
import { CreateNewAdd } from './pages/CreateNewAdd';
import { Error } from './pages/Error';
import { Main } from './pages/Main';
import { Profile } from './pages/Profile';
import { ResetPassword } from './pages/SetNewPassword';

import { ROUTES_PATH } from './utils/constants';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={ROUTES_PATH.Main} element={<Layout />}>
        <Route index element={<Main />} />
        <Route path={ROUTES_PATH.AccountActivation} element={<AccountActivation />} />
        <Route path={ROUTES_PATH.ResetPassword} element={<ResetPassword />} />
        <Route path={ROUTES_PATH.AdDetail} element={<AdDetail />} />
        <Route path={ROUTES_PATH.CreateAd} element={<CreateNewAdd />} />
        <Route path={ROUTES_PATH.Profile} element={<Profile />} />
        <Route path='*' element={<Error />} />
    </Route>,
))

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
