#!/usr/bin/env node
/**
 * 批量修复 patterns 文件 - 第二轮
 * 
 * 修复策略：
 * 找到模式：
 *   const xxxChildListId = `${id}-children`;
 *   components.push(createChildList(xxxChildListId, actualChildIds));
 *   components.push(createContainer(id, xxxChildListId, styles));
 * 
 * 替换为：
 *   components.push(createContainer(id, actualChildIds, styles));
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

  // 构建替换映射: childListId -> actualChildIds
  // 通过分析 createChildList 调用来确定
  const childListMapping = new Map();
  
  // 匹配: components.push(createChildList(xxxChildListId, actualIds));
  // 但 createChildList 已经被删除了，所以我们需要从原始模式推断
  
  // 实际上，我们需要查找这样的模式：
  // 1. const xxxChildListId = `${...}-children`;  -> 被删除了
  // 2. createContainer(id, xxxChildListId, ...) 被改成了 createContainer(id, xxxChildIds, ...)
  
  // 我们需要回退错误的替换，然后用正确的变量
  
  // 策略：找到所有 createContainer 调用，检查第二个参数
  // 如果是 xxxChildIds 但变量未定义，需要找到正确的变量
  
  // 更好的策略：从 git 恢复原始文件然后重新处理
  // 但这里我们用一个更直接的方法：
  
  // 分析文件结构，找到每个函数中定义的 ChildIds 数组变量
  // 然后将 createContainer 调用中的参数替换为这些变量
  
  // 简化处理：
  // 错误模式: createContainer(xxx, yyyChildIds, ...) 其中 yyyChildIds 未定义
  // 需要找到对应的正确变量名
  
  // 让我们用一个更直接的正则：
  // 把 xxxChildIds 替换回 containerChildIds, itemChildIds 等正确的名称
  
  // 常见模式修复:
  const replacements = [
    // root container 通常使用 containerChildIds
    [/createContainer\(id,\s*rootChildIds,/g, 'createContainer(id, containerChildIds,'],
    [/createContainer\(\s*id\s*,\s*rootChildIds\s*,/g, 'createContainer(id, containerChildIds,'],
    // grid 通常使用 itemIds
    [/createContainer\(gridId,\s*gridChildIds,/g, 'createContainer(gridId, itemIds,'],
    // list 通常使用 itemIds
    [/createContainer\(listId,\s*listChildIds,/g, 'createContainer(listId, itemIds,'],
    // table 通常使用 rowIds
    [/createContainer\(tableId,\s*tableChildIds,/g, 'createContainer(tableId, rowIds,'],
    // weeks 通常使用 weekIds  
    [/createContainer\(weeksRowId,\s*weeksChildIds,/g, 'createContainer(weeksRowId, weekIds,'],
    // week 通常使用 dayIds
    [/createContainer\(weekId,\s*weekChildIds,/g, 'createContainer(weekId, dayIds,'],
    // weekdays 
    [/createContainer\(weekdaysId,\s*weekdaysChildIds,/g, 'createContainer(weekdaysId, weekdayIds,'],
    // items container
    [/createContainer\(itemsContainerId,\s*itemsChildIds,/g, 'createContainer(itemsContainerId, itemIds,'],
    // tags
    [/createContainer\(tagsRowId,\s*tagsChildIds,/g, 'createContainer(tagsRowId, tagIds,'],
    // header
    [/createContainer\(headerRowId,\s*headerChildIds,/g, 'createContainer(headerRowId, headerCellIds,'],
    // row
    [/createContainer\(rowId,\s*rowChildIds,/g, 'createContainer(rowId, cellIds,'],
    // dotSection
    [/createContainer\(dotSectionId,\s*dotSectionChildIds,/g, 'createContainer(dotSectionId, dotChildIds,'],
    // lineNumbers
    [/createContainer\(lineNumsId,\s*lineNumChildIds,/g, 'createContainer(lineNumsId, lineNumberIds,'],
    // actions
    [/createContainer\(actionsRowId,\s*actionsChildIds,/g, 'createContainer(actionsRowId, actionIds,'],
    // gallery
    [/createContainer\(galleryId,\s*galleryChildIds,/g, 'createContainer(galleryId, imageIds,'],
  ];
  
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }

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
