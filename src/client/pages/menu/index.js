import Routes from '../../../enums/routes';
import BackLink from '../../components/link';
import uuid from '../../../utils/uuid';

import css from './index.css';

class Menu {
  constructor(opts) {
    this.mountPoint = opts.mountPoint;
    this.navigate = opts.navigate;
    this.backward = opts.backward;
    this.routesIds = {
      [Routes.ABOUT]: uuid(),
      [Routes.ITEMS]: uuid(),
    };
    this.externalComponents = {
      backLink: new BackLink(this.backward),
    };

    this.toAnotherPage = this.toAnotherPage.bind(this);
  }

  beforeUnmount() {
    Object.values(this.routesIds).forEach((id) => {
      document.getElementById(id).removeEventListener('click', this.toAnotherPage);
    });
    Object.keys(this.externalComponents).forEach((key) => {
      this.externalComponents[key].beforeUnmount();
    });
  }

  toAnotherPage(evt) {
    evt.preventDefault();

    this.navigate(evt.target.dataset.href);
  }

  render() {
    const { backLink } = this.externalComponents;
    const backLinkWrapId = uuid();

    this.mountPoint.innerHTML = `
      <nav class="${css.container}">
        <div id="${backLinkWrapId}"></div>
        <ul class="${css.ul}">
          <li class="${css.li}">
            <a id="${this.routesIds[Routes.ABOUT]}" data-href="${Routes.ABOUT}">О нас</a>
          </li>
          <li class="${css.li}">
            <a id="${this.routesIds[Routes.ITEMS]}" data-href="${Routes.ITEMS}">Товары</a>
          </li>
        </ul>
      </nav>
    `;

    const backLinkWrap = document.getElementById(backLinkWrapId);
    backLinkWrap.appendChild(backLink.getElement());

    Object.values(this.routesIds).forEach((id) => {
      document.getElementById(id).addEventListener('click', this.toAnotherPage);
    });
  }
}

export default Menu;
