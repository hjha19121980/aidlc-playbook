<#
.SYNOPSIS
  Installs the AIDLC skills, agents, templates and docs into a project folder (Windows).

.PARAMETER Target
  Folder to install into. Created if missing. Defaults to the current folder.
.PARAMETER Tool
  all (default), agent (terminal AI agent) or copilot (GitHub Copilot).
.PARAMETER BaseUrl
  URL of the downloads folder of the deployed AIDLC Playbook, e.g. https://host/downloads
.PARAMETER ZipPath
  Install from a zip you already downloaded instead of using -BaseUrl.

.EXAMPLE
  .\install.ps1 -Target 'C:\work\my-project' -Tool all -BaseUrl 'https://host/downloads'
.EXAMPLE
  .\install.ps1 -Target 'C:\work\my-project' -ZipPath .\aidlc-skills-all.zip
#>
[CmdletBinding()]
param(
  [string]$Target = (Get-Location).Path,
  [ValidateSet('all', 'agent', 'copilot')][string]$Tool = 'all',
  [string]$BaseUrl,
  [string]$ZipPath
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch { }

if (-not $BaseUrl -and -not $ZipPath) { throw 'Provide -BaseUrl <url of the downloads folder> or -ZipPath <local zip>.' }

$begin = '<!-- aidlc:begin -->'
$end = '<!-- aidlc:end -->'

function Merge-Block([string]$File, [string]$Block) {
  $b = $Block.Trim()
  if (Test-Path -LiteralPath $File) {
    $cur = [IO.File]::ReadAllText($File)
    $i = $cur.IndexOf($begin)
    $j = $cur.IndexOf($end)
    if ($i -ge 0 -and $j -gt $i) { $new = $cur.Substring(0, $i) + $b + $cur.Substring($j + $end.Length) }
    else { $new = $cur.TrimEnd() + "`r`n`r`n" + $b + "`r`n" }
  } else { $new = $b + "`r`n" }
  [IO.File]::WriteAllText($File, $new, (New-Object Text.UTF8Encoding($false)))
}

# Resolve the target folder (supports ~ and %VARS%).
$Target = [Environment]::ExpandEnvironmentVariables($Target)
if ($Target -eq '~' -or $Target.StartsWith('~/') -or $Target.StartsWith('~\')) {
  $Target = Join-Path $HOME $Target.Substring(1).TrimStart('\', '/')
}
New-Item -ItemType Directory -Force -Path $Target | Out-Null
$Target = (Resolve-Path -LiteralPath $Target).Path

$tmp = Join-Path ([IO.Path]::GetTempPath()) ('aidlc-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
  $name = "aidlc-skills-$Tool.zip"
  if ($ZipPath) {
    $zip = (Resolve-Path -LiteralPath $ZipPath).Path
  } else {
    $base = $BaseUrl.TrimEnd('/')
    $zip = Join-Path $tmp $name
    Write-Host "Downloading $base/$name"
    Invoke-WebRequest -UseBasicParsing -Uri "$base/$name" -OutFile $zip

    $manifest = $null
    try {
      $resp = Invoke-WebRequest -UseBasicParsing -Uri "$base/manifest.json"
      # Some hosts send no Content-Type, which makes Windows PowerShell return raw bytes.
      $text = if ($resp.Content -is [byte[]]) { [Text.Encoding]::UTF8.GetString($resp.Content) } else { [string]$resp.Content }
      $manifest = $text | ConvertFrom-Json
    } catch { }
    $entry = $null
    if ($manifest) { $entry = $manifest.files.PSObject.Properties[$name] }
    if ($entry) {
      $actual = (Get-FileHash -Algorithm SHA256 -LiteralPath $zip).Hash.ToLower()
      if ($actual -ne $entry.Value.sha256) { throw "Checksum mismatch for $name. Expected $($entry.Value.sha256) but got $actual. Nothing was installed." }
      Write-Host 'Checksum verified (SHA-256).'
    } else {
      Write-Warning 'Could not verify the checksum (manifest.json unavailable). Continuing.'
    }
  }

  $stage = Join-Path $tmp 'stage'
  Expand-Archive -LiteralPath $zip -DestinationPath $stage -Force

  # Files listed here belong to the project once installed: create them only if they do not exist.
  $seed = @()
  $seedFile = Join-Path $stage '.aidlc-seed.txt'
  if (Test-Path -LiteralPath $seedFile) { $seed = @(Get-Content -LiteralPath $seedFile | Where-Object { $_ -and $_.Trim() }) }

  $installed = 0
  $skipped = @()
  foreach ($f in Get-ChildItem -LiteralPath $stage -Recurse -File -Force) {
    $rel = ($f.FullName.Substring($stage.Length).TrimStart('\', '/')) -replace '\\', '/'
    if ($rel -eq '.aidlc-seed.txt') { continue }
    $dest = Join-Path $Target ($rel -replace '/', [IO.Path]::DirectorySeparatorChar)
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $dest) | Out-Null

    if ($rel -eq '.github/copilot-instructions.aidlc.md') {
      Merge-Block (Join-Path $Target '.github\copilot-instructions.md') ([IO.File]::ReadAllText($f.FullName))
      $installed++
      continue
    }
    if (($seed -contains $rel) -and (Test-Path -LiteralPath $dest)) { $skipped += $rel; continue }

    Copy-Item -LiteralPath $f.FullName -Destination $dest -Force
    $installed++
  }

  Write-Host ''
  Write-Host "Installed $installed files into $Target" -ForegroundColor Green
  foreach ($s in $skipped) { Write-Host "Kept your existing $s" }
  Write-Host ''
  Write-Host 'Next steps:'
  Write-Host "  1. Open $Target in your AI coding assistant (terminal agent or VS Code with Copilot Chat)."
  Write-Host '  2. Run /aidlc-workflow'
  Write-Host '  3. Read docs\aidlc\README.md'
}
finally {
  Remove-Item -LiteralPath $tmp -Recurse -Force -ErrorAction SilentlyContinue
}
