# Glow Gadget landing page

Vercel-ready Next.js landing page with email capture and optional Meta Pixel support.

## Local development

1. Run `npm install`
2. Copy `.env.example` to `.env.local`
3. Add your Supabase project URL and publishable key
4. Run `npm run dev`

The release form creates a Supabase Auth user for that email. In the Supabase dashboard, turn off “Confirm email” if you want people added to the list without a confirmation message. Without the Supabase variables, the form says signup is not configured.

## Vercel

Import this folder into Vercel and add the variables from `.env.example` under **Project Settings → Environment Variables**.

To add Meta tracking later, set `NEXT_PUBLIC_META_PIXEL_ID`. The page automatically records `PageView` and sends a `Lead` event after a successful signup.
