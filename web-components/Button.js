import { html, component } from "../dependencies/index.js";

const colorBackgroundMap = {
  primary: "#007bff",
  secondary: "#6c757d",
  success: "#28a745",
  danger: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
  light: "#f8f9fa",
  dark: "#343a40",
  white: "#fff",
};

const colorTextMap = {
  primary: "#fff",
  secondary: "#fff",
  success: "#fff",
  danger: "#fff",
  warning: "#343a40",
  info: "#fff",
  light: "#343a40",
  dark: "#fff",
  white: "#343a40",
};

const Button = ({ color = "primary", disabled = false, type = "button" }) =>
  html` <style>
      button {
        background-color: ${colorBackgroundMap[color]};
        color: ${colorTextMap[color]};
        border-radius: 5px;
        height: max-content;
        padding: 5px;
        border: none;
      }
      button:disabled {
        filter: grayscale(80%);
      }
    </style>
    <button ?disabled=${disabled} type=${type}>
      <slot></slot>
    </button>`;

customElements.define("be-button", component(Button));
