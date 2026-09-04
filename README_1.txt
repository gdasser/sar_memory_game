# Spaceborne SAR Memory Game

This folder contains TWO versions of the game.

--------------------------------------------------------------------
1) CLASSIC — one computer, turn based   (index.html)
--------------------------------------------------------------------
Run:
  - Keep the `assets` folder next to `index.html`.
  - Double-click `index.html` (or open it in Chrome/Safari/Firefox).
  - Enter player names and start. No setup required.

Flow:
  - 60-second memorisation phase, then the card is hidden
  - virtual die selects question 1–6
  - player types the answer
  - correct  = satellite collected
  - incorrect = satellite returns to the deck
  - most collected satellites wins

NEW: on the answer side the game now reveals the satellite's NAME and
PICTURE (the top of the card), so you always see which satellite it was.

--------------------------------------------------------------------
2) CLASS — all against all, live, via QR code   (sar_memory_class.html)
--------------------------------------------------------------------
Everyone in class plays every round at the same time on their own phone;
the scoreboard updates live and the highest score wins. Students join by
scanning a QR code — no app, no login. Answers are multiple choice (6
options) so scoring is instant.

This version needs a ONE-TIME setup (a free Firebase database + putting
the file online). Full step-by-step instructions are in:

  SETUP_class_game.md

--------------------------------------------------------------------
Source
--------------------------------------------------------------------
Satellite values and game rules are based on the supplied Spaceborne SAR
memory game PDF. Both versions use the same 15 satellites and 6 questions.
