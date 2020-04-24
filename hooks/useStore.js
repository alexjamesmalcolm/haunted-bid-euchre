import { useState, useEffect, useCallback } from "../dependencies/index.js";

const nameKey = "name";
const hasLoggedInKey = "hasLoggedIn";

class Store {
  static getName() {
    const name = sessionStorage.getItem(nameKey);
    return name ? name : "";
  }
  static setName(name) {
    sessionStorage.setItem(nameKey, name);
  }
  static getHasLoggedIn() {
    const hasLoggedIn = sessionStorage.getItem(hasLoggedInKey);
    return hasLoggedIn ? JSON.parse(hasLoggedIn) : false;
  }
  static setHasLoggedIn(hasLoggedIn) {
    sessionStorage.setItem(hasLoggedInKey, hasLoggedIn);
    debugger;
  }
}

export const useStore = () => {
  const [name, setNameInternal] = useState("");
  const [hasLoggedIn, setHasLoggedInInternal] = useState(false);
  useEffect(() => {
    setHasLoggedInInternal(Store.getHasLoggedIn());
    setNameInternal(Store.getName());
  }, []);
  const setHasLoggedIn = useCallback(
    (hasLoggedIn) => {
      setHasLoggedInInternal(hasLoggedIn);
      Store.setHasLoggedIn(hasLoggedIn);
    },
    [setHasLoggedInInternal]
  );
  const setName = useCallback(
    (name) => {
      setNameInternal(name);
      Store.setName(name);
    },
    [setNameInternal]
  );
  return { setHasLoggedIn, setName, hasLoggedIn, name };
};
