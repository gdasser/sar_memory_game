# Spaceborne SAR Memory Game

Game modes in class where the lecturer is hosting the game and a solo-mode where students can practice by themselves.
**Live class game:** https://gdasser.github.io/sar_memory_game/sar_memory_class.html
**Solo mode:**https://gdasser.github.io/sar_memory_game/sar_memory_class.html?solo=1

---

## 1. Classic version — one computer, turn based (`index.html`)

No setup, no internet needed. Just double-click **`index.html`**.

Flow: study a satellite card for 60 s → the card is hidden → roll the die (picks
question 1–6) → type your answer → correct = you collect the satellite, wrong =
it goes back in the deck. Most satellites collected wins. After you answer, the
satellite's **name and picture** are revealed next to the feedback.

Files: `index.html`, `app.js`, `style.css`, `data.js`, and the `assets/` folder
(keep them together).

---

## 2. Class version — all-against-all, live, join by QR (`sar_memory_class.html`)

Everyone in class plays every round at the same time on their own phone. The
scoreboard updates live across all phones and the highest score wins. Students
join by scanning a QR code — no app, no login. Answers are multiple choice
(6 options).

### How it is set up (already done)
- **Database (live scoreboard):** Firebase Realtime Database — project **`sar-memory`**.
  The game reads/writes rooms, players and answers here in real time.
- **Hosting (the web page):** **GitHub Pages**, repo **`sar_memory_game`**.
  This is *not* Firebase Hosting — Firebase is only the database; GitHub serves the page.
- **Your game link:** https://gdasser.github.io/sar_memory_game/sar_memory_class.html

The Firebase config is already pasted inside `sar_memory_class.html`, so the file
just works from that link. Setup details (in case you ever redo it) are in
`SETUP_class_game.md`.

### Running a game in class
1. On the classroom projector, open the game link → click **"Host a new game"**.
2. A **QR code**, a link, and a **4-letter room code** appear. Students scan the
   QR (or open the link and type the code), enter a nickname, and join. Their
   names appear on your screen.
3. Choose **study time**, **answer time**, and **number of rounds** → **Start game**.
4. Each round runs itself:
   - **Memorise** — a satellite card shows on every screen with a countdown.
   - **Answer** — the card hides, the question appears; the satellite's **name and
     picture** stay visible (but not its data), and every student taps one of the
     6 options on their phone.
   - **Reveal** — the correct option, the satellite, and the live scoreboard.
     Click **Next round**.
5. After the last round, a **winner** screen shows the final ranking.

Defaults: **60 s** study time and **10 rounds** (both adjustable before you start).
The countdown timer shows on the **main/host screen**; the students' phones just
show the card and the answer buttons.

Tips: you can shorten a phase with "Show question now" / "Reveal answer".
Students may join late (they score from the next round). Keep the host tab open
for the whole game. Each "Host a new game" click makes a fresh room code.

### Solo practice
Students can also practise **on their own**, with no room code and no database:
- From the start screen, tap **"Solo ,ode"**, or
- open the direct link:
  **https://gdasser.github.io/sar_memory_game/sar_memory_class.html?solo=1**

In solo you pick the **number of rounds** (1, 5, 10, 15, or all 16) and an optional
**time per card** (no timer / 30 s / 60 s). Memorise each card — if a timer is set,
the card hides automatically when it runs out, or you can tap **"Show the question"**
earlier — then choose an answer and see the correct one plus the satellite. At the
end you get a score of **correct / total** (and a %).
Solo works even without internet once the page has loaded, since it doesn't use
the database.

---

## 3. Scoring (class version)

Each round is scored on its own, then totals are summed for the leaderboard.

- **Correct answer:** **600 points** guaranteed, **plus up to 400 bonus points for
  speed** — the faster you answer, the bigger the bonus.
  - Answer correctly almost instantly ≈ **1000 points**.
  - Answer correctly right as time runs out ≈ **600 points**.
- **Wrong answer or no answer:** **0 points**.
- Exact formula: `points = 600 + 400 × (fraction of the answer time still left)`.
- The **winner** is the player with the highest **total** across all rounds.
  Ties are possible (shown as joint winners).

So being right matters most (600 of the up-to-1000), and being fast is the
tie-breaker that rewards quick recall.

---

## 4. The 6 questions

Each round asks ONE of these about the satellite you just memorised:

1. Country & operator
2. Data acquisition strategy & availability (e.g. "global, open archive")
3. Operational timeframe
4. Wavelength / central frequency
5. Revisit time
6. Line-of-sight (LOS) incidence angles

Note on the sensor question: wavelength and frequency are given to **one decimal
place** (e.g. 3.1 cm / 9.6 GHz) so the game doesn't hinge on tiny differences.
