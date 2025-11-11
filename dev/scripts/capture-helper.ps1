# SEB Network Capture Helper
# This script helps teachers capture network traffic for SEB config generation
# Run as Administrator

param(
    [string]$ServiceName = "Unknown_Service",
    [switch]$Help
)

if ($Help) {
    Write-Host @"
SEB Network Capture Helper
===========================

Usage:
    .\capture-helper.ps1 -ServiceName "OneNote"

This script will:
1. Clear DNS cache
2. Remind you to clear browser cache
3. Guide you through Fiddler setup
4. Help analyze captured domains

Requirements:
- Fiddler Classic installed
- Run as Administrator
- Fresh browser session

"@
    exit
}

Write-Host "=== SEB Network Capture Helper ===" -ForegroundColor Cyan
Write-Host "Service: $ServiceName`n"

# Step 1: Clear DNS Cache
Write-Host "[Step 1] Clearing DNS cache..." -ForegroundColor Yellow
try {
    Clear-DnsClientCache
    Write-Host "✓ DNS cache cleared" -ForegroundColor Green
} catch {
    Write-Host "⚠ Could not clear DNS cache. Make sure you're running as Administrator." -ForegroundColor Red
}

# Step 2: Browser preparation
Write-Host "`n[Step 2] Browser Preparation" -ForegroundColor Yellow
Write-Host @"
Please complete these steps:

1. Close ALL browser windows completely
2. Clear browser cache:
   - Chrome/Edge: Ctrl+Shift+Del → Check all boxes → Clear data
   - Firefox: Ctrl+Shift+Del → Everything → Clear Now
3. Open NEW incognito/private window
4. DO NOT navigate anywhere yet

"@

Read-Host "Press Enter when browser is ready"

# Step 3: Fiddler instructions
Write-Host "`n[Step 3] Fiddler Setup" -ForegroundColor Yellow
Write-Host @"
If Fiddler is not running yet:

1. Launch Fiddler Classic
2. Tools → Options → HTTPS tab
3. Check 'Capture HTTPS CONNECTs'
4. Check 'Decrypt HTTPS traffic'
5. Install certificate if prompted
6. Click OK

Ready to capture? In Fiddler:
- Press F12 to START capture
- Keep Fiddler visible

"@

Read-Host "Press Enter when Fiddler is capturing"

# Step 4: Navigation instructions
Write-Host "`n[Step 4] Navigate and Authenticate" -ForegroundColor Yellow
Write-Host @"
Now in your browser:

1. Go to the service URL (e.g., onenote.com)
2. Enter STUDENT credentials (not teacher account!)
3. Complete MFA/2FA if required
4. Access the specific page/document you want
5. Wait for COMPLETE page load (10-15 seconds)
6. Try one or two basic actions (type something, etc.)

Take your time - we need to capture everything!

"@

Read-Host "Press Enter when you've completed navigation"

# Step 5: Stop and export
Write-Host "`n[Step 5] Export Capture" -ForegroundColor Yellow

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$filename = "${ServiceName}_${timestamp}.har"

Write-Host @"
In Fiddler:

1. Press F12 to STOP capture
2. File → Export Sessions → All Sessions
3. Format: HTTPArchive v1.2
4. Save as: $filename

"@

$savePath = Read-Host "Enter full path where you saved the HAR file (or press Enter to skip)"

if ($savePath -and (Test-Path $savePath)) {
    # Analyze the HAR file
    Write-Host "`n[Step 6] Analyzing Domains..." -ForegroundColor Yellow
    
    try {
        $harContent = Get-Content $savePath -Raw | ConvertFrom-Json
        $domains = @{}
        
        foreach ($entry in $harContent.log.entries) {
            try {
                $uri = [System.Uri]$entry.request.url
                $domain = $uri.Host
                if (-not $domains.ContainsKey($domain)) {
                    $domains[$domain] = 0
                }
                $domains[$domain]++
            } catch {
                # Skip invalid URLs
            }
        }
        
        Write-Host "`nDiscovered Domains ($($domains.Count) unique):`n" -ForegroundColor Green
        
        # Sort by frequency
        $sortedDomains = $domains.GetEnumerator() | Sort-Object -Property Value -Descending
        
        $outputFile = "${ServiceName}_domains.txt"
        $wildcardDomains = @()
        
        foreach ($item in $sortedDomains) {
            $domain = $item.Key
            $count = $item.Value
            Write-Host "  $domain ($count requests)"
            
            # Generate wildcard suggestion
            $parts = $domain -split '\.'
            if ($parts.Count -gt 2) {
                $baseDomain = $parts[-2..-1] -join '.'
                $wildcard = "*.$baseDomain"
                if ($wildcard -notin $wildcardDomains) {
                    $wildcardDomains += $wildcard
                }
            } else {
                if ($domain -notin $wildcardDomains) {
                    $wildcardDomains += $domain
                }
            }
        }
        
        Write-Host "`nSuggested Wildcards ($($wildcardDomains.Count)):`n" -ForegroundColor Cyan
        $wildcardDomains | Sort-Object | ForEach-Object { Write-Host "  $_" }
        
        # Save to file
        $wildcardDomains | Sort-Object | Out-File $outputFile -Encoding UTF8
        Write-Host "`n✓ Domain list saved to: $outputFile" -ForegroundColor Green
        
        # Category analysis
        Write-Host "`nDomain Categories:" -ForegroundColor Cyan
        $categories = @{
            "Microsoft" = @()
            "Google" = @()
            "CDN" = @()
            "Other" = @()
        }
        
        foreach ($domain in $wildcardDomains) {
            if ($domain -match "microsoft|live|office|sharepoint|onenote|ms") {
                $categories["Microsoft"] += $domain
            } elseif ($domain -match "google|gstatic|googleapis") {
                $categories["Google"] += $domain
            } elseif ($domain -match "cdn|cloudfront|azure|akamai") {
                $categories["CDN"] += $domain
            } else {
                $categories["Other"] += $domain
            }
        }
        
        foreach ($cat in $categories.Keys | Sort-Object) {
            if ($categories[$cat].Count -gt 0) {
                Write-Host "`n$cat ($ ($categories[$cat].Count)):" -ForegroundColor Yellow
                $categories[$cat] | Sort-Object | ForEach-Object { Write-Host "  $_" }
            }
        }
        
    } catch {
        Write-Host "⚠ Error analyzing HAR file: $_" -ForegroundColor Red
    }
} else {
    Write-Host "`nSkipping analysis. You can manually upload the HAR file to the web tool." -ForegroundColor Yellow
}

# Step 6: Next steps
Write-Host "`n=== Next Steps ===" -ForegroundColor Cyan
Write-Host @"

1. Open the SEB Config Generator web tool
2. Go to 'Analyze Domains' tab (if available) or use 'Custom Domains'
3. Upload your HAR file OR paste the domains from $outputFile
4. Generate and test your configuration

Remember to TEST with a student account before deploying!

"@

Write-Host "Capture complete! 🎉" -ForegroundColor Green
