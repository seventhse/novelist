#!/bin/bash

# 自动生成 index.ts 文件的脚本

# 检查输入参数
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <target_directory>"
    exit 1
fi

TARGET_DIR=$1
INDEX_FILE="$TARGET_DIR/index.ts"

# 检查目标目录是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: Directory '$TARGET_DIR' does not exist."
    exit 1
fi

# 清空 index.ts 文件（如果存在）
> "$INDEX_FILE"

# 初始化 index.ts 文件
echo "// Auto-generated exports" > "$INDEX_FILE"
echo "" >> "$INDEX_FILE"

# 递归查找 .ts 和 .tsx 文件
find "$TARGET_DIR" -type f \( -name "*.ts" -o -name "*.tsx" \) | while read -r file; do
    # 忽略 index.ts 自身
    if [ "$file" == "$INDEX_FILE" ]; then
        continue
    fi

    # 获取相对路径
    relative_path=$(echo "$file" | sed "s|$TARGET_DIR/||" | sed 's/\.[^.]*$//')

    # 写入 export 语句
    echo "export * from \"./$relative_path\";" >> "$INDEX_FILE"
done

echo "Index file generated at $INDEX_FILE"