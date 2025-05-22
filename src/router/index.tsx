import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';

// Wrap each route's element in the appropriate layout
const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank'
            ? <BlankLayout>{route.element}</BlankLayout>
            : <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

// ✅ Add basename for subdirectory hosting
const router = createBrowserRouter(finalRoutes);

export default router;
