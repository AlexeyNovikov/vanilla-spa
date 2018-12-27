import BackLink from '../../components/link';
import uuid from '../../../utils/uuid';

import css from './index.css';

class About {
  constructor(opts) {
    this.mountPoint = opts.mountPoint;
    this.backward = opts.backward;
    this.externalComponents = {
      backLink: new BackLink(this.backward),
    };
  }

  beforeUnmount() {
    Object.keys(this.externalComponents).forEach((key) => {
      this.externalComponents[key].beforeUnmount();
    });
  }

  render() {
    const { backLink } = this.externalComponents;
    const backLinkWrapId = uuid();

    this.mountPoint.innerHTML = `
      <div class="${css.container}">
        <div id="${backLinkWrapId}"></div>
        <div class="${css.page}">
          <h1>О нас</h1>
          <p class="${css.content}">Мы классные.</p>
        </div>
      </div>
    `;

    const backLinkWrap = document.getElementById(backLinkWrapId);
    backLinkWrap.appendChild(backLink.getElement());
  }
}

export default About;
