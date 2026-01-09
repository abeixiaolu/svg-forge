import { IconStyle } from './types';

export const ICON_STYLES: IconStyle[] = [
  {
    id: 'lucide',
    name: 'Lucide / Feather',
    description: 'Clean, simple, 2px stroke, rounded corners (stroke-linecap="round", stroke-linejoin="round"), 24px grid, outline only, no fill. Friendly and modern.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>'
  },
  {
    id: 'tabler',
    name: 'Tabler Icons',
    description: 'Fully customizable, 24px grid, 2px stroke, rounded corners. Very similar to Lucide but with slightly more detail in complex icons.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h6v6h-6z" /><path d="M14 4h6v6h-6z" /><path d="M4 14h6v6h-6z" /><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>'
  },
  {
    id: 'phosphor-regular',
    name: 'Phosphor (Regular)',
    description: 'Phosphor style, Regular weight. 256x256 grid usually (scale to 24px), clean geometric strokes, robust look.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M169.6,152a48.1,48.1,0,0,1-83.2,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="92" cy="108" r="12"/><circle cx="164" cy="108" r="12"/></svg>'
  },
  {
    id: 'phosphor-fill',
    name: 'Phosphor (Fill)',
    description: 'Phosphor style, Filled. Solid shapes, 256x256 grid, no outlines.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path d="M232.4,114.5,183.3,212.7A16.2,16.2,0,0,1,168.9,224H87.1a16.2,16.2,0,0,1-14.4-11.3L23.6,114.5A16.1,16.1,0,0,1,38,96H78V48a16,16,0,0,1,16-16h68a16,16,0,0,1,16,16V96h40A16.1,16.1,0,0,1,232.4,114.5Z" fill="currentColor"/></svg>'
  },
  {
    id: 'phosphor-duotone',
    name: 'Phosphor (Duotone)',
    description: 'Duotone style. Primary outline (stroke) with a secondary semi-transparent fill (opacity 0.2) for the main shape.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><rect x="40" y="40" width="176" height="176" rx="8" opacity="0.2" fill="currentColor"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="176" y1="20" x2="176" y2="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="80" y1="20" x2="80" y2="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>'
  },
  {
    id: 'material-filled',
    name: 'Material (Filled)',
    description: 'Google Material Design (Filled). Geometric, bold, 24px grid, solid filled shapes, sharp or slightly rounded corners.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
  },
  {
    id: 'material-outlined',
    name: 'Material (Outlined)',
    description: 'Google Material Design (Outlined). Geometric, 24px grid, 2px stroke, no fill, generally sharp corners.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>'
  },
  {
    id: 'material-rounded',
    name: 'Material (Rounded)',
    description: 'Google Material Design (Rounded). Similar to Filled but with softened corners on all elements. Friendly appeal.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke-width="0" style="stroke: none;"/></svg>'
  },
  {
    id: 'remix-line',
    name: 'Remix Icon (Line)',
    description: 'Remix Icon style (Line). Neutral, 24px grid, fine lines, generally 1px-2px stroke but often implemented as fills in official set. Generate as STROKES for flexibility.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393C10.237 6.5 13.5 4 13.5 4s3.5 1.5 3.5 5a3 3 0 0 1-1.75 2.666l-.15.089z"/></svg>'
  },
  {
    id: 'remix-fill',
    name: 'Remix Icon (Fill)',
    description: 'Remix Icon style (Fill). Solid, neutral, detailed shapes.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.501 3.501 0 0 0-3.433 2.813l1.962.393A1.5 1.5 0 1 1 12 11.5a1 1 0 0 1-1 1H11v1.5h2V13.355z"/></svg>'
  },
  {
    id: 'carbon',
    name: 'Carbon Icons',
    description: 'IBM Carbon Design. Industrial, technical, 16px or 32px base, sharp corners, precise thin lines. Professional look.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="currentColor"><path d="M16,4A12,12,0,1,1,4,16,12,12,0,0,1,16,4m0-2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Z"/><path d="M12 11H20V13H12zM12 15H20V17H12zM12 19H20V21H12z"/></svg>'
  },
  {
    id: 'fluent-regular',
    name: 'Fluent UI (Regular)',
    description: 'Microsoft Fluent System (Regular). Rounded corners, friendly, 24px grid, approx 1.5px or 2px stroke weight.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M2 12a10 10 0 0 1 10-10"/><path d="M12 22a10 10 0 0 1-10-10"/><path d="M22 12a10 10 0 0 1-10 10"/></svg>'
  },
  {
    id: 'fluent-filled',
    name: 'Fluent UI (Filled)',
    description: 'Microsoft Fluent System (Filled). Solid shapes, rounded corners, friendly.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5a1 1 0 1 1 2 0v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7z"/></svg>'
  },
  {
    id: 'heroicons-outline',
    name: 'Heroicons (Outline)',
    description: 'Heroicons style. 1.5px stroke, 24px grid, detailed but clean, rounded joins.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
  },
  {
    id: 'heroicons-solid',
    name: 'Heroicons (Solid)',
    description: 'Heroicons Solid (Mini). 20px grid, solid fill, no stroke, optimized for smaller sizes.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>'
  },
  {
    id: 'fa-solid',
    name: 'FontAwesome (Solid)',
    description: 'FontAwesome Solid. Heavy, bold, silhouette-based, solid fill, usually on a larger coordinate system (e.g. 512x512) but mapped to 24x24 viewBox.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.5-4.6-16.7-4.7-24.3-.5z"/></svg>'
  },
  {
    id: 'fa-regular',
    name: 'FontAwesome (Regular)',
    description: 'FontAwesome Regular. Outline version of Solid, generally consistent stroke width.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" fill="currentColor"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.5-4.6-16.7-4.7-24.3-.5z"/></svg>'
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap Icons',
    description: 'Bootstrap Icons. Clean, web-oriented, 16px/24px base. Solid and outline mix, but generally filled or thick strokes.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/></svg>'
  },
  {
    id: 'octicons',
    name: 'Octicons (GitHub)',
    description: 'GitHub Octicons. Flat, simple, 16px or 24px, solid shapes or outlines.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1c6.075 0 11 4.925 11 11S18.075 23 12 23 1 18.075 1 12 5.925 1 12 1zM2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12zm5.78-2.53a.75.75 0 0 1 0 1.06L6.56 12l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.25-2.25a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0zm7.44 0a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06z"/></svg>'
  },
  {
    id: 'solar',
    name: 'Solar Icons',
    description: 'Solar Icons. Smooth, soft, rounded shapes, often uses filled shapes with cutouts.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.5"/><path d="M12 16L16 12L12 8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  {
    id: 'entypo',
    name: 'Entypo',
    description: 'Entypo. Bold, clear, solid pictograms. Good for small sizes.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>'
  },
  {
    id: 'zondicons',
    name: 'Zondicons',
    description: 'Zondicons. Geometric, solid, vector-heavy, consistent.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/></svg>'
  },
  {
    id: 'hand-drawn',
    name: 'Hand Drawn',
    description: 'Sketchy, hand-drawn style. Uneven "wiggly" lines, organic shapes, imperfect circles, looks like a doodle.',
    previewSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2.5 2.5 6.5 2 12c.5 5.5 4.5 9.5 10 10 5.5-.5 9.5-4.5 10-10-.5-5.5-4.5-9.5-10-10z"/><path d="M10 8l5 4-5 4"/></svg>'
  }
];