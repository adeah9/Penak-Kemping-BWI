param(
  [switch]$Init,
  [switch]$Build
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Assert-Command($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    throw "Command '$name' belum terpasang."
  }
}

Assert-Command "node"
Assert-Command "java"
Assert-Command "bubblewrap"

$manifestUrl = "https://penakkempingg.vercel.app/manifest.json"

if ($Init) {
  Write-Host "Menjalankan bubblewrap init..."
  bubblewrap init --manifest $manifestUrl
}

if ($Build) {
  Write-Host "Menjalankan bubblewrap build..."
  bubblewrap build
}

if (-not $Init -and -not $Build) {
  Write-Host "Contoh pemakaian:"
  Write-Host "  .\build-twa.ps1 -Init"
  Write-Host "  .\build-twa.ps1 -Build"
}
