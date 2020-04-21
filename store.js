export class Store {
  static get name() {
    const name = localStorage.getItem("name");
    return name ? name : "";
  }
  static setName(name) {
    localStorage.setItem("name", name);
  }
}
