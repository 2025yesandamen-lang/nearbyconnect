Write-Host "STARTING AUTO FIX..."

# Clean project
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Install dependencies
npm install

# Install missing packages
npm install redis socket.io socket.io-client stripe @prisma/client prisma

# Generate Prisma
npx prisma generate

# Recreate socket client if missing
if (!(Test-Path "lib/socketClient.ts")) {
  New-Item -Path "lib/socketClient.ts" -ItemType File -Force
  Set-Content "lib/socketClient.ts" "import { io } from 'socket.io-client'; export const socket = io('http://localhost:3000');"
}

# Recreate room helper
if (!(Test-Path "lib/room.ts")) {
  New-Item -Path "lib/room.ts" -ItemType File -Force
  Set-Content "lib/room.ts" "export function getRoomId(a: string, b: string) { return [a, b].sort().join('-'); }"
}

# Build project
npm run build

Write-Host "AUTO FIX COMPLETE"


Write-Host "Fixing dependencies..."

# Install core deps
npm install next react react-dom

# Install TypeScript + types (THIS FIXES YOUR CURRENT ERROR)
npm install -D typescript @types/react @types/react-dom @types/node

Write-Host "Cleaning project..."

# Clean build cache
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Reinstall clean
npm install

Write-Host "Fixing Prisma..."

npx prisma generate

Write-Host "Fixing import paths..."

Get-ChildItem -Recurse -Include *.ts,*.tsx | ForEach-Object {
    (Get-Content $_.FullName) `
    -replace '@/app/lib/prisma', '@/lib/prisma' `
    | Set-Content $_.FullName
}

Write-Host "Building project..."

npm run build

Write-Host "Committing..."

git add .
git commit -m "auto fix: stable production build"
git push

Write-Host "DONE ✅"