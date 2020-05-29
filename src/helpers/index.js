export const getData = name => {
  return JSON.parse(window.localStorage.getItem(name)) || [];
}

export const setData = (name, payload) => {
  window.localStorage.setItem(name, JSON.stringify(payload));
}

export const openModal = (ctx, compName, task, index) => {
  if (task) ctx.modalTask = task;
  if (index !== undefined) ctx.$store.commit('setModalActiveItemIndex', index);
  ctx.$store.commit('setModalActivatingComponent', compName);
  ctx.$store.commit('setShowModal', true);
}

export const resetModalVals = (ctx, index=false) => {
  if (index) ctx.$store.commit('setModalActiveItemIndex', null);
  ctx.$store.commit('setModalAction', null);
}
