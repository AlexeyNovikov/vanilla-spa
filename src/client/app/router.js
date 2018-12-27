const MAX_HISTORY_LENGTH = 10;

// навигацию с вручную введенного в сроке запроса роута не делал намеренно.
// запускается с любого роута, а дальше работает только с существующими.
class Router {
  constructor(routes, mountPoint) {
    this.routes = routes;
    this.mountPoint = mountPoint;
    this.history = [];
    this.historyPointer = 0;
    this.currentPage = null;

    const currentPath = window.location.hash.slice(1);

    if (currentPath in routes) {
      this.history.push(currentPath);
    } else {
      this.history.push(routes.defaultRoute);
    }

    this.render = this.render.bind(this);
  }

  start() {
    window.addEventListener('hashchange', this.render);
    window.addEventListener('load', this.render);
  }

  navigate(path) {
    if (this.history.length === MAX_HISTORY_LENGTH) {
      this.history.shift();
    }

    this.history.push(path);
    this.historyPointer = this.history.length - 1;

    window.location.hash = path;
  }

  getCurrentPath() {
    return this.history[this.historyPointer];
  }

  getHistory() {
    return this.history;
  }

  forward(evt) {
    if (evt) evt.preventDefault();

    if (this.history.length - 1 > this.historyPointer) {
      this.historyPointer++;
      window.location.hash = this.history[this.historyPointer];
    }
  }

  backward(evt) {
    if (evt) evt.preventDefault();

    if (this.historyPointer > 0) {
      this.historyPointer--;
      window.location.hash = this.history[this.historyPointer];
    }
  }

  render() {
    const Page = this.routes[this.getCurrentPath()];

    if (Page) {
      const newPage = new Page({
        mountPoint: this.mountPoint,
        navigate: this.navigate.bind(this),
        backward: this.backward.bind(this),
      });
      const oldPage = this.currentPage;

      if (oldPage && oldPage.beforeUnmount) oldPage.beforeUnmount();
      if (newPage.beforeMount) newPage.beforeMount();

      newPage.render();

      this.currentPage = newPage;
    }
  }
}

export default Router;
