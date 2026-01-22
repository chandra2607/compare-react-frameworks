# Performance Test Services Launcher
# Interactive script to start framework services and mock server

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Performance Test Services Launcher" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Ask for mode
Write-Host "Select mode:" -ForegroundColor Yellow
Write-Host "1. dev      - Development mode with hot reload"
Write-Host "2. build    - Build all services"
Write-Host "3. start    - Production mode (requires build first)"
Write-Host ""
$modeInput = Read-Host "Enter mode (dev/build/start) [default: dev]"
if ([string]::IsNullOrWhiteSpace($modeInput)) {
    $mode = "dev"
} else {
    $mode = $modeInput.ToLower()
}

if ($mode -notin @("dev", "build", "start")) {
    Write-Host "Invalid mode. Using 'dev' as default." -ForegroundColor Red
    $mode = "dev"
}

Write-Host "Selected mode: $mode" -ForegroundColor Green
Write-Host ""

# Ask for services
Write-Host "Select services to start:" -ForegroundColor Yellow
Write-Host "1. all      - All services (Next.js, Astro, Remix)"
Write-Host "2. nextjs   - Next.js only"
Write-Host "3. astro    - Astro only"
Write-Host "4. remix    - Remix/React Router only"
Write-Host ""
$servicesInput = Read-Host "Enter services (all/nextjs/astro/remix) [default: all]"
if ([string]::IsNullOrWhiteSpace($servicesInput)) {
    $services = "all"
} else {
    $services = $servicesInput.ToLower()
}

$runNextjs = $false
$runAstro = $false
$runRemix = $false

switch ($services) {
    "all" {
        $runNextjs = $true
        $runAstro = $true
        $runRemix = $true
        Write-Host "Selected: All services" -ForegroundColor Green
    }
    "nextjs" {
        $runNextjs = $true
        Write-Host "Selected: Next.js only" -ForegroundColor Green
    }
    "astro" {
        $runAstro = $true
        Write-Host "Selected: Astro only" -ForegroundColor Green
    }
    "remix" {
        $runRemix = $true
        Write-Host "Selected: Remix only" -ForegroundColor Green
    }
    default {
        Write-Host "Invalid service selection. Starting all services." -ForegroundColor Red
        $runNextjs = $true
        $runAstro = $true
        $runRemix = $true
    }
}
Write-Host ""

# Ask for mock server
Write-Host "Start mock server on port 3001?" -ForegroundColor Yellow
$mockInput = Read-Host "Start mock server? (y/n) [default: y]"
if ([string]::IsNullOrWhiteSpace($mockInput) -or $mockInput.ToLower() -eq "y" -or $mockInput.ToLower() -eq "yes") {
    $startMock = $true
    Write-Host "Mock server will be started" -ForegroundColor Green
} else {
    $startMock = $false
    Write-Host "Mock server will not be started" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Starting Services..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$rootPath = $PSScriptRoot

# Function to check and install dependencies
function Check-Dependencies {
    param(
        [string]$ServiceName,
        [string]$Path
    )
    
    $fullPath = Join-Path $rootPath $Path
    $nodeModulesPath = Join-Path $fullPath "node_modules"
    
    if (-not (Test-Path $nodeModulesPath)) {
        Write-Host "[$ServiceName] Installing dependencies..." -ForegroundColor Yellow
        Push-Location $fullPath
        npm install
        Pop-Location
        Write-Host "[$ServiceName] Dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "[$ServiceName] Dependencies already installed" -ForegroundColor Gray
    }
}

# Check dependencies for mock server
if ($startMock) {
    Write-Host "" 
    Write-Host "Checking dependencies..." -ForegroundColor Cyan
    Check-Dependencies -ServiceName "Mock Server" -Path "fastify-mock-server"
}

# Check dependencies for selected services
if ($runNextjs) {
    Check-Dependencies -ServiceName "Next.js" -Path "next-perf"
}

if ($runAstro) {
    Check-Dependencies -ServiceName "Astro" -Path "astro-perf"
}

if ($runRemix) {
    Check-Dependencies -ServiceName "Remix" -Path "react-router-remix-perf"
}

Write-Host ""

# Start mock server
if ($startMock) {
    Write-Host "[Mock Server] Starting on port 3001..." -ForegroundColor Magenta
    $mockPath = Join-Path $rootPath "fastify-mock-server"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$mockPath'; npm start" -WindowStyle Normal
    Start-Sleep -Seconds 2
}

# Function to run commands based on mode
function Start-Service {
    param(
        [string]$ServiceName,
        [string]$Path,
        [string]$Mode,
        [string]$Color
    )
    
    $fullPath = Join-Path $rootPath $Path
    
    switch ($Mode) {
        "dev" {
            Write-Host "[$ServiceName] Starting in dev mode..." -ForegroundColor $Color
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$fullPath'; npm run dev" -WindowStyle Normal
        }
        "build" {
            Write-Host "[$ServiceName] Building..." -ForegroundColor $Color
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$fullPath'; npm run build" -WindowStyle Normal
        }
        "start" {
            Write-Host "[$ServiceName] Starting in production mode..." -ForegroundColor $Color
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$fullPath'; npm start" -WindowStyle Normal
        }
    }
    
    Start-Sleep -Milliseconds 500
}

# Start services
if ($runNextjs) {
    Start-Service -ServiceName "Next.js" -Path "next-perf" -Mode $mode -Color "Blue"
}

if ($runAstro) {
    Start-Service -ServiceName "Astro" -Path "astro-perf" -Mode $mode -Color "DarkMagenta"
}

if ($runRemix) {
    Start-Service -ServiceName "Remix" -Path "react-router-remix-perf" -Mode $mode -Color "Cyan"
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "Services Started!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""

if ($mode -eq "dev") {
    Write-Host "Running in DEVELOPMENT mode:" -ForegroundColor Yellow
    if ($startMock) { Write-Host "  - Mock Server:  http://localhost:3001" -ForegroundColor White }
    if ($runNextjs) { Write-Host "  - Next.js:      http://localhost:3000" -ForegroundColor White }
    if ($runAstro) { Write-Host "  - Astro:        http://localhost:4321" -ForegroundColor White }
    if ($runRemix) { Write-Host "  - Remix:        http://localhost:9921" -ForegroundColor White }
} elseif ($mode -eq "start") {
    Write-Host "Running in PRODUCTION mode:" -ForegroundColor Yellow
    if ($startMock) { Write-Host "  - Mock Server:  http://localhost:3001" -ForegroundColor White }
    if ($runNextjs) { Write-Host "  - Next.js:      http://localhost:3000" -ForegroundColor White }
    if ($runAstro) { Write-Host "  - Astro:        http://localhost:4321" -ForegroundColor White }
    if ($runRemix) { Write-Host "  - Remix:        http://localhost:9921" -ForegroundColor White }
} else {
    Write-Host "Build completed. Use mode 'start' to run in production." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
