export const isObjectTheSame = (obj1: object = {}, obj2: object | null = {}) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);
