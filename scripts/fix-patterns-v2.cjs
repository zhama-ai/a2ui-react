#!/usr/bin/env node
/**
 * 批量修复 patterns 文件 - v2
 * 
 * 策略：分析每个文件，找到变量定义和使用模式
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

// 分析文件，找到所有定义的 xxxIds 数组变量
function findDefinedArrays(content) {
  const arrays = new Set();
  // 匹配: const xxxIds: string[] = [];
  // 或: const xxxIds = [...];
  const patterns = [
    /const\s+(\w+Ids)\s*:\s*string\[\]\s*=/g,
    /const\s+(\w+Ids)\s*=\s*\[/g,
    /const\s+(\w+ChildIds)\s*:\s*string\[\]\s*=/g,
    /const\s+(\w+ChildIds)\s*=\s*\[/g,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      arrays.add(match[1]);
    }
  }
  
  return arrays;
}

// 修复单个文件
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  const definedArrays = findDefinedArrays(content);
  
  // 查找错误的变量引用并修复
  // 模式: createContainer(xxx, yyyChildIds, ...) 其中 yyyChildIds 未在 definedArrays 中
  
  const createContainerPattern = /createContainer\(([^,]+),\s*(\w+),/g;
  
  content = content.replace(createContainerPattern, (match, firstArg, secondArg) => {
    // 如果 secondArg 已经在定义的数组中，保持不变
    if (definedArrays.has(secondArg)) {
      return match;
    }
    
    // 如果是类似 rootChildIds 这样的名字，需要找到正确的数组
    // 基于 firstArg 推断正确的数组名
    const idName = firstArg.trim();
    
    // 常见推断规则
    const inferences = {
      'id': ['containerChildIds', 'buttonIds', 'itemIds', 'childIds'],
      'gridId': ['itemIds', 'gridItemIds'],
      'listId': ['itemIds', 'listItemIds'],
      'itemId': ['itemChildIds'],
      'itemsContainerId': ['itemIds'],
      'tagsRowId': ['tagIds'],
      'headerRowId': ['headerCellIds', 'headerIds'],
      'rowId': ['cellIds'],
      'tableId': ['rowIds'],
      'weekId': ['dayIds'],
      'weeksRowId': ['weekIds'],
      'weekdaysId': ['weekdayIds'],
      'dotSectionId': ['dotChildIds', 'dotIds'],
      'lineNumsId': ['lineNumberIds'],
      'actionsRowId': ['actionIds', 'buttonIds'],
      'galleryId': ['imageIds'],
    };
    
    // 尝试从推断规则中找到正确的数组
    const candidates = inferences[idName] || [];
    for (const candidate of candidates) {
      if (definedArrays.has(candidate)) {
        return `createContainer(${firstArg}, ${candidate},`;
      }
    }
    
    // 如果找不到，尝试更通用的匹配
    // 从 secondArg 移除 'Child' 看看是否有匹配
    const simplified = secondArg.replace('Child', '');
    if (definedArrays.has(simplified)) {
      return `createContainer(${firstArg}, ${simplified},`;
    }
    
    // 如果还是找不到，保持原样并打印警告
    console.warn(`  Warning: Cannot infer correct array for createContainer(${idName}, ${secondArg}, ...)`);
    console.warn(`    Defined arrays: ${Array.from(definedArrays).join(', ')}`);
    return match;
  });

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

