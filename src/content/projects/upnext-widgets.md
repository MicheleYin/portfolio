---
title: Upnext Widgets
description: >-
  Upnext Widgets is an app to remind you of important events or dates.
image: '@assets/projects/upnext-widgets/upnext-widgets.png'
startDate: 2026-03
skills:
  - Swift
  - SwiftUI
downloadLink: https://apps.apple.com/it/app/upnext-widgets/id6759831729"

---
## About Upnext Widgets

Upnext Widgets is a **mobile application** for people that procrastinate or have a hard time to remember important dates.

The app is built with **Swift and SwiftUI**.

---

## Core Features

### Widgets

- Clean and customizable widgets

## Purpose & Impact

The goal of this app was to create an app to remind me of important events from my calendar. I found out that the default calendar app did not suffice for my needs as it can't track events that are far in the future. 

---

## Tech Stack

- **Swift** – Apple proprietary programming language
- **SwiftUI** – Apple's UI framework for building applications on Apple platforms

### Why Swift and SwiftUI?

Swift and SwiftUI are Apple's native frameworks for building applications on Apple platforms. They are a good choice for building applications on Apple platforms because they are a good choice for building applications on Apple platforms. They are also the only way to write Widgets.

---

## Technical Challenges

### Analog Clock with real time seconds hands

Aside reading and write to my own calendar, which is easy enough, the main challenge was to create an analog clock with a real time seconds hand.

This is not technically possible with SwiftUI as Apple only allows widgets to update up to certain frequency. If it detects that an application is using too much power or resources it will forcefully reduce its update frequency.

To solve this I used a `.timer` date style, that allows for seconds to be displayed in real time. However this works only for digital clock styles. I wanted an analog style.

Therefore I created a custom font, with ligatures for all digits from `00` to `59`. In this font I inserted my custom seconds hands rotated by the corresponding number of degrees.

Then in the main app I applied by custom font.


---

### UI & UX

The UI uses default components from SwiftUI, minimizing the learning curve and allowing for a clean and modern look, while also reducing my effort.

---

## Known Issues & Limitations

- Not many widgets 
- Sometimes iOS can reduce the update frequency of the widgets resulting in clock times that are not synced