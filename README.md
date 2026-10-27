# THE WISHVERSE — Interactive AU

A starter interactive fiction website built with Next.js, TypeScript, and Tailwind CSS. It is designed to deploy on Vercel.

## Included
- Responsive dark fantasy / celestial visual design
- Interactive choices that branch to different scenes
- Reader-insert name setting
- Back button and restart
- Progress and save state stored in the visitor's browser
- Multiple story routes and three sample endings
- No API keys or database required

## Run locally
1. Install Node.js (LTS).
2. Extract this folder.
3. Open a terminal in the folder and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open http://localhost:3000

## Deploy to Vercel
1. Create a GitHub repository and upload the contents of this folder.
2. Log in to https://vercel.com and choose **Add New → Project**.
3. Import your repository.
4. Keep the default Next.js settings and click **Deploy**.

You can also deploy with Vercel CLI after installing it:
```bash
npm install
npx vercel
```

## Editing the story
Open `app/page.tsx`. The `scenes` object stores the story text and choices. Each choice has a `next` field that must match another scene key. Add new scene objects to expand the story.

## Notes
- This is a fan-made, unofficial project. NCT WISH and related names belong to their respective owners.
- The initial story is original fiction inspired by a discography-themed fantasy concept; it is not official group lore.
- The current save is local to each visitor's browser. Cross-device/cloud saving requires a database.
