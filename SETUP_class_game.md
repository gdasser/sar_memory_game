# Class game — setup & hosting (reference)

The class version (`sar_memory_class.html`) is **already set up and live** at:

**https://gdasser.github.io/sar_memory_game/sar_memory_class.html**

It uses two free services:
- **Firebase Realtime Database** — the live shared scoreboard (project `sar-memory`).
- **GitHub Pages** — serves the web page (repo `sar_memory_game`). *(GitHub, not
  Firebase, hosts the page. Firebase is only the database.)*

You don't need to touch any of this to run a game — just open the link above.
This file is here in case you ever need to redo or change the setup.

---

## What is where

- **Firebase config** (5–7 values connecting the page to the database) is pasted
  inside `sar_memory_class.html`, in the `const FIREBASE_CONFIG = { … }` block near
  the top. It's already filled in.
- **Database rules** (Firebase console → Realtime Database → Rules) are set to allow
  the game to read/write under `rooms`:

  ```json
  { "rules": { "rooms": { ".read": true, ".write": true } } }
  ```

  These are open (no login) but only for game data (nicknames + scores). Nothing
  sensitive is stored. To wipe everything, delete the data in the Firebase console.

---

## Updating the game online

Whenever `sar_memory_class.html` changes (new deck, tweaks, etc.):

1. Open your GitHub repo `sar_memory_game`.
2. **Add file → Upload files** (or drag the new `sar_memory_class.html` in) to
   **replace** the existing one → **Commit changes**.
3. Wait ~1 minute. The **same link** now serves the updated game
   (students may need to refresh / hard-refresh once).

The link never changes as long as the repo and file name stay the same.

---

## Redoing the Firebase setup from scratch (only if needed)

1. **console.firebase.google.com** → your project (or create one).
2. **Build / "Datenbanken und Speicher" → Realtime Database → Create Database** →
   location `europe-west1` → **Start in test mode** → Enable.
3. **Rules** tab → paste the rules block above → **Publish**.
4. Gear ⚙ → **Project settings** → **Your apps** → Web `</>` → register → copy the
   `firebaseConfig` block.
5. Paste those values into the `FIREBASE_CONFIG` block in `sar_memory_class.html`,
   save, and re-upload to GitHub (see above).

The one value that must be correct is **`databaseURL`** — the game checks it.

---

## Troubleshooting

- **Red "not connected to a database yet" box** → the config in
  `sar_memory_class.html` isn't filled in / got overwritten. Re-paste the Firebase
  config and re-upload.
- **404 "There isn't a GitHub Pages site here"** → the file path/URL is wrong, or
  Pages is still building. Confirm the exact repo name and file name; the link is
  `https://<user>.github.io/<repo>/sar_memory_class.html`.
- **QR code missing, but code + link shown** → harmless (a network blocked the QR
  helper). Students can type the link + 4-letter code instead.
- **Phones join but names don't appear on the host** → the database **rules**
  weren't published (step 3 above).
- **"Password protected site"** → that's a hosting-service login page (e.g. a
  Netlify dashboard), not your game. Your game link is the GitHub Pages URL above
  and needs no password.
