# Little Genius Learning & Care Centre — Website

Premium 6-page static site with a Vercel serverless email handler. Pure HTML/CSS/JS, no build step.

## Files

| File | Purpose |
|---|---|
| `index.html` | Home |
| `about.html` | About Us |
| `student-care.html` | Student Care programme page |
| `tuition.html` | Tuition programme page |
| `holiday.html` | Holiday Programmes page |
| `enquire.html` | Enquiry form + map |
| `styles.css` | Shared stylesheet for all 6 pages |
| `nav.js` | Shared cursor, nav-scroll state, active-link highlighting, mobile menu, scroll reveals, toast helper |
| `api/email.js` | Vercel serverless function — sends enquiry form submissions via Gmail SMTP (Nodemailer) |
| `package.json` | Declares the `nodemailer` dependency for the serverless function |
| `vercel.json` | Minimal Vercel routing/headers config |
| `videos/` | Drop `v1.mp4`–`v5.mp4` here (same files reused across all pages, one per page, as static first-frame backgrounds via the `#t=0.1` URL fragment) |
| `images/` | Drop real photos here to replace the gold-bordered placeholder boxes (see setup-manual.md) |

## Stack

- Pure HTML/CSS/JS — no framework, no bundler
- GSAP 3.12.5 + ScrollTrigger, Three.js r134 (home page hero pen/ink animation only — kept off inner pages for load speed)
- Fonts: Panchang, Shippori Mincho, Space Mono (Google Fonts CDN)
- `api/email.js`: Node serverless function on Vercel, using `nodemailer` with Gmail SMTP

## Environment variables (set in Vercel dashboard, never hardcoded)

```
GMAIL_USER = <the sending Gmail address>
GMAIL_APP_PASSWORD = <a Gmail App Password, not the account password>
TO_EMAIL = 242032R@student.hci.edu.sg   (change to enquiry@littlegeniusedu.com after client onboarding)
```

## Local development

There is no build step. To preview locally with the serverless function working, use the Vercel CLI:

```
npm install
npx vercel dev
```

Opening the HTML files directly (`file://`) will render the pages, but the enquiry form's `fetch('/api/email')` call requires either `vercel dev` or a full Vercel deployment.

## Deployment

1. Push this folder to a Git repo (or drag-and-drop into Vercel).
2. In the Vercel project settings, add the three environment variables above.
3. Deploy. `api/email.js` is auto-detected as a serverless function.

## SEO

- Every page has a unique `<title>`, meta description (150–160 chars), keywords, Open Graph tags, `robots`, and a canonical URL.
- `index.html` includes `EducationalOrganization` JSON-LD structured data (address, phone, geo, opening hours, social links).
- Update the `https://littlegeniusedu.com/...` canonical URLs and the JSON-LD `url`/`image` fields once the real production domain is confirmed.

## Known placeholders (see setup-manual.md for how to replace)

- Logo: gold "LG" monogram circle, marked with `<!-- REPLACE THIS WITH OFFICIAL LOGO -->` in every page's nav.
- Photos: gold-dashed-border placeholder boxes throughout `student-care.html`, `tuition.html`, `holiday.html`, and `about.html`.
- Videos: `./videos/v1.mp4`–`v5.mp4` are referenced but not included — add the real files.
- Some copy explicitly says "please enquire with us directly" where exact fees, meal menus, and schedules weren't publicly available at build time (per instruction: nothing was invented).

## Research note

Facebook and Instagram pages could not be scraped directly (JS-rendered / auth-walled content, inaccessible to automated fetching). Content on this site — programmes, reviews, address, schools served — was carried over from previously verified, client-provided material rather than re-scraped. If FB/IG have newer public posts (fees, schedules, event dates) worth adding, they should be pulled manually and the "please enquire" placeholders updated accordingly.
