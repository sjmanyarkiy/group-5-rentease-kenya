import PropertyList from './components/PropertyList';
import Home from './pages/Home';
// import TenantList from './components/TenantList';
import PropertyCard from './components/PropertyCard';
import ErrorPage from "./pages/ErrorPage";
import TenantsPage from './pages/TenantsPage';
import BookingList from './components/BookingList'; // capital L
import BookingRequestForm from './components/BookingRequestForm';
import AddNewForm from './components/AddNewForm';
import Dashboard from './components/Dashboard';

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
        element: <BookingList />,
        errorElement: <ErrorPage />
    },
    {
        path: "/tenants",
        element: <TenantsPage />,
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
    },

{
  path: "/request-booking",
  element: <BookingRequestForm />,
},

{
    path: "/dashboard",
    element: <Dashboard />,
  },

];

export default routes;
