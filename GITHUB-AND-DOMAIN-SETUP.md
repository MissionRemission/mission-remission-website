# Mission Remission Website - GitHub & Wix Domain Setup Guide

## Overview
This guide will help you:
1. Upload your website to GitHub
2. Deploy it using GitHub Pages
3. Connect your custom Wix domain to the GitHub-hosted site

---

## Part 1: Upload Website to GitHub

### Step 1: Create a GitHub Account (if you don't have one)
1. Go to [github.com](https://github.com/)
2. Click "Sign up"
3. Follow the registration process

### Step 2: Create a New Repository
1. Once logged in, click the **"+"** button (top right) → **"New repository"**
2. Fill in the details:
   - **Repository name:** `mission-remission-website` (or any name you prefer)
   - **Description:** "Mission Remission - Blood Cancer United Campaign Website"
   - **Public** or **Private:** Choose **Public** (required for free GitHub Pages)
   - ✅ Check "Add a README file"
   - Click **"Create repository"**

### Step 3: Upload Your Website Files

**Option A: Using GitHub Web Interface (Easiest)**
1. In your repository, click **"Add file"** → **"Upload files"**
2. Drag and drop ALL files from `C:\Users\berna\Desktop\BCU related\` folder:
   - `index.html`
   - `about.html`
   - `sponsorships.html`
   - `gallery.html`
   - `events.html`
   - `updates.html`
   - `donate.html`
   - `styles.css`
   - `script.js`
   - `gallery.js`
   - `events.js`
3. Scroll down, add commit message: "Initial website upload"
4. Click **"Commit changes"**

**Option B: Using Git Command Line (If you prefer)**
Open PowerShell in your website folder and run:
```bash
cd "C:\Users\berna\Desktop\BCU related"
git init
git add .
git commit -m "Initial website upload"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/mission-remission-website.git
git push -u origin main
```

---

## Part 2: Enable GitHub Pages

### Step 1: Enable GitHub Pages
1. In your GitHub repository, click **"Settings"** (top menu)
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Source"**, select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Click **"Save"**

### Step 2: Wait for Deployment
- GitHub will build your site (takes 1-5 minutes)
- Refresh the page
- You'll see a message: **"Your site is live at `https://YOUR-USERNAME.github.io/mission-remission-website/`**

### Step 3: Test Your Site
- Click the URL to verify your website is working
- Check all pages (Home, About, Sponsorships, Gallery, Events, Updates, Donate)

---

## Part 3: Connect Wix Domain to GitHub Pages

### Important Notes:
- **Wix domains can only be connected to Wix websites by default**
- To use a Wix domain with GitHub Pages, you need to **manage DNS settings**

### Option 1: Transfer Domain Management from Wix to Another Provider

If you bought your domain through Wix:
1. **Transfer domain to a registrar** (like Namecheap, Google Domains, Cloudflare)
2. Once transferred, you can manage DNS settings
3. Follow Option 2 below

### Option 2: Use Wix DNS Settings (If Available)

**Step 1: Get Your GitHub Pages IP Addresses**
GitHub Pages uses these IP addresses:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Step 2: Configure DNS in Wix**
1. Log in to [Wix.com](https://www.wix.com/)
2. Go to **"Domains"** → Select your domain
3. Click **"Manage DNS"** or **"Advanced DNS"**
4. Add these DNS records:

**For root domain (e.g., `missionremission.com`):**
```
Type: A
Host: @
Value: 185.199.108.153
```
```
Type: A
Host: @
Value: 185.199.109.153
```
```
Type: A
Host: @
Value: 185.199.110.153
```
```
Type: A
Host: @
Value: 185.199.111.153
```

**For www subdomain (e.g., `www.missionremission.com`):**
```
Type: CNAME
Host: www
Value: YOUR-USERNAME.github.io
```

**Step 3: Configure Custom Domain in GitHub**
1. Go to your repository **"Settings"** → **"Pages"**
2. Under **"Custom domain"**, enter: `missionremission.com` (or your domain)
3. Click **"Save"**
4. Wait 24-48 hours for DNS propagation
5. ✅ Check **"Enforce HTTPS"** (once DNS is verified)

---

## Alternative: Use GitHub Pages with a Subdomain

If you want to keep your main Wix site and only use a subdomain for this website:

**Example:** `campaign.missionremission.com` points to GitHub Pages

1. In Wix DNS settings, add:
   ```
   Type: CNAME
   Host: campaign
   Value: YOUR-USERNAME.github.io
   ```
2. In GitHub Pages settings, set custom domain: `campaign.missionremission.com`

---

## Part 4: Important - Update Your Website Files

### Create a CNAME File
Once your custom domain is configured:

1. In your GitHub repository, click **"Add file"** → **"Create new file"**
2. Name it: `CNAME` (all caps, no extension)
3. Content: Just your domain name
   ```
   missionremission.com
   ```
4. Commit the file

---

## Troubleshooting

### DNS Not Working?
- **Wait 24-48 hours** for DNS propagation
- Check DNS status: [whatsmydns.net](https://www.whatsmydns.net/)
- Verify A records point to GitHub IPs
- Verify CNAME points to your GitHub Pages URL

### Wix Won't Let You Edit DNS?
- Wix locks DNS if you're using Wix hosting
- **Solution:** Point Wix domain to external DNS provider (Cloudflare is free)
- Transfer domain management from Wix

### HTTPS Not Working?
- Wait 24 hours after DNS propagation
- Return to GitHub Pages settings
- Check **"Enforce HTTPS"** box
- If it's grayed out, wait longer for verification

### Gallery/Events Not Loading?
- This is a **client-side website** (HTML/CSS/JS)
- Google APIs work directly in the browser
- No server needed
- Gallery and Events will continue working on GitHub Pages

---

## Recommended: Use Cloudflare (Free & Easy)

**Best approach for Wix domains:**

1. **Sign up for Cloudflare** (free): [cloudflare.com](https://www.cloudflare.com/)
2. **Add your domain** to Cloudflare
3. **Update nameservers** in Wix to point to Cloudflare
4. **Manage DNS in Cloudflare** (add A records and CNAME as described above)
5. **Benefits:**
   - Free SSL/HTTPS
   - Faster loading
   - DDoS protection
   - Easy DNS management

---

## Quick Start Checklist

- [ ] Create GitHub account
- [ ] Create new repository
- [ ] Upload all website files
- [ ] Enable GitHub Pages
- [ ] Test the GitHub Pages URL
- [ ] Decide on domain strategy (transfer vs. DNS vs. subdomain)
- [ ] Configure DNS settings
- [ ] Create CNAME file in repository
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Enable HTTPS
- [ ] Test final website at custom domain

---

## Need Help?

**GitHub Pages Documentation:**
- [GitHub Pages Basics](https://docs.github.com/en/pages/getting-started-with-github-pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

**Domain Issues:**
- If Wix blocks DNS management, consider transferring domain to Namecheap or Cloudflare
- GitHub Pages is FREE and will host your site indefinitely

---

## Summary

Your website is a **static HTML site** (no backend server needed), which is perfect for GitHub Pages. Once uploaded:

✅ **Free hosting forever**  
✅ **Automatic HTTPS**  
✅ **Fast global CDN**  
✅ **Gallery & Events work perfectly** (client-side APIs)  
✅ **Easy updates** (just upload new files)  

The only complexity is connecting a Wix domain, which may require transferring domain management to another provider like Cloudflare for easier DNS control.
