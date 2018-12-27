const CONFIG = require('../../config');

const state = {
  items: [],
};

// простой сервис совмещенный со стором. инициализируется один раз при загрузке
// приложения в модулях интересующихся страниц(инстанс доступен там через замыкание),
// в данном случае одной - Items, и при повторном монтировании страницы не переинициализируется.
// т.е. стор хранит информацию в течение всей работы приложения
class ItemsService {
  constructor() {
    this.state = state;
    this.listeners = [];
  }

  get() {
    return this.state;
  }

  subscribe(fn) {
    this.listeners.push(fn);

    return () => {
      this.listeners = this.listeners.filter(listener => listener !== fn);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  load() {
    return fetch(`http://localhost:${CONFIG.port}/data`)
      .then(res => res.json())
      .then((data) => {
        this.state.items = data;
        this.notify();
      })
      .catch(() => window.console.error('что-то пошло не так'));
  }

  reset() {
    this.state = state;
  }
}

export default ItemsService;
