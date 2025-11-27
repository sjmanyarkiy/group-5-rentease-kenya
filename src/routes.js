import PropertyList from './components/PropertyList';
import Home from './pages/Home';
import TenantList from './components/TenantList';
import PropertyCard from './components/PropertyCard';
import ErrorPage from "./pages/ErrorPage";
import BookingList from './components/BookingList'; // <-- FIXED
import AddNewForm from './components/AddNewForm';

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
        element: <TenantList />,
        errorElement: <ErrorPage />
    },
    {
        path: "/bookings",
        element: <BookingList />,
        errorElement: <ErrorPage />
    },
    {
        path: "/add-new-form",
        element: <AddNewForm />,
        errorElement: <ErrorPage />
    }
];

export default routes;
