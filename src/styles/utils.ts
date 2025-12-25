/**
 * A2UI Style Utilities
 */

/**
 * 合并多个 class 映射，后面的会覆盖前面的相同前缀的类
 */
export function merge(...classes: Array<Record<string, boolean>>): Record<string, boolean> {
  const styles: Record<string, boolean> = {};
  for (const clazz of classes) {
    // 跳过 null 或 undefined
    if (!clazz) continue;

    for (const [key, val] of Object.entries(clazz)) {
      const prefix = key.split('-').slice(0, -1).join('-') + '-';
      const existingKeys = Object.keys(styles).filter((k) => k.startsWith(prefix));

      for (const existingKey of existingKeys) {
        delete styles[existingKey];
      }

      styles[key] = val;
    }
  }

  return styles;
}

/**
 * 将类追加到目标对象的所有属性
 */
export function appendToAll(
  target: Record<string, string[]>,
  exclusions: string[],
  ...classes: Array<Record<string, boolean>>
): Record<string, string[]> {
  const updatedTarget: Record<string, string[]> = structuredClone(target);

  for (const clazz of classes) {
    for (const key of Object.keys(clazz)) {
      const prefix = key.split('-').slice(0, -1).join('-') + '-';

      for (const [tagName, classesToAdd] of Object.entries(updatedTarget)) {
        if (exclusions.includes(tagName)) {
          continue;
        }

        let found = false;
        for (let t = 0; t < classesToAdd.length; t++) {
          const cls = classesToAdd[t];
          if (cls?.startsWith(prefix)) {
            found = true;
            classesToAdd[t] = key;
          }
        }

        if (!found) {
          classesToAdd.push(key);
        }
      }
    }
  }

  return updatedTarget;
}

/**
 * 将类名映射转换为 className 字符串
 */
export function classesToString(classes: Record<string, boolean>): string {
  return Object.entries(classes)
    .filter(([, enabled]) => enabled)
    .map(([className]) => className)
    .join(' ');
}

/**
 * 将样式对象转换为 React CSSProperties
 */
export function stylesToCSS(styles: Record<string, string>): React.CSSProperties {
  const cssProperties: Record<string, string> = {};
  for (const [key, value] of Object.entries(styles)) {
    // 将 kebab-case 转换为 camelCase
    const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    cssProperties[camelKey] = value;
  }
  return cssProperties as React.CSSProperties;
}
