/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "SVG Gen & Edit",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        href: "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
        rel: "stylesheet",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['"Chakra Petch"', 'sans-serif'],
              mono: ['"JetBrains Mono"', 'monospace'],
            },
            colors: {
              background: '#050505',
              surface: '#0f0f11',
              'surface-highlight': '#18181b',
              primary: '#FFB800', // Amber
              'primary-dim': '#4d3800',
              secondary: '#27272a',
              border: '#27272a',
              'tech-text': '#e4e4e7',
              'tech-dim': '#71717a',
            },
            backgroundImage: {
              'grid-pattern': "radial-gradient(circle, #27272a 1px, transparent 1px)",
              'scanlines': "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
            },
            animation: {
              'scan': 'scan 8s linear infinite',
              'blink': 'blink 1s step-end infinite',
            },
            keyframes: {
              scan: {
                '0%': { backgroundPosition: '0 0' },
                '100%': { backgroundPosition: '0 100%' },
              },
              blink: {
                '0%, 100%': { opacity: '1' },
                '50%': { opacity: '0' },
              }
            }
          }
        }
      }
          `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
      body {
        background-color: #050505;
        color: #e4e4e7;
        font-family: 'Chakra Petch', sans-serif;
        overflow: hidden;
      }

      /* Tech Grid Background */
      .bg-tech-grid {
        background-image:
          linear-gradient(rgba(39, 39, 42, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(39, 39, 42, 0.2) 1px, transparent 1px);
        background-size: 24px 24px;
      }

      /* Dot Grid */
      .bg-dot-grid {
        background-image: radial-gradient(rgba(113, 113, 122, 0.2) 1px, transparent 1px);
        background-size: 16px 16px;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #09090b;
      }
      ::-webkit-scrollbar-thumb {
        background: #27272a;
        border-radius: 0;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #FFB800;
      }

      /* Corner Borders Utility */
      .corner-border {
        position: relative;
      }
      .corner-border::before, .corner-border::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        border-color: #FFB800;
        border-style: solid;
        transition: all 0.3s ease;
        pointer-events: none;
      }
      .corner-border::before {
        top: -1px;
        left: -1px;
        border-width: 1px 0 0 1px;
      }
      .corner-border::after {
        bottom: -1px;
        right: -1px;
        border-width: 0 1px 1px 0;
      }

      .corner-border-hover:hover::before, .corner-border-hover:hover::after {
        width: 100%;
        height: 100%;
        border-color: #FFB800;
        opacity: 0.1;
      }

      /* React Split Pane Styles */
      .Resizer {
        background: transparent;
        opacity: 1;
        z-index: 30; /* Higher than content to ensure grab */
        box-sizing: border-box;
        background-clip: padding-box;
        transition: all 0.2s ease;
        position: relative;
      }

      .Resizer:hover {
        border-color: #FFB800;
      }

      /* Techy Handle Graphic - Centered Visual indicator */
      .Resizer::after {
        content: "";
        position: absolute;
        background-color: #3f3f46; /* zinc-700 */
        border-radius: 99px;
        transition: background-color 0.2s;
        pointer-events: none; /* Let clicks pass through the visual handle if needed, though parent captures */
      }
      .Resizer:hover::after {
        background-color: #FFB800;
      }

      .Resizer.vertical {
        width: 12px;
        margin: 0 -5px; /* Negative margin to center hit area */
        cursor: col-resize;
        border-left: 1px solid rgba(39, 39, 42, 0);
        border-right: 1px solid rgba(39, 39, 42, 0);
      }

      /* Visual guide on hover */
      .Resizer.vertical:hover {
        border-left: 1px solid rgba(255, 184, 0, 0.3);
        border-right: 1px solid rgba(255, 184, 0, 0.3);
        background: rgba(255, 255, 255, 0.02);
      }

      .Resizer.vertical::after {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 24px;
        width: 4px;
      }

      .Resizer.horizontal {
        height: 12px;
        margin: -5px 0;
        cursor: row-resize;
        border-top: 1px solid rgba(39, 39, 42, 0);
        border-bottom: 1px solid rgba(39, 39, 42, 0);
        width: 100%;
      }

      .Resizer.horizontal:hover {
        border-top: 1px solid rgba(255, 184, 0, 0.3);
        border-bottom: 1px solid rgba(255, 184, 0, 0.3);
        background: rgba(255, 255, 255, 0.02);
      }

      .Resizer.horizontal::after {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 4px;
      }
          `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
