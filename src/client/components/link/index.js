import uuid from '../../../utils/uuid';

import css from './index.css';

class BackLink {
  constructor(backward) {
    this.id = uuid();
    this.backward = backward;
  }

  beforeUnmount() {
    document.getElementById(this.id).removeEventListener('click', this.backward);
  }

  getElement() {
    const button = document.createElement('button');

    button.setAttribute('id', this.id);
    button.innerText = '👈 Назад';
    button.className = css.button;
    button.addEventListener('click', this.backward);

    return button;
  }
}

export default BackLink;
