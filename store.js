export class Store {
  static get name() {
    return localStorage.getItem("name");
  }
  static setName(name) {
    localStorage.setItem("name", name);
  }
}
