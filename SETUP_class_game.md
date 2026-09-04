# SAR Memory — Class Game — Setup Guide

This is the **all-against-all classroom version** of the SAR memory game.
Everyone plays every round on their own phone at the same time; the scoreboard
updates live across all phones and the highest score wins. Students join by
scanning a QR code — **no app and no login needed** for them.

The whole game is one file: **`sar_memory_class.html`**.

You only have to do the one-time setup below **once**. After that, hosting a
game is just: open the page → click *Host* → students scan the QR.

---

## What you need to do (about 10 minutes, once)

1. Create a free Firebase project and turn on its Realtime Database.
2. Paste 5 values from Firebase into `sar_memory_class.html`.
3. Put the file online at a web address (so phones can open it).

Firebase is Google's free realtime service. The free ("Spark") plan is far more
than enough for a class — you will not be charged, and no credit card is asked
for.

---

## Step 1 — Create the Firebase project + database

1. Go to **https://console.firebase.google.com** and sign in with a Google account.
2. Click **Add project** (or "Create a project"). Give it a name like
   `sar-memory-game`. You can skip/disable Google Analytics. Click **Create**.
3. In the left menu open **Build → Realtime Database**.
   Click **Create Database**.
   - Pick any location (e.g. *europe-west1*).
   - When asked about rules, choose **Start in test mode** (we tighten this in Step 3).
   - Click **Enable**.
   You now have a database. Note the URL shown at the top — it looks like
   `https://sar-memory-game-default-rtdb.europe-west1.firebasedatabase.app`
   or `...-default-rtdb.firebaseio.com`. You'll need it.

4. Register a **Web app** to get your config:
   - Click the gear icon **⚙ → Project settings**.
   - Scroll to **Your apps**, click the **web icon `</>`**.
   - Give it a nickname (e.g. `game`), **do not** tick Firebase Hosting, click **Register app**.
   - Firebase shows a `firebaseConfig = { ... }` block. **Keep this page open** — you copy from it in Step 2.

---

## Step 2 — Paste your config into the file

1. Open **`sar_memory_class.html`** in a plain text editor
   (TextEdit, VS Code, Notepad — anything).
2. Near the top you'll find this block:

   ```js
   const FIREBASE_CONFIG = {
     apiKey: "PASTE_API_KEY_HERE",
     authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
     databaseURL: "https://PASTE_PROJECT_ID-default-rtdb.firebaseio.com",
     projectId: "PASTE_PROJECT_ID",
     appId: "PASTE_APP_ID"
   };
   ```

3. Replace each value with the matching value from your Firebase `firebaseConfig`.
   Copy the text **inside the quotes**. In particular:
   - `apiKey`      → your `apiKey`
   - `authDomain`  → your `authDomain`
   - `databaseURL` → your `databaseURL` (the database address from Step 1.3)
   - `projectId`   → your `projectId`
   - `appId`       → your `appId`

   ⚠️ **`databaseURL` is the important one** — the game checks it. If your
   Firebase config block doesn't show a `databaseURL` line, it means the
   Realtime Database wasn't created yet (redo Step 1.3); the address is also on
   the Realtime Database page.

4. Save the file (keep it as `.html`).

> These values are **not secret** — they are meant to live in the web page.
> Access is controlled by the database rules in Step 3, not by hiding these.

---

## Step 3 — Set the database rules

By default the database is open to everyone for a few weeks ("test mode") and
then locks itself. Set simple rules so it keeps working and only the game's data
is reachable:

1. In Firebase, open **Build → Realtime Database → Rules**.
2. Replace what's there with:

   ```json
   {
     "rules": {
       "rooms": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```

3. Click **Publish**.

This lets students read and write only under `rooms/…` (the game data). It does
not require any login. It's fine for a classroom game. Notes:
- Don't store anything sensitive — only nicknames and scores go in there.
- Anyone who has your page could write to `rooms/…`. For a class that's fine.
- If you ever want to wipe it, open Realtime Database → the three-dot menu →
  *Delete data*, or just delete/pause the project when the course is over.

---

## Step 4 — Put the file online

Phones need a real web address (https). Pick whichever is easiest for you:

**Easiest — Netlify Drop (no account needed to try):**
1. Go to **https://app.netlify.com/drop**.
2. Drag **`sar_memory_class.html`** onto the page.
3. It gives you a link like `https://random-name.netlify.app/sar_memory_class.html`.
   That's your game URL.

**GitHub Pages (free, stable):**
1. Create a repository, upload `sar_memory_class.html`.
2. Repo **Settings → Pages** → deploy from your main branch.
3. Your URL will be `https://<you>.github.io/<repo>/sar_memory_class.html`.

**Your university / department web space:** just upload the file and use its https URL.

> It must be **https** (not `file://` on your own computer) so that phones can
> open it and so the join QR works. Opening the file locally works only for
> testing on that one computer.

---

## Running a game in class

1. On the classroom projector, open your game URL and click **“Host a new game”**.
2. A **QR code**, a **link**, and a **4-letter room code** appear.
   Students point their phone camera at the QR (or type the link + code),
   then enter a nickname to join. Joined names appear on your screen.
3. Choose **study time**, **answer time**, and **number of rounds**, then
   click **Start game**.
4. Each round runs itself:
   - **Memorise** — a satellite card shows on every screen with a countdown.
   - **Answer** — the card hides, a question with **6 options** appears; every
     student taps an answer on their phone. Faster correct answers score more.
   - **Reveal** — the correct option, the satellite's **name + picture**, and the
     **live scoreboard** are shown. Click **Next round**.
5. After the last round a **winner** screen shows the final ranking.

Tips:
- You can shorten a phase with **“Show question now”** / **“Reveal answer”**.
- Students can join late — they simply start scoring from the next round.
- Keep the host tab open for the whole game (it drives the rounds).
- One game at a time per projector is simplest; each *Host* click makes a fresh room code.

---

## Troubleshooting

- **“Not connected to a database yet”** → the config in Step 2 isn't filled in
  (especially `databaseURL`). Re-check the pasted values and save.
- **QR code doesn't appear** → no internet on the host, or a blocked CDN. The
  **room code + link** always work — students can type those instead.
- **Students can't join / scoreboard doesn't move** → make sure the page is on a
  public **https** address (Step 4), everyone used the **same room code**, and
  the **rules were published** (Step 3).
- **Phone camera won't open the QR** → students can open the link shown on the
  projector in their phone browser and type the 4-letter code.

---

## The two versions in this folder

- **`index.html`** (+ `app.js`, `style.css`, `assets/`) — the original
  **one-computer, turn-based** game, now also showing the satellite's
  **name + picture** on the answer side. No setup needed; just open `index.html`.
- **`sar_memory_class.html`** — this **live class version** (needs the setup above).

Both use the same 15 satellites and the same six questions.
