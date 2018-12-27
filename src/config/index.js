const Envs = require('../enums/envs');

// вынужденный хак по причине того, что конфиг общий и на сервер и на клиент.
// на клиенте это глобальная переменная(благодаря webpack), а на сервере нет,
// поэтому будет ошибка при попытке доступа к неопределенной переменной
// eslint-disable-next-line
var ENV;

const env = ENV || (process.env.NODE_ENV !== 'none' ? process.env.NODE_ENV : Envs.DEVELOPMENT);
let CONFIG = null;

if (env === Envs.PRODUCTION) {
  CONFIG = {
    port: 3300,
  };
} else if (env === Envs.DEVELOPMENT) {
  CONFIG = {
    port: 3300,
  };
} else {
  throw new Error('Укажите верное окружение запуска');
}

module.exports = CONFIG;
