import css from './index.css';

function Loader() {
  return `
    <div class="${css.loader}">
      <svg class="${css.circular}" viewBox="25 25 50 50">
        <circle class="${css.path}" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
      </svg>
    </div>
  `;
}

export default Loader;
