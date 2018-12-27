import Router from './app/router';
import routes from './routes';

const mountPoint = document.getElementById('root');
const router = new Router(routes, mountPoint);

router.start();

// чтобы можно было вручную походить по истории из консоли и посмотреть состояние
window.router = router;
