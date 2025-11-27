import PropertyList from './components/PropertyList';
import Home from './pages/Home';
import TenantList from './components/TenantList';
import PropertyCard from './components/PropertyCard';
import BookingsList from './components/BookingsList';
import ErrorPage from "./pages/ErrorPage";

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
        path: "/bookings",
        element: <BookingsList />,
        errorElement: <ErrorPage />
    },
    {
        path: "/tenants",
        element: <TenantList />,
        errorElement: <ErrorPage />
    }

]

export default routes;