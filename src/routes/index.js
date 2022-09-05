import routes from '~/config/routes';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';
import Video from '~/pages/Video';
import Search from '~/pages/Search';

const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.following, component: Following },
    { path: routes.profile, component: Profile },
    { path: routes.upload, component: Upload, prop: true },
    { path: routes.video, component: Video, layout: null },
    { path: routes.search, component: Search },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
