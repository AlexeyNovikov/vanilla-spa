import BackLink from '../../components/link';
import Loader from '../../components/loader';
import ItemsService from '../../services/items';
import uuid from '../../../utils/uuid';

import css from './index.css';

const itemsService = new ItemsService();

class Items {
  constructor(opts) {
    this.mountPoint = opts.mountPoint;
    this.backward = opts.backward;
    this.items = itemsService.get().items;

    const backLink = new BackLink(this.backward);
    this.externalComponents = {
      backLink: {
        instance: backLink,
        element: backLink.getElement(),
        wrapId: uuid(),
      },
    };

    this.unsubscribe = itemsService.subscribe(this.render.bind(this));
  }

  beforeMount() {
    if (!this.items.length) itemsService.load();
  }

  beforeUnmount() {
    Object.keys(this.externalComponents).forEach((key) => {
      this.externalComponents[key].instance.beforeUnmount();
    });

    this.unsubscribe();
  }

  renderTableHeader() {
    return `
      <thead>
        <tr class="${css.tr}">
          <th class="${css.th}">Название</th>
          <th class="${css.th}">Количество</th>
          <th class="${css.th}">Цена</th>
        </tr>
      </thead>
    `;
  }

  renderTableBodyList(items) {
    return items.reduce((accum, elem) => (
      `
        ${accum}
        <tr class="${css.tr}">
          <td class="${css.td}">${elem.name}</td>
          <td class="${css.td}">${elem.quantity}</td>
          <td class="${css.td}">${elem.price}</td>
        </tr>
      `
    ), '');
  }

  renderTable(items) {
    return `
      <table class="${css.table}">
        ${this.renderTableHeader()}
        <tbody>
          ${this.renderTableBodyList(items)}
        </tbody>
      </table>
    `;
  }

  renderLoading() {
    return Loader();
  }

  render() {
    const { items } = itemsService.get();
    const {
      backLink: {
        element: backLink,
        wrapId: backLinkWrapId,
      },
    } = this.externalComponents;

    // на количество товаров завязываться нельзя, само собой, их может не быть
    const content = items.length
      ? this.renderTable(items)
      : this.renderLoading();

    this.mountPoint.innerHTML = `
      <div class="${css.container}">
        <div id="${backLinkWrapId}"></div>
        <div class="${css.page}">
          <h1>Товары</h1>
          <p class="${css.content}">${content}</p>
        </div>
      </div>
    `;

    const backLinkWrap = document.getElementById(backLinkWrapId);
    backLinkWrap.appendChild(backLink);
  }
}

export default Items;
