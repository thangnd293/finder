import allRoute from './allRoute';

const allTopPrivateRoutes = allRoute.filter(route => route.isPrivate);
const allTopPublicRoutes = allRoute.filter(route => !route.isPrivate);

export { allTopPrivateRoutes, allTopPublicRoutes };
