import { omit } from 'lodash';

export const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0;

export const removeLastProperty = (obj: object) => {
  const keys = Object.keys(obj);

  if (keys.length) {
    const lastKey = keys[keys.length - 1];
    obj = omit(obj, lastKey);
  }

  return obj;
};