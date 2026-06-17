# 🎬 Film Finesse Insights

A beautifully designed, fully featured **movie review website** built as a single HTML file. Write, format, and publish rich movie reviews with images, videos, YouTube trailers — powered by Supabase for cloud storage and Netlify for hosting.

🌐 **Live site:** [filmfinesseinsights.netlify.app](https://filmfinesseinsights.netlify.app)
📸 **Instagram:** [@filmfinesseinsights](https://www.instagram.com/filmfinesseinsights?igsh=dHFlMzl4M3U0cTQx)

---

## ✨ Features

### For Readers
- 🎬 Browse all movie reviews on a clean homepage
- 🔍 Search reviews by title, genre, author or content
- 📖 Click any review to read the full article
- 💬 Sign in with Google to leave comments
- ↗ Share reviews to WhatsApp, Telegram, Twitter, Facebook, Reddit and Email
- 📱 Fully responsive — works on all devices

### For Admin
- 🔐 Separate admin login page (`/login.html`)
- ✍️ Rich text editor with full formatting toolbar
  - Font family & size
  - Bold, Italic, Underline, Strikethrough
  - Text colour (24 swatches + custom RGB)
  - Highlight colour
  - Headings, Blockquote, Lists
  - Text alignment — Left, Centre, Right, Justify
- 🖼 Upload cover image (auto-hosted on ImgBB)
- 📷 Insert images anywhere in review (device or URL)
- 🎥 Insert videos anywhere in review (device or URL)
- ▶ Embed YouTube videos inline
- 🎞 Add YouTube trailer (shown at end with thumbnail)
- 📐 Resize any media — 25% / 50% / 75% / Full
- 👁 Preview before publishing
- 💾 Auto-save draft — never lose your work
- ✎ Edit & republish any existing review
- 🗑 Delete reviews (also deletes from database)

### Technical Features
- ☁️ Reviews stored in **Supabase** (Postgres database)
- 🖼 Cover images hosted on **ImgBB** (real URLs for share previews)
- 🔗 Unique URL per review (`/?review=id`)
- 📊 Open Graph meta tags — share previews show cover image on all platforms
- ⚡ Netlify Edge Function injects review-specific meta tags server-side
- 🔒 Session-based admin authentication

---

## 📁 File Structure

```
filmfinesseinsights/
│
├── index.html                          ← Main website
├── login.html                          ← Admin login page
├── netlify.toml                        ← Netlify configuration
├── README.md                           ← This file
└── netlify/
    └── edge-functions/
        └── og-meta.js                  ← Server-side OG meta injection
```

---

## 🚀 Deployment

This site is hosted on **Netlify** connected to this GitHub repository. Every commit to the `main` branch automatically redeploys the site within 30–60 seconds.

### Manual deploy (if needed)
1. Go to [netlify.com](https://netlify.com) → your site
2. **Deploys** tab → drag and drop the entire project folder

---

## ☁️ Services Used

| Service | Purpose | Free Tier |
|---|---|---|
| [Netlify](https://netlify.com) | Hosting + Edge Functions | Free forever |
| [Supabase](https://supabase.com) | Reviews + Comments database | 500MB free |
| [ImgBB](https://imgbb.com) | Cover image hosting | Free |
| [Google OAuth](https://console.cloud.google.com) | Comment sign-in | Free |

---

## 🗄️ Database Schema (Supabase)

### `reviews` table
```sql
create table reviews (
  id text primary key,
  data jsonb not null,
  created_at timestamp with time zone default now()
);
```

### `comments` table
```sql
create table comments (
  id text primary key,
  review_id text not null references reviews(id) on delete cascade,
  user_name text not null,
  user_email text not null,
  user_avatar text,
  body text not null,
  created_at timestamp with time zone default now()
);
```

---

## 🔐 Admin Access

Admin login is at `/login.html` — this page is not linked anywhere on the public site. Bookmark it on your devices.

After logging in:
- **+ Write review** button appears in the header
- **✎ Edit & Republish** and **✕ Delete** buttons appear on each review
- **🔓 Logout** button appears in the header

Session is cleared when you close the browser tab.

---

## 🛠️ Making Code Changes

1. Edit any file directly on GitHub (click the file → pencil icon ✏️)
2. Commit the changes
3. Netlify automatically redeploys in 30–60 seconds
4. Check **Deploys** tab on Netlify to confirm

---

## 📱 Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Mobile (iOS / Android) | ✅ Responsive |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Playfair Display, Inter |
| Database | Supabase (Postgres) |
| Image hosting | ImgBB API |
| Hosting | Netlify |
| Edge Functions | Netlify Edge Functions (Deno) |
| Comments auth | Google OAuth 2.0 |

---

## 📄 License

Personal project — Film Finesse Insights. All rights reserved.
