# Server Configuration Templates

This directory contains production-ready server configuration templates for deploying the SEB Config Generator with comprehensive security headers.

## 📁 Available Configurations

### Apache (.htaccess)
- **Location:** `apache/.htaccess`
- **Requirements:** Apache 2.4+ with `mod_headers` enabled
- **Setup:** Copy to your web root directory

### Nginx
- **Location:** `nginx/sebconfiggenerator.conf`
- **Requirements:** Nginx 1.18+
- **Setup:** Copy to `/etc/nginx/sites-available/` and create symlink

## 🔒 Security Headers Included

All configurations implement the following security headers:

### 1. Content-Security-Policy (CSP)
```
default-src 'self'; 
script-src 'self'; 
style-src 'self'; 
img-src 'self' data:; 
connect-src 'self'; 
object-src 'none'; 
base-uri 'self'; 
form-action 'self';
```
- **Purpose:** Prevents XSS attacks by controlling resource loading
- **Note:** No `unsafe-inline` or `unsafe-eval` - all code is externalized

### 2. X-Frame-Options: DENY
- **Purpose:** Prevents clickjacking attacks
- **Effect:** Page cannot be embedded in iframes
- **Alternative:** Use `SAMEORIGIN` if you need same-origin iframe embedding

### 3. X-Content-Type-Options: nosniff
- **Purpose:** Prevents MIME-type sniffing attacks
- **Effect:** Browsers must respect declared Content-Type headers

### 4. Referrer-Policy: strict-origin-when-cross-origin
- **Purpose:** Controls referrer information in requests
- **Effect:** 
  - Same-origin: Full URL sent
  - Cross-origin HTTPS→HTTPS: Only origin sent
  - Cross-origin HTTPS→HTTP: No referrer sent

### 5. Permissions-Policy
```
geolocation=(), microphone=(), camera=(), payment=()
```
- **Purpose:** Restricts browser feature access
- **Effect:** Disables sensitive device features

### 6. Strict-Transport-Security (HSTS)
```
max-age=31536000; includeSubDomains; preload
```
- **Purpose:** Forces HTTPS connections
- **⚠️ WARNING:** Only enable after HTTPS is properly configured!
- **Status:** Commented out by default in both configs

## 🚀 Apache Deployment

### Requirements
```bash
# Enable mod_headers (Ubuntu/Debian)
sudo a2enmod headers
sudo systemctl restart apache2

# Verify module is enabled
apache2ctl -M | grep headers
```

### Installation
```bash
# Copy .htaccess to web root
cp configs/apache/.htaccess /var/www/html/sebconfig/

# Test Apache configuration
sudo apache2ctl configtest

# Reload Apache
sudo systemctl reload apache2
```

### Verification
1. Access application in browser
2. Open Developer Tools → Network tab
3. Reload page and check Response Headers
4. Verify all security headers are present

## 🚀 Nginx Deployment

### Installation
```bash
# Copy configuration file
sudo cp configs/nginx/sebconfiggenerator.conf /etc/nginx/sites-available/

# Edit configuration (adjust server_name and root path)
sudo nano /etc/nginx/sites-available/sebconfiggenerator

# Create symlink to enable site
sudo ln -s /etc/nginx/sites-available/sebconfiggenerator /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Configuration Adjustments
Edit the following in `sebconfiggenerator.conf`:

```nginx
server_name sebconfig.example.com;  # Your domain
root /var/www/sebconfig;            # Your web root path
```

### Verification
Same as Apache verification steps above.

## 🔐 HTTPS Configuration

### Why HTTPS is Important
- Required for HSTS (Strict-Transport-Security)
- Protects data in transit
- Required for modern browser features
- Improves SEO and user trust

### Let's Encrypt (Free SSL)

#### Apache
```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache

# Obtain certificate (interactive)
sudo certbot --apache -d sebconfig.example.com

# Auto-renewal is configured automatically
sudo systemctl status certbot.timer
```

#### Nginx
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate (interactive)
sudo certbot --nginx -d sebconfig.example.com

# Auto-renewal is configured automatically
sudo systemctl status certbot.timer
```

### After HTTPS is Configured

#### Apache
Uncomment HSTS in `.htaccess`:
```apache
<IfModule mod_headers.c>
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>
```

#### Nginx
1. Uncomment the HTTPS server block in `sebconfiggenerator.conf`
2. Update certificate paths
3. Uncomment HSTS header
4. Test and reload: `sudo nginx -t && sudo systemctl reload nginx`

## 🧪 Testing Your Security Headers

### Online Testing Tools

1. **Security Headers Scanner**
   - URL: https://securityheaders.com/
   - Enter your domain and get a detailed report
   - Target: A+ grade

2. **Mozilla Observatory**
   - URL: https://observatory.mozilla.org/
   - Comprehensive security and best practices scan
   - Target: A+ grade

3. **CSP Evaluator (Google)**
   - URL: https://csp-evaluator.withgoogle.com/
   - Specific CSP policy analysis

### Manual Testing (Browser DevTools)

1. Open your application in Chrome/Firefox
2. Press F12 (Developer Tools)
3. Go to **Network** tab
4. Reload page (Ctrl+R / Cmd+R)
5. Click on the main document request
6. Go to **Headers** section
7. Check **Response Headers** - verify all security headers are present

### Expected Headers
```
Content-Security-Policy: default-src 'self'; script-src 'self'; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), ...
```

After HTTPS:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

## 📊 Security Grades

### Before These Configurations
- Typical Grade: **F** (No security headers)

### After These Configurations (HTTP)
- Expected Grade: **A** (All major headers except HSTS)

### After These Configurations (HTTPS with HSTS)
- Expected Grade: **A+** (All security headers properly configured)

## 🔧 Troubleshooting

### Apache: Headers Not Appearing
```bash
# Check if mod_headers is enabled
apache2ctl -M | grep headers

# Enable if missing
sudo a2enmod headers
sudo systemctl restart apache2
```

### Nginx: Headers Not Appearing
```bash
# Check Nginx configuration syntax
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Ensure 'always' parameter is used
# add_header ... always;  # Correct
# add_header ...;         # May not work in error responses
```

### CSP Violations
- Open Browser Console (F12 → Console)
- Look for CSP violation messages
- Verify CSP policy matches the one in configs
- Check that all resources load from same origin

### HSTS Issues
- Do NOT enable HSTS without valid HTTPS!
- If enabled by mistake, use browser HSTS deletion:
  - Chrome: `chrome://net-internals/#hsts`
  - Firefox: Delete `SiteSecurityServiceState.txt`

## 📝 Customization

### Adjusting CSP Policy
If you need to load resources from external sources:

```nginx
# Allow fonts from Google Fonts
style-src 'self' fonts.googleapis.com;
font-src 'self' fonts.gstatic.com;

# Allow images from CDN
img-src 'self' data: cdn.example.com;
```

### Adjusting X-Frame-Options
If you need iframe embedding from same origin:

```apache
# Apache
Header always set X-Frame-Options "SAMEORIGIN"
```

```nginx
# Nginx
add_header X-Frame-Options "SAMEORIGIN" always;
```

### Adjusting Permissions-Policy
Add more restrictions:

```
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=(), serial=()
```

## 📚 Additional Resources

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

## 🆘 Support

For issues specific to the SEB Config Generator:
- Check main project README
- Review project documentation in `/docs/`
- Open GitHub issue with configuration details

---

**Version:** v0.22.0a1  
**Last Updated:** 2025-11-15  
**Security Audit Completed:** Phase 6
