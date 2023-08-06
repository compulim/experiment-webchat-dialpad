# Dial pad input for Web Chat

> Live demo at https://compulim.github.io/experiment-webchat-dialpad/.

Add dial pad to Web Chat with heavy focus on UX and mimicking real telephone.

## Features

- Dial pad in 3x4 format, with rubies
- Play DTMF using Web Audio API
   - Realistic cross bar approach when playing DTMF
- Pointer down on button will send immediately, just like a real telephone

## To-do

- Features
   - Disable DTMF for certain inputs: no DTMF on mouse, and/or no DTMF on all types of input
   - Add minimal DTMF duration: after click, must play at least 100 ms (configurable)
- Bugs
   - Investigate why stylus tap is slow on Edge
