# Start Next.js dev server (use if "npm" is not recognized in your terminal)
$nodeDir = "C:\Program Files\nodejs"
if (-not (Test-Path "$nodeDir\npm.cmd")) {
    Write-Error "Node.js not found at $nodeDir. Install from https://nodejs.org or adjust this script."
    exit 1
}
$env:Path = "$nodeDir;$env:Path"
Set-Location $PSScriptRoot\..
& npm run dev
