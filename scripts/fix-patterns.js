#!/usr/bin/env node
/**
 * 批量修复 patterns 文件
 * 
 * 修复内容：
 * 1. 移除 createChildList 导入
 * 2. 删除 createChildList 调用
 * 3. 将 createContainer(id, childListId, styles) 改为 createContainer(id, childIds, styles)
 */

const fs = require('fs');
const path = require('path');

const patternsDir = path.join(__dirname, '../src/patterns');

// 递归获取所有 .ts 文件
function getAllFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (item.endsWith('.ts') && !['components.ts', 'types.ts'].includes(item)) {
      files.push(fullPath);
    }
  }
  return files;
}

// 修复单个文件
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // 1. 移除 createChildList 从导入语句
  // 匹配: import { createChildList, ... } from '../components';
  content = content.replace(
    /import\s*\{([^}]*)\}\s*from\s*['"]\.\.\/components['"];?/g,
    (match, imports) => {
      const importList = imports.split(',').map(s => s.trim()).filter(s => s && s !== 'createChildList');
      if (importList.length === 0) {
        return ''; // 如果没有其他导入，删除整行
      }
      return `import { ${importList.join(', ')} } from '../components';`;
    }
  );

  // 2. 删除 createChildList 调用行
  // 匹配: components.push(createChildList(...));
  // 或: const xxxChildListId = `${id}-children`;
  content = content.replace(/^\s*const\s+\w+ChildListId\s*=\s*`[^`]+`;\s*\n/gm, '');
  content = content.replace(/^\s*components\.push\(createChildList\([^)]+\)\);\s*\n/gm, '');

  // 3. 修复 createContainer 调用
  // 将 createContainer(id, childListId, styles) 改为 createContainer(id, childIds, styles)
  // 这需要更复杂的处理，因为需要将 childListId 替换为对应的 childIds 数组

  // 通用模式: 找到所有 xxxChildListId 变量和对应的 xxxChildIds 数组
  // 然后将 createContainer 调用中的 childListId 替换为 childIds

  // 匹配所有 createContainer 调用并修复
  // 模式1: createContainer(itemId, childListId, style) -> createContainer(itemId, itemChildIds, style)
  content = content.replace(
    /createContainer\((\w+),\s*(\w+)ChildListId,/g,
    'createContainer($1, $2ChildIds,'
  );

  // 模式2: createContainer(id, `${id}-children`, style) 需要找到对应的数组
  // 这个比较复杂，需要逐case处理

  // 模式3: 处理 undefined 参数 createContainer(..., undefined, ...)
  // 改为空数组
  content = content.replace(
    /createContainer\(([^,]+),\s*undefined,/g,
    'createContainer($1, [],'
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${path.relative(patternsDir, filePath)}`);
    return true;
  }
  return false;
}

// 主函数
function main() {
  const files = getAllFiles(patternsDir);
  console.log(`Found ${files.length} files to process`);
  
  let fixedCount = 0;
  for (const file of files) {
    if (fixFile(file)) {
      fixedCount++;
    }
  }
  
  console.log(`\nFixed ${fixedCount} files`);
}

main();

