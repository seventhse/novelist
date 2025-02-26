#!/bin/bash

# Function to delete node_modules directories
delete_node_modules() {
  echo "Deleting node_modules in $1"
  rm -rf "$1/node_modules"
  
  # Recurse through subdirectories
  for dir in "$1"/*; do
    if [ -d "$dir" ]; then
      delete_node_modules "$dir"
    fi
  done
}

# Clear node_modules in the current directory and subdirectories
echo "Cleaning node_modules directories..."
delete_node_modules .

echo "Rm lock file..."
rm -rf ./pnpm-lock.yaml

# Clear pnpm cache
echo "Clearing pnpm cache..."
pnpm store prune

echo "Clean-up complete!"