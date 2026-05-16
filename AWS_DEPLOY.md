# Vetri Oil Mill – AWS S3 Deployment Guide

## Files to Upload

```
oil-mill-project/
├── index.html        ← Main webpage
├── styles.css        ← All styling
├── script.js         ← Interactivity & animations
└── images/
    ├── hero_bg.png   ← Hero section background
    ├── about.png     ← About section image
    └── products.png  ← Products showcase image
```

---

## Step 1: Create an S3 Bucket

1. Go to [AWS Console → S3](https://s3.console.aws.amazon.com)
2. Click **"Create bucket"**
3. Bucket name: `vetri-oil-mill` (must be globally unique)
4. Region: `ap-south-1` (Mumbai — closest to Tamil Nadu)
5. **Uncheck** "Block all public access" → Acknowledge
6. Click **"Create bucket"**

---

## Step 2: Enable Static Website Hosting

1. Open your bucket → **Properties** tab
2. Scroll to **"Static website hosting"** → Click **Edit**
3. Enable it → Set **Index document**: `index.html`
4. Save changes
5. Note your **Bucket website endpoint** (e.g. `http://vetri-oil-mill.s3-website.ap-south-1.amazonaws.com`)

---

## Step 3: Set Bucket Policy (Make Public)

Go to **Permissions** → **Bucket policy** → Paste this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::vetri-oil-mill/*"
    }
  ]
}
```

Replace `vetri-oil-mill` with your actual bucket name.

---

## Step 4: Upload Files

### Option A – AWS Console (Drag & Drop)
1. Go to bucket → **"Upload"**
2. Upload `index.html`, `styles.css`, `script.js`
3. Create a folder called `images/` and upload all 3 images inside it

### Option B – AWS CLI (Faster)
```bash
aws s3 sync . s3://vetri-oil-mill --exclude ".git/*" --exclude "*.md"
```

---

## Step 5: (Optional) Add CloudFront CDN for HTTPS

1. Go to [CloudFront](https://console.aws.amazon.com/cloudfront)
2. Click **"Create distribution"**
3. Origin domain: Select your S3 bucket website endpoint
4. Set **Default root object**: `index.html`
5. Enable **HTTPS** redirect
6. Deploy (takes ~15 min)
7. Access via your CloudFront URL: `https://xxxxxxxxxx.cloudfront.net`

---

## Step 6: (Optional) Custom Domain

If you have a domain (e.g. `vetrioilmill.com`):
1. Go to **Route 53** → Create hosted zone
2. Add a CNAME record pointing to CloudFront URL
3. Or use **ACM (Certificate Manager)** for free SSL

---

## 🎉 Your Website is Live!

Your static site costs approximately **₹0-5/month** on S3 (very low traffic).

| Service | Cost |
|---------|------|
| S3 Storage (~5MB) | ~₹0.05/month |
| S3 Data Transfer | First 1GB free |
| CloudFront (optional) | 1TB free/month |
