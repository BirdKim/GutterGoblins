# GutterGoblins

GutterGoblins is a lightweight React + TypeScript bowling score tracker built with Vite. It lets users log games, track frame-by-frame scoring, and store a short history of recent games in browser local storage.

In the future GutterGoblins will have additional features such as arsenal building and personal coaching feature using AI to help users better their bowling form and approach.

## Features

- Enter player name and record pin counts for each roll
- Handles strike and spare scoring rules across 10 frames
- Shows current game score in real time
- Tracks recent games, average score, best score, and games logged
- Persists recent games using browser local storage
- Built with React, TypeScript, Vite, and Oxlint

## Getting Started

```bash
npm install
npm run dev
```

Open the URL printed by Vite in your browser.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — compile the app for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint against the project

## How to Use

1. Enter your name in the player name field.
2. Click `New game` to start recording a bowling session.
3. Select the number of pins knocked down for each roll.
4. The app updates the score and frame display automatically.
5. When the game ends, your score is saved to the recent games history.

## Project Structure

- `src/App.tsx` — main app UI and game flow logic
- `src/components/scoring.ts` — score calculation utilities
- `src/components/frames.ts` — frame construction from roll inputs
- `src/main.tsx` — React app entry point

## Notes

This is a Phase 1 MVP focused on simple score logging and gameplay tracking. It currently stores up to 10 recent games in local storage.
