---
title: AuroraBook
description: >-
  Audio book generator. Converts any ePub file into an audio book using AI.
image: '@assets/projects/aurorabook/aurorabook.png'
startDate: 2025-10
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
## System Architecture

AuroraBook follows a **frontend-backend separation** model within a single desktop application, leveraging Tauri's IPC bridge:

### High-Level Architecture

```
┌─────────────────────────────────────────┐
│  React Frontend (User Interface)        │
│  - File import and selection            │
│  - Progress tracking and playback       │
│  - Settings and export configuration    │
└────────────────┬────────────────────────┘
                 │ Tauri IPC Bridge
                 ↓
┌─────────────────────────────────────────┐
│  Rust Backend (Processing Engine)       │
│  - ePub parsing and text extraction     │
│  - TTS inference pipeline               │
│  - Audio encoding and export            │
└─────────────────────────────────────────┘
```

The frontend handles UI interactions and visualization, while the Rust backend performs all CPU/GPU-intensive operations. This separation ensures the UI remains responsive even during heavy processing.

### Processing Pipeline

The conversion process follows a structured, multi-stage pipeline:

1. **ePub Ingestion** → Unzip and parse ePub metadata, structure, and content
2. **Text Extraction** → Extract chapter text while preserving structure and metadata
3. **Phonemization** → Convert text to phonemes using Supertonic's built-in phonemizer
4. **TTS Inference** → Generate audio embeddings and waveforms using ONNX model
5. **Audio Encoding** → Process raw audio into final format (MP3, M4A, MP4)
6. **Export** → Package audio with metadata and deliver to user

Each stage is optimized for performance, with intelligent caching and batch processing where possible.

### CPU vs GPU Processing

**GPU Acceleration (WebGPU):**

The TTS inference stage is the computational bottleneck. Modern ONNX runtimes support **WebGPU**, a low-level graphics API that enables efficient GPU utilization across platforms:

- **macOS** – Metal backend (Apple Silicon optimization)
- **Windows** – DirectX 12 backend
- **Linux** – Vulkan backend

WebGPU provides a unified abstraction over platform-specific GPU APIs, allowing the same Rust code to leverage hardware acceleration consistently without requiring platform-specific implementations.

**CPU Fallback:**

While GPU acceleration provides dramatic speedups (3-8x faster than CPU on consumer hardware), the system gracefully falls back to CPU processing when:
- GPU memory is insufficient
- GPU drivers lack WebGPU support
- User hardware lacks a dedicated GPU (older systems)

This ensures broad compatibility across different hardware configurations.

**Processing Distribution:**

- **GPU-bound**: TTS inference (phoneme → audio waveform generation)
- **CPU-bound**: ePub parsing, text extraction, phonemization, audio encoding

By offloading the most expensive operation (inference) to GPU, the system achieves significant speedup while keeping the pipeline feed-forward without GPU memory bottlenecks.

### Data Flow & Caching Strategy

To maintain responsiveness across multiple operations:

**Metadata Caching** – ePub metadata is cached in SQLite after first parse, avoiding re-parsing on subsequent opens

**Memory-Backed Archives** – Unzipped ePub contents are held in memory with an LRU eviction policy. When the user switches books, old data is cleared and new data is loaded once

**Audio Asset Streaming** – Generated audio is streamed directly to disk during encoding, avoiding the need to hold entire audiobooks in memory

**Processing Queue** – Chapter processing is parallelized where possible, with multiple inference tasks queued and executed in GPU batches for throughput optimization

This architecture prioritizes responsiveness—the UI never blocks during processing, and users receive immediate feedback as audio generation progresses.

### Model Bundling & Deployment

Rather than requiring separate model downloads, AuroraBook bundles the Supertonic model weights directly within the application binary. This approach provides several critical advantages:

- **Single installer** – Users download one file with everything included; no additional setup steps
- **Guaranteed compatibility** – The exact model version is tied to the app version, eliminating version mismatch issues
- **Offline-first** – Users can run the app immediately after installation without fetching external resources
- **Reduced attack surface** – No external dependencies mean fewer security vectors

The trade-off is a larger app size (~300-400 MB), but this is acceptable for a specialized productivity tool. The bundled weights ensure the app is truly self-contained and works seamlessly across different network conditions.

---
## Technical Challenges

### AI Text-to-Speech & Phonemization

The latest version uses **Supertonic 3** TTS model. After extensive experimentation with **Kokoro ONNX**, I switched to Supertonic for several key advantages:

- **Built-in phonemization** – Kokoro sacrifices phonemization for speed and portability, while Supertonic handles it natively
- **Multilingual support** – Better support for multiple languages out of the box
- **WebGPU optimization** – Superior performance on WebGPU acceleration

Earlier versions used Kokoro with eSpeak phonemization, which required extensive effort porting missing Python packages to Rust. Supertonic eliminated this complexity while improving quality and performance. 

---

### ePub Parsing

ePub files are ZIP archives with structured metadata and rich media support. I implemented comprehensive parsing of text content, metadata, and structure, including **SMIL-based text–audio synchronization** for precise alignment between narration and content.

For responsive performance, I designed a smart caching strategy using SQLite. Rather than repeatedly compressing and decompressing the ePub archive, I store metadata in the database while keeping heavy assets (audio, images) on disk. During processing, I unzip the book once and maintain the unzipped files in memory until the user opens a different book, at which point the cache is replaced. This minimizes computational overhead while maintaining responsiveness.

---

### Performance & Hardware Acceleration

Offline TTS is computationally expensive, even with optimized models. During development, I experimented with GPU acceleration on macOS across multiple frameworks (**MLX, PyTorch MPS, Candle, CoreML, Burn, Tract**), but encountered unsupported operations that made reliable acceleration difficult.

The current version leverages **WebGPU acceleration**, which provides efficient GPU utilization across platforms while maintaining compatibility and stability. This dramatically improves inference speed and reduces battery drain on consumer hardware.

---

## UI & UX

The interface prioritizes simplicity and accessibility. The workflow is intentionally streamlined: import an ePub, generate audio, and listen—no unnecessary configuration or friction.

The app supports multiple export formats (MP4, MP3, M4A) using platform-specific FFmpeg binaries to ensure quality and compatibility across macOS and Windows.

---

## Platform Strategy

### Why macOS?

Apple Silicon (M-series chips) provided a crucial advantage: a consistent hardware baseline. Unlike Windows, where CPU/GPU combinations vary widely across vendors and configurations, Apple Silicon allowed me to optimize performance predictably. This baseline ensures users get reliable, efficient inference without needing to support countless hardware permutations.

### Why Windows?

The Windows release (both ARM64 and x86-64) extends accessibility to the broader user base. Despite the hardware variability challenge, supporting Windows was essential for reaching users outside the Apple ecosystem.

## Market Context

When AI-generated audiobook content started flooding YouTube Shorts, it became clear that TTS technology had matured to the point of being viable for mass-market applications. This meant the computational cost had become affordable, and the infrastructure existed to support it.

Audiobooks and podcasts are experiencing rapid growth, and many readers prefer listening over traditional reading. AuroraBook fills a genuine gap: free, offline, privacy-preserving access to audiobook conversion—something proprietary services don't offer.

## What's Next

Despite the technical challenges, AuroraBook already achieves its core mission: making books more accessible, anywhere, without requiring cloud services or subscriptions. The foundation is solid, and the path forward involves continued optimization and community feedback.