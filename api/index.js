const endpoints = {
  status: `${location.protocol}//api.euchre.bid/status`,
};

export const checkIfApiIsUp = () =>
  fetch(endpoints.status, { method: "head" })
    .then((response) => response.status === 200)
    .catch(() => false);