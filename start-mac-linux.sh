#!/bin/sh
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js не найден. Установите его с https://nodejs.org и запустите скрипт снова."
  exit 1
fi
[ -d node_modules ] || { echo "Устанавливаю зависимости..."; npm install; }
npm run dev
