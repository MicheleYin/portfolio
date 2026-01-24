---
title: AuroraBook
description: >-
  Audio book generator. Converts any ePub file into an audio book using AI.
image: '@assets/projects/code-tips-platform/image.png'
startDate: 2024-12-07
endDate: 2026-01-11
skills:
  - Tauri
  - Rust
  - React
  - TypeScript
  - Tailwind CSS
  - SQLite
  - ONNX
downloadLink: https://apps.apple.com/it/app/aurorabook/id6757122986
---
## About AuroraBook

AuroraBook is an offline **ePub-to-Audiobook converter** powered by AI. It transforms any ePub file into an audiobook directly on the user’s machine, with no subscriptions, no cloud processing, and full ownership of the content.

The application is built with **Tauri and Rust** for performance and portability, and **React + TypeScript** for a modern, responsive UI.

---

## Core Features

### ePub to Audiobook Conversion
- Convert any ePub file into an audiobook
- Fully **offline** processing
- No accounts or subscriptions required

### AI-Powered TTS
- Uses an **ONNX-based text-to-speech model**
- Designed to run efficiently on consumer hardware
- Privacy-first: all processing happens locally

---

## Purpose & Impact

I wanted to read more books, but not always by sitting in front of a screen. AuroraBook started as a personal tool to make reading more accessible, and evolved into a general-purpose solution for anyone who prefers listening over reading.

While the audio quality doesn’t aim to match professionally produced audiobooks, AuroraBook is free, offline, and open. It complements—not competes with—platforms like Audible, making audiobooks accessible where they otherwise wouldn’t be.

---

## Tech Stack

- **Tauri** – Desktop application framework  
- **Rust** – Core logic and performance-critical code  
- **React + TypeScript** – Frontend  
- **Tailwind CSS** – UI styling  
- **SQLite** – Local data storage  
- **ONNX** – Offline AI inference  

### Why Tauri?

Tauri enables lightweight, secure desktop apps using web technologies while relying on Rust under the hood. It allowed me to ship a performant cross-platform app and deepen my experience with Rust, a language I’m actively investing in.

---

## Technical Challenges

### AI Text-to-Speech & Phonemization

AuroraBook uses the **Kokoro ONNX** TTS model, chosen for its small footprint and ability to run fully offline. However, Kokoro does not include built-in phonemization—a deliberate tradeoff for speed and portability.

Most implementations rely on **eSpeak** for phonemization, but sandbox restrictions made it unsuitable for app store distribution. I explored alternatives and ultimately **ported the Misaki phonemizer from Python to Rust**, enabling native integration.

While phonemization is not perfect—largely due to Misaki’s dependency on SpaCy, which has no Rust equivalent—it is reliable enough for practical use. Current limitations stem from weaker POS tagging and tokenization alternatives in the Rust ecosystem.

---

### ePub Parsing

ePub files are ZIP archives with a defined structure and support for rich media. I implemented full parsing of text content, metadata, and structure, including **SMIL-based text–audio synchronization**, allowing accurate alignment between narration and content.

---

### Performance & Hardware Acceleration

Although Kokoro is one of the smallest viable offline TTS models, resource usage remains a challenge. On macOS, I was unable to achieve reliable GPU or NPU acceleration across multiple frameworks (**MLX, PyTorch MPS, Candle, CoreML, Burn, Tract**) due to unsupported operations. As a result, inference currently runs on CPU.

---

## UI & UX

The UI was designed to be simple, distraction-free, and accessible. The focus is on quickly importing an ePub, generating audio, and listening—without unnecessary configuration or friction.

---

## Known Issues & Future Improvements

- Imperfect phonemization due to limited NLP tooling in Rust  
- High CPU usage during TTS generation  
- Lack of hardware acceleration on macOS  

Despite these limitations, AuroraBook already fulfills its core goal: making books easier to consume, anywhere, without relying on cloud services.