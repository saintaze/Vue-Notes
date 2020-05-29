export const getData = name => {
  return JSON.parse(window.localStorage.getItem(name)) || [];
}

export const setData = (name, payload) => {
  window.localStorage.setItem(name, JSON.stringify(payload));
}

export const openModal = (ctx, componentName, task, index) => {
  if (task) ctx.modalTask = task;
  if (index !== undefined) ctx.$store.commit('setModalActiveItemIndex', index);
  ctx.$store.commit('setModalActivatingComponent', componentName);
  ctx.$store.commit('setShowModal', true);
}

export const closeModal = (ctx) => {
  ctx.$store.commit('setShowModal', false);
  ctx.$store.commit('setModalActiveItemIndex', null);
  ctx.$store.commit('setModalAction', null);
}
