import { reactive } from 'vue';

function getReactiveInstance<T extends { new (...args: any[]): any }>(cls: T) {
  const instance = new cls();
  const prototype = Object.getPrototypeOf(instance);
  const props = Object.keys(instance);

  // 将属性转换成reactive
  let target = Object.create(null);
  props.forEach((prop) => {
    target[prop] = instance[prop];
  });
  target = reactive(target);

  // 设置prototype, 继承方法
  Object.setPrototypeOf(target, prototype);

  return target;
}

export function createStore<T extends Record<string, any>>(stores: T) {
  const reactiveStores: Record<
    keyof T,
    InstanceType<T[keyof T]>
  > = Object.create(null);
  Object.keys(stores).forEach((k: keyof T) => {
    reactiveStores[k] = getReactiveInstance(stores[k]);
  });

  function useStore(): Record<keyof T, InstanceType<T[keyof T]>>;
  function useStore(name: keyof T): InstanceType<T[typeof name]>;
  function useStore(name?: keyof T) {
    return name ? reactiveStores[name] : reactiveStores;
  }

  return {
    useStore,
  };
}
