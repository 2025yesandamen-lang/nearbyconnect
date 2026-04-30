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