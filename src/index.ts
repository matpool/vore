import { reactive } from 'vue';

class Model<MC> {
  model: MC;
  constructor(model: MC) {
    this.model = makeAutoReactive(model);
  }
}

type Models<MS> = {
  [K in keyof MS]: Model<MS[K]>;
};

export class Store<MS> {
  stores: Models<MS> = {} as any;

  constructor(models: MS) {
    type K = keyof MS;
    (Object.keys(models) as any).forEach((key: K) => {
      this.stores[key] = new Model<MS[K]>(models[key]);
    });
  }

  get<K extends keyof MS>(key: K & string): MS[K] {
    return this.stores[key].model;
  }
}

export function makeAutoReactive(obj: any) {
  const prototype = Object.getPrototypeOf(obj);
  const props = Object.getOwnPropertyNames(obj);

  const rawObj = props.reduce<Record<string, any>>((oo, key) => {
    oo[key] = obj[key];
    return oo;
  }, {});

  const reactiveObj = reactive(rawObj) as any;
  Object.setPrototypeOf(reactiveObj, prototype);

  return reactiveObj;
}
