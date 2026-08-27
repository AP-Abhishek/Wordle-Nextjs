# Wordle (Next.js)

A simple, browser-based implementation of the popular Wordle game. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Live Demo
You can play the game directly in your browser here:
[Play Wordle](https://wordle-by-tuttu.vercel.app/)

## Features
* **Six Attempts:** Guess the hidden 5-letter word within six tries.
* **Guess Feedback:** Get visual feedback for correct letters, misplaced letters, and incorrect letters.
* **On-Screen Keyboard:** Enter guesses using the built-in keyboard or your physical keyboard.
* **Responsive UI:** Play comfortably across desktop and mobile screen sizes.

## How to Run Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/AP-Abhishek/Wordle-Nextjs.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Wordle-Nextjs
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. Open `http://localhost:3000` in your browser.

<hr/>

## Tech Stack
- **Framework:** Next.js (v16)
- **Library:** React (v19)
- **Language:** TypeScript (v5)
- **Styling:** Tailwind CSS (v4)

<hr/>

## Folder Structure
```
wordle
├─ app
│  ├─ api
│  │  └─ target.ts
│  ├─ components
│  │  ├─ Board.tsx
│  │  ├─ Keyboard.tsx
│  │  └─ WordLine.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ README.md
└─ tsconfig.json
```
