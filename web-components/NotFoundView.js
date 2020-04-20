import { html, component, Router } from "../dependencies.js";

const NotFoundView = () => {
  return html`<style>
      .container {
        display: grid;
        align-items: center;
        justify-content: center;
      }
      .container * {
        text-align: center;
      }
    </style>
    <div class="container">
      <h2>404</h2>
      <h3>Page Not Found</h3>
      <a href="/">Return Home</a>
    </div>`;
};

customElements.define("not-found-view", component(NotFoundView));
