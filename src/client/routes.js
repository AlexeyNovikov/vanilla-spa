import Routes from '../enums/routes';
import {
  About,
  Menu,
  Items,
} from './pages';

const routes = {
  [Routes.ABOUT]: About,
  [Routes.MENU]: Menu,
  [Routes.ITEMS]: Items,
  defaultRoute: Routes.MENU,
};

export default routes;
