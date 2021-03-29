export const changeKey = (obj, oldKey, newKey) => {
  if (oldKey !== newKey) {
    Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey));
    delete obj['old_key'];
  }
};
