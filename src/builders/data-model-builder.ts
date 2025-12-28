/**
 * A2UI Data Model Builder
 *
 * 提供 DataModel 相关的构建工具函数
 * 符合 A2UI 协议的 ValueMap 格式
 */

import type { A2UIValueMap, UpdateDataItem, PathMappings } from './types';

/**
 * 默认路径映射
 * 用于将常见字段名映射到 DataModel 中的字段名
 */
export const DEFAULT_PATH_MAPPINGS: PathMappings = {
  stats: 'progress',
};

/**
 * 将 JavaScript 对象转换为 A2UI ValueMap 格式
 *
 * @param obj - JavaScript 对象
 * @param prefix - 路径前缀（用于嵌套对象的 key 生成）
 */
export function objectToValueMap(
  obj: Record<string, unknown>,
  prefix = ''
): A2UIValueMap[] {
  const entries: A2UIValueMap[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}/${key}` : `/${key}`;
    entries.push(valueToValueMap(fullKey, value));
  }

  return entries;
}

/**
 * 将单个值转换为 A2UI ValueMap 格式
 *
 * @param key - 数据路径/键
 * @param value - JavaScript 值
 */
export function valueToValueMap(key: string, value: unknown): A2UIValueMap {
  if (value === null || value === undefined) {
    return { key, valueString: '' };
  }

  if (typeof value === 'string') {
    return { key, valueString: value };
  }

  if (typeof value === 'number') {
    return { key, valueNumber: value };
  }

  if (typeof value === 'boolean') {
    return { key, valueBoolean: value };
  }

  if (Array.isArray(value)) {
    return {
      key,
      valueMap: value.map((item, index) => valueToValueMap(String(index), item)),
    };
  }

  if (typeof value === 'object') {
    const nestedMaps: A2UIValueMap[] = [];
    for (const [k, v] of Object.entries(value)) {
      nestedMaps.push(valueToValueMap(k, v));
    }
    return { key, valueMap: nestedMaps };
  }

  return { key, valueString: String(value) };
}

/**
 * 规范化路径格式
 * - 将 . 分隔符转换为 /
 * - 确保路径以 / 开头
 * - 可选路径映射（如 stats → progress）
 *
 * @param path - 原始路径
 * @param pathMappings - 可选路径映射表
 */
export function normalizePath(
  path: string,
  pathMappings: PathMappings = {}
): string {
  // 1. 将 . 分隔符转换为 /
  let normalizedPath = path.replace(/\./g, '/');

  // 2. 确保路径以 / 开头
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = `/${normalizedPath}`;
  }

  // 3. 应用路径映射
  for (const [from, to] of Object.entries(pathMappings)) {
    const fromPattern = new RegExp(`^/${from}(/|$)`);
    if (fromPattern.test(normalizedPath)) {
      normalizedPath = normalizedPath.replace(fromPattern, `/${to}$1`);
    }
  }

  return normalizedPath;
}

/**
 * 将更新数据项数组转换为 ValueMap
 *
 * @param updates - 更新数据项
 * @param basePath - 基础路径
 * @param pathMappings - 可选路径映射表
 */
export function updatesToValueMap(
  updates: UpdateDataItem[],
  basePath = '',
  pathMappings: PathMappings = DEFAULT_PATH_MAPPINGS
): A2UIValueMap[] {
  const entries: A2UIValueMap[] = [];

  for (const update of updates) {
    const rawPath = update.path.startsWith('/')
      ? update.path
      : `${basePath}/${update.path}`;
    const normalizedPath = normalizePath(rawPath, pathMappings);

    if (update.value !== null && typeof update.value === 'object' && !Array.isArray(update.value)) {
      const flattenedEntries = flattenObjectToValueMap(
        update.value as Record<string, unknown>,
        normalizedPath
      );
      entries.push(...flattenedEntries);
    } else {
      entries.push(valueToValueMap(normalizedPath, update.value));
    }
  }

  return entries;
}

/**
 * 将嵌套对象扁平化为 ValueMap 条目
 *
 * @param obj - 要扁平化的对象
 * @param basePath - 基础路径
 */
export function flattenObjectToValueMap(
  obj: Record<string, unknown>,
  basePath: string
): A2UIValueMap[] {
  const entries: A2UIValueMap[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullPath = `${basePath}/${key}`;

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const nestedEntries = flattenObjectToValueMap(
        value as Record<string, unknown>,
        fullPath
      );
      entries.push(...nestedEntries);
    } else {
      entries.push(valueToValueMap(fullPath, value));
    }
  }

  return entries;
}

/**
 * 将单个值转换为 ValueMap 条目（兼容性函数）
 * @deprecated 使用 valueToValueMap 代替
 */
export function valueToValueMapEntry(path: string, value: unknown): A2UIValueMap {
  return valueToValueMap(path, value);
}

/**
 * 将 JavaScript 值转换为 A2UI Value 格式（兼容性函数）
 * @deprecated 使用 valueToValueMap 代替
 */
export function jsValueToA2UIValue(value: unknown): A2UIValueMap {
  return valueToValueMap('', value);
}

