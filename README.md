# Identity Hub

A cinematic single-page site exploring how personal data is collected and shared, built with Three.js for the 3D scene work and Chart.js for the data panels.

The point of the project was to find out how far a static page can be pushed before it needs a framework: scroll-driven camera movement, a WebGL background that stays readable behind text, and charts that stay legible on a phone.

## Built with

* Three.js — WebGL scene, camera and lighting
* Chart.js — data visualisation panels
* Vite — dev server and build
* Vanilla JavaScript, HTML and CSS

## Running it locally

```bash
npm install
npm run dev
```

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Landing experience |
| `dashboard.html` | Data dashboard view |
| `three-app.js` | Scene setup, camera and animation loop |
| `script.js` | Page interactions and chart wiring |
| `style.css` | Layout and type |
