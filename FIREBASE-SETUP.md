# Firebase Setup Instructions

## Status: Scaffolded, needs credentials

The Firebase Auth code is in place (index.html + style.css). Just needs real credentials to go live.

## Steps to activate:

1. Go to https://console.firebase.google.com
2. Click "Add project" → name it "ai-pulse"
3. Disable Google Analytics (not needed)
4. Once created, click the web icon (</>) to add a web app
5. Name it "AI Pulse" → Register
6. Copy the `firebaseConfig` object — it looks like:
   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "ai-pulse-xxxxx.firebaseapp.com",
     projectId: "ai-pulse-xxxxx",
     storageBucket: "ai-pulse-xxxxx.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
7. Go to Authentication → Sign-in method → Enable "Google"
8. Set the support email to your email
9. Go to Firestore Database → Create database → Start in test mode
10. Replace the placeholder config in index.html (search for "YOUR_API_KEY")

## What's already built:
- Google sign-in via popup
- Login icon in header (swaps to avatar on auth)
- Sign-out on avatar tap
- Auth state persists across reloads
- Login modal CSS (dark overlay, Google button, email fields)
- Dashboard layout CSS (tabs: My Feed, Bookmarks, Settings)
- Bookmark button CSS on cards
- Profile pill CSS in header

## Next steps after Firebase is live:
- Wire up Firestore for user preferences (category selections)
- Build bookmark save/load with Firestore
- Build settings panel (notification preferences, theme toggle)
- Build "My Feed" filtered view based on user's saved categories
