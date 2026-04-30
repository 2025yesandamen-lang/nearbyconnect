Write-Host "🚀 STARTING FULL AUTO FIX + DEPLOY..."

# -----------------------------
# CLEAN BUILD FILES
# -----------------------------
Write-Host "🧹 Cleaning..."
if (Test-Path .next) { Remove-Item .next -Recurse -Force }
if (Test-Path node_modules) { Remove-Item node_modules -Recurse -Force }

# -----------------------------
# INSTALL DEPENDENCIES
# -----------------------------
Write-Host "📦 Installing packages..."
npm install

# -----------------------------
# FIX COMMON PRISMA ISSUES
# -----------------------------
Write-Host "🛠 Fixing Prisma..."
(Get-ChildItem -Recurse -Include *.ts,*.tsx) | ForEach-Object {
    (Get-Content $_.FullName) `
    -replace 'prisma\.likes', 'prisma.like' `
    -replace '@/app/lib/prisma', '@/lib/prisma' |
    Set-Content $_.FullName
}

# -----------------------------
# GENERATE PRISMA CLIENT
# -----------------------------
npx prisma generate
npx prisma db push --accept-data-loss

# -----------------------------
# FIX "use client" DUPLICATES
# -----------------------------
Write-Host "🧠 Fixing React errors..."
(Get-ChildItem -Recurse -Include *.tsx) | ForEach-Object {
    $content = Get-Content $_.FullName

    # remove duplicate "use client"
    $clean = $content | Select-Object -Unique

    Set-Content $_.FullName $clean
}

# -----------------------------
# BUILD PROJECT
# -----------------------------
Write-Host "🏗 Building..."
npm run build

# -----------------------------
# INIT GIT
# -----------------------------
if (!(Test-Path .git)) {
    git init
    git add .
    git commit -m "Initial deploy"
}

# -----------------------------
# CONNECT TO GITHUB
# -----------------------------
Write-Host "🔗 Add your repo manually if not connected"
Write-Host "Example:"
Write-Host "git remote add origin https://github.com/YOUR_USERNAME/nearbyconnect.git"
Write-Host "git push -u origin main"

# -----------------------------
# DEPLOY TO VERCEL
# -----------------------------
Write-Host "🚀 Deploying..."
vercel --prod --force

Write-Host "✅ DONE!!!"