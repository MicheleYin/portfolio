---
title: Ultimate Sudoku
description: >-
  Ultimate Sudoku is a web application that allows users to play Sudoku puzzles.
image: '@assets/projects/mary-ui-laravel-starter-kit/image.png'
startDate: 2024-12-07
endDate: 2026-01-11
skills:
  - React Native
  - Typescript
  - React Reanimated
downloadLink: https://apps.apple.com/it/app/ultimate-sudoku-app/id6743371040
---
## About Ultimate Sudoku

Ultimate Sudoku is a **mobile Sudoku application** focused on a clean, distraction-free experience. It lets users play Sudoku without ads, trackers, or in-app purchases, prioritizing usability and thoughtful game design over monetization.

The app is built with **React Native and TypeScript**, with smooth interactions powered by **React Reanimated**.

---
## Core Features

### Sudoku Gameplay
- Play classic Sudoku puzzles on mobile
- No ads, no subscriptions, no interruptions
- Responsive and fluid interactions

### Smart Validation
- Real-time validation of player moves
- Ensures the puzzle remains solvable at every step
- Eliminates frustrating dead-end states

---

## Purpose & Impact

I enjoy playing Sudoku, but most mobile apps are overloaded with ads, paywalls, and dark patterns. Ultimate Sudoku was built as a personal alternative: a lightweight, respectful app that focuses purely on the game.

The goal is to make Sudoku relaxing again—something you can open, play, and enjoy without friction.

---

## Tech Stack

- **React Native** – Mobile application framework  
- **TypeScript** – Type safety and maintainability  
- **React Reanimated** – High-performance animations and gestures  

### Why React Native?

React Native allowed me to reuse my existing React knowledge while still delivering a native mobile experience. It also provides a good balance between development speed and performance for an animation-heavy UI like a Sudoku grid.

---

## Technical Challenges

### Sudoku Solver & Puzzle Logic

Most Sudoku apps only offer puzzles with a **single valid solution**. Ultimate Sudoku takes a different approach: puzzles may have **multiple solutions**, as long as they remain solvable.

I implemented a solver that:
- Validates the puzzle state on every user move
- Prevents unsolvable configurations in real time
- Guides users without forcing them to backtrack

This design ensures players never reach a point where the puzzle is broken—something I personally find frustrating in many Sudoku apps.

---

### UI & UX

The UI was designed to be minimal and intuitive, keeping the focus entirely on the grid and player input. Animations and transitions are subtle, reinforcing clarity rather than distracting from gameplay.

The interface is built using **Kitten UI**, customized to fit the app’s lightweight and clean aesthetic.

---

## Known Issues & Limitations

- Higher-than-desired energy consumption  
- No dark mode support yet  

Despite these limitations, Ultimate Sudoku already delivers on its main objective: a calm, ad-free Sudoku experience that respects the player’s time and attention.