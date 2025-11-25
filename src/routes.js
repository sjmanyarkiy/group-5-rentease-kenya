import PropertyList from './components/PropertyList';
import Home from './pages/Home';
import TenantList from './components/TenantList';

const routes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/properties",
        element: <PropertyList />
    },
    {
        path: "/tenants",
        element: <TenantList />
    }

]

export default routes;