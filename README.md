# UGN Tank 🐠

**A world beneath the surface.** A free interactive 3D aquarium studio created for Universal Gaming Network, hosted entirely on GitHub Pages.

## Features
- 60+ selectable aquatic creatures with procedural 3D models and swimming animations.
- Five starter worlds: Azure Sanctuary, Coral Kingdom, River Garden, Midnight Abyss, Celestial Sea.
- Four tank shapes and adjustable scale; sand, gravel, volcanic and blush substrates.
- Fourteen types of decorations, plus procedural plants and rocks.
- Customizable water tint, clarity, bubbles, swimming activity, currents, tank glass, lighting and day/night cycles.
- Camera orbit and zoom, inspect creatures and decorations, feed fish, duplicate decorations, Zen mode, pause, performance settings and optional underwater sound.
- Responsive mobile and desktop interface, auto-save to localStorage, JSON import/export and PNG snapshots.

## Publish the website

1. Go to **https://github.com/Universal-Gaming/UGN-Tank/settings/pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose **main**, **/(root)** and **Save**.
4. Once Pages builds, open **https://universal-gaming.github.io/UGN-Tank/**.

## Notes

The site uses Three.js ES modules from jsDelivr and requires a WebGL-capable browser and internet access. There is no backend or shared cloud-save database: your tank saves locally in your browser. Export a JSON backup if you want to move it between devices. Supports up to 110 creatures and 150 manually placed decorations. Creature models are stylized original procedural geometry rather than photorealistic animal scans; aquatic behavior is artistic simulation, not real animal care guidance.

Run locally via `python -m http.server 8000` from the repository folder, then visit `http://localhost:8000`.

**© Universal Gaming Network** — https://universalgaming.us/
