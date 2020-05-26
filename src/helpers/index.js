export const dispatchEvent = (event, payload) => {
  eventBus.$emit(event, payload);
}

export const addListener = (event, handler) => {
  eventBus.$on(event, handler);
}

export const removeListener = (event, handler) => {
  eventBus.$off(event, handler);
}

export const getData = name => {
  return JSON.parse(localStorage.getItem(name));
}

export const setData = (name, payload)=> {
  localStorage.setItem(name, JSON.stringify(payload));
}