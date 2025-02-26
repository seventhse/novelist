# 默认任务：选择执行一个命令
default:
    @just --choose

start: 
    just start-backend    
    just start-frontend

start-desktop:
    pnpm -F @novelist/desktop start

start-frontend:
    just dev ./apps/frontend  

start-backend: 
    pnpm -F @novelist/backend start:dev

build-prod:
    just build-backend
    just build-frontend

build-backend:
    just build @novelist/backend  

build-frontend:
    just build @novelist/frontend

clean: 
    ./scripts/clean.sh

deploy: 
    just build-prod


choose-package:
    @packages=$(find ./packages -maxdepth 1 -type d -exec basename {} \;)
    @package=$(echo "$packages" | fzf) && echo "You selected package: $package"

# 执行指定 package 的命令，支持传递 flags
command package *FLAGS:
    @echo "Running command on package {{package}} with flags: {{FLAGS}}"
    cd {{package}} && pnpm {{FLAGS}}
    @echo "Command executed on package {{package}}."


# 生成导出文件任务
# 生成指定 package 下的 exports 文件
gen-exports package:
    @echo "Generating export files for package: {{package}}"
    ./scripts/auto-exports.sh {{package}}/src 
    @echo "Export generation for {{package}} complete."

# 通用的生成任务
# 通过 gen-<command> 执行不同的生成操作
gen command *FLAGS:
    @echo "Generating command: {{command}} with flags: {{FLAGS}}"
    just gen-{{command}} {{FLAGS}}

# 安装依赖和生成 UI 导出的任务
stub:
    @echo "Running stub tasks..."
    pnpm -r run stub --if-present
    just ui exports
    @echo "Stub tasks completed."

# 安装依赖
install:
    @echo "Installing dependencies..."
    pnpm i
    just stub
    @echo "Dependencies installed and stub tasks completed."

# 运行 lint 检查
lint:
    @echo "Running lint checks..."
    pnpm lint
    @echo "Lint checks completed."

# 格式化代码
format:
    @echo "Formatting code..."
    pnpm format
    @echo "Code formatting completed."

# 格式化代码并修复
format-fix:
    pnpm format:fix

# 启动开发模式，针对指定 package
dev package:
    @echo "Starting development for package {{package}}..."
    pnpm -F {{package}} dev
    @echo "Development mode started for package {{package}}."

# 编译指定 package
build package:
    @echo "Building package {{package}}..."
    pnpm -F {{package}} build
    @echo "Package {{package}} build completed."

# 执行指定 package 的命令
run package command:
    @echo "Running command {{command}} for package {{package}}..."
    pnpm -F {{package}} {{command}}
    @echo "Command {{command}} executed for package {{package}}."

# 为指定 package 执行 add 操作，并传递 flags
add package *FLAGS:
    @echo "Adding package {{package}} with flags: {{FLAGS}}..."
    just command {{package}} add {{FLAGS}}
    @echo "Package {{package}} added with flags: {{FLAGS}}."

# UI 相关任务
# 统一管理 UI 组件和 UI 导出操作
ui command:
    @echo "Running UI command: {{command}}..."
    just ui-{{command}}
    @echo "UI command {{command}} completed."

# 生成 UI 导出文件
ui-exports:
    @echo "Generating UI export files..."
    just gen-exports ./packages/ui
    @echo "UI export files generated."

# UI 组件操作
ui-com com:
    @echo "Adding UI component {{com}}..."
    just command packages/ui dlx shadcn@latest add {{com}}
    just ui-exports
    @echo "UI component {{com}} added."

# utils 相关任务
utils command:
    @echo "Running utils command: {{command}}..."
    just utils-{{command}}
    @echo "Utils command {{command}} completed."

# 生成 utils 导出文件
utils-exports:
    @echo "Generating utils export files..."
    just gen-exports ./packages/utils
    @echo "Utils export files generated."