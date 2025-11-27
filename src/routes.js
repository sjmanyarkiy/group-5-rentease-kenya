import PropertyList from './components/PropertyList';
import Home from './pages/Home';
import TenantList from './components/TenantList';
import PropertyCard from './components/PropertyCard';
import ErrorPage from "./pages/ErrorPage";
import TenantsPage from './pages/TenantsPage';


const routes = [
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "/properties",
        element: <PropertyList />,
        errorElement: <ErrorPage />
    },
    {
        path: "/properties/:id",
        element: <PropertyCard />,
        errorElement: <ErrorPage />
    },
    {
        path: "/tenants",
        element: <TenantsPage/>,
        errorElement: <ErrorPage />
    }

]

export default routes;