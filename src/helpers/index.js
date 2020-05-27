export const getData = name => {
  return JSON.parse(window.localStorage.getItem(name)) || [];
}

export const setData = (name, payload)=> {
  window.localStorage.setItem(name, JSON.stringify(payload));
}

