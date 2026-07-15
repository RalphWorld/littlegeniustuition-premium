# Little Genius Website — Setup Manual (Plain English)

This guide is for whoever manages the website day-to-day — no coding experience needed for the steps below.

## 1. Swap in the real logo

Open any page's HTML file in a text editor and search for:

```
<!-- REPLACE THIS WITH OFFICIAL LOGO -->
```

Right now this sits next to a placeholder gold "LG" circle in the top-left navigation. Once you have the official logo file, ask your developer to swap the placeholder `<span class="logo-mark">LG</span>` for an `<img>` tag pointing at the logo image. This comment appears in all 6 pages — each needs the same swap.

## 2. Add the videos

Put your 5 video files into the `videos/` folder, named exactly:

```
videos/v1.mp4
videos/v2.mp4
videos/v3.mp4
videos/v4.mp4
videos/v5.mp4
```

Each page uses one of these as its background (Home = v1, Student Care = v2, Tuition = v3, Holiday = v4, Enquire = v5, About = v1). They show only the first frame as a static image — they do not autoplay or loop.

## 3. Add real photos

Throughout the Student Care, Tuition, Holiday, and About pages you'll see gold-dashed boxes that say things like "Photo: Insert classroom photo here." To replace one:

1. Save your photo into the `images/` folder.
2. Ask your developer to replace that specific placeholder `<div class="pph">...</div>` with an `<img src="./images/your-photo.jpg" alt="...">` tag. Keep the descriptive `alt` text (it helps with Google search rankings) or write a new one describing the photo.

## 4. Set up the enquiry form email

The "Send Enquiry" form on the Enquire page needs three settings added in your Vercel account (Project → Settings → Environment Variables):

| Name | What to put |
|---|---|
| `GMAIL_USER` | The Gmail address enquiries should be sent *from* |
| `GMAIL_APP_PASSWORD` | A Gmail **App Password** (not your normal Gmail password) — generate one at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) after enabling 2-Step Verification |
| `TO_EMAIL` | The address enquiries should be sent *to*. During testing this is `242032R@student.hci.edu.sg` — change it to `enquiry@littlegeniusedu.com` once you're ready to go live |

After adding or changing these, redeploy the site in Vercel for the change to take effect.

## 5. Updating page content

All the text on each page lives directly in that page's `.html` file. Open it in any text editor, find the sentence you want to change, edit it, save, and redeploy. There's no admin panel — this is a hand-built site, so changes go through your developer or directly by editing the HTML.

## 6. What "please enquire with us directly" means

A few spots on the site (exact fees, meal menus, daily schedule timings) intentionally say "please enquire" instead of guessing a number, because that information wasn't publicly available when the site was built. Once you're ready to publish real figures, search each page for "please enquire" and replace with the real detail.

## 7. Going live checklist

- [ ] Logo swapped in on all 6 pages
- [ ] Videos added to `videos/`
- [ ] Photos added to `images/` and placeholders swapped
- [ ] `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `TO_EMAIL` set in Vercel (and `TO_EMAIL` updated to the real inbox)
- [ ] Test the enquiry form end-to-end and confirm the email arrives
- [ ] Update canonical URLs / JSON-LD `url` field in each page's `<head>` to match your real domain
