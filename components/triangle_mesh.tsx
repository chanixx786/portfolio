"use client";

import { useEffect, useRef } from "react";
import { Delaunay } from "d3-delaunay";

type Node = { x: number; y: number; vx: number; vy: number };

const VIOLET = "#a855f7";
const BLACK = "#000";
const RADIUS = 0; // corner radius of the contact footer box
const SPEED = 0.3;

// Draws triangles, links and nodes in one color
function drawMesh(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  triangles: Uint32Array,
  color: string,
  triAlpha: number,
  linkDistance: number,
) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  // Triangle faces
  ctx.globalAlpha = triAlpha;
  for (let i = 0; i < triangles.length; i += 3) {
    const a = nodes[triangles[i]],
      b = nodes[triangles[i + 1]],
      c = nodes[triangles[i + 2]];
    const maxEdge = Math.max(
      Math.hypot(a.x - b.x, a.y - b.y),
      Math.hypot(b.x - c.x, b.y - c.y),
      Math.hypot(c.x - a.x, c.y - a.y),
    );
    if (maxEdge > linkDistance * 1.5) continue; // skip huge edge-of-screen faces
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.closePath();
    ctx.fill();
  }

  // Links
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < linkDistance) {
        ctx.globalAlpha = (1 - d / linkDistance) * 0.35;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Nodes
  ctx.globalAlpha = 0.6;
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

export function PlexusBackground({
  count = 60,
  linkDistance = 140,
}: {
  count?: number;
  linkDistance?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0,
      h = 0,
      raf = 0;
    let nodes: Node[] = [];
    let dark = false;
    let themeColor = "#000"; // light-mode mesh color, read from text-foreground

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }));
    };

    // Black box behind the contact footer, with a violet mesh clipped inside it
    const paintContactBox = (triangles: Uint32Array) => {
      const el = document.getElementById("contact");
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= h) return;

      ctx.save();
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(r.left, r.top, r.width, r.height, RADIUS);
      else ctx.rect(r.left, r.top, r.width, r.height);
      ctx.fillStyle = BLACK;
      ctx.fill();
      ctx.clip();
      drawMesh(ctx, nodes, triangles, VIOLET, 0.12, linkDistance);
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      if (dark) {
        ctx.fillStyle = BLACK;
        ctx.fillRect(0, 0, w, h);
      }

      if (!reduceMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      const { triangles } = Delaunay.from(
        nodes,
        (n) => n.x,
        (n) => n.y,
      );

      if (dark) {
        drawMesh(ctx, nodes, triangles, VIOLET, 0.08, linkDistance);
      } else {
        drawMesh(ctx, nodes, triangles, themeColor, 0.05, linkDistance);
        paintContactBox(triangles);
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    // Runs on load and whenever the dark class is toggled on <html>
    const syncTheme = () => {
      dark = root.classList.contains("dark");
      themeColor = getComputedStyle(canvas).color;
      if (reduceMotion) draw(); // no animation loop, so redraw manually
    };

    resize();
    syncTheme();
    draw();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("resize", resize);
    if (reduceMotion) window.addEventListener("scroll", draw, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", draw);
    };
  }, [count, linkDistance]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full text-foreground"
    />
  );
}


// "use client";

// import { useEffect, useRef } from "react";

// type Node = { x: number; y: number; vx: number; vy: number };

// const VIOLET = "#a855f7";
// const BLACK = "#000";
// const RADIUS = 0; // corner radius of the contact footer box
// const SPEED = 0.3;

// // Draws links and nodes in one color
// function drawMesh(
//   ctx: CanvasRenderingContext2D,
//   nodes: Node[],
//   color: string,
//   linkDistance: number,
// ) {
//   ctx.fillStyle = color;
//   ctx.strokeStyle = color;

//   // Links
//   for (let i = 0; i < nodes.length; i++) {
//     for (let j = i + 1; j < nodes.length; j++) {
//       const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
//       if (d < linkDistance) {
//         ctx.globalAlpha = (1 - d / linkDistance) * 0.35;
//         ctx.beginPath();
//         ctx.moveTo(nodes[i].x, nodes[i].y);
//         ctx.lineTo(nodes[j].x, nodes[j].y);
//         ctx.stroke();
//       }
//     }
//   }

//   // Nodes
//   ctx.globalAlpha = 0.6;
//   for (const n of nodes) {
//     ctx.beginPath();
//     ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
//     ctx.fill();
//   }

//   ctx.globalAlpha = 1;
// }

// export function PlexusBackground({
//   count = 60,
//   linkDistance = 140,
// }: {
//   count?: number;
//   linkDistance?: number;
// }) {
//   const ref = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = ref.current!;
//     const ctx = canvas.getContext("2d")!;
//     const root = document.documentElement;
//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     ).matches;

//     let w = 0,
//       h = 0,
//       raf = 0;
//     let nodes: Node[] = [];
//     let dark = false;
//     let themeColor = "#000"; // light-mode color, read from text-foreground

//     const resize = () => {
//       const dpr = Math.min(window.devicePixelRatio || 1, 2);
//       w = canvas.clientWidth;
//       h = canvas.clientHeight;
//       canvas.width = w * dpr;
//       canvas.height = h * dpr;
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       nodes = Array.from({ length: count }, () => ({
//         x: Math.random() * w,
//         y: Math.random() * h,
//         vx: (Math.random() - 0.5) * SPEED,
//         vy: (Math.random() - 0.5) * SPEED,
//       }));
//     };

//     // Black box behind the contact footer, with violet points and lines clipped inside it
//     const paintContactBox = () => {
//       const el = document.getElementById("contact");
//       if (!el) return;
//       const r = el.getBoundingClientRect();
//       if (r.bottom <= 0 || r.top >= h) return;

//       ctx.save();
//       ctx.beginPath();
//       if (ctx.roundRect) ctx.roundRect(r.left, r.top, r.width, r.height, RADIUS);
//       else ctx.rect(r.left, r.top, r.width, r.height);
//       ctx.fillStyle = BLACK;
//       ctx.fill();
//       ctx.clip();
//       drawMesh(ctx, nodes, VIOLET, linkDistance);
//       ctx.restore();
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, w, h);

//       if (dark) {
//         ctx.fillStyle = BLACK;
//         ctx.fillRect(0, 0, w, h);
//       }

//       if (!reduceMotion) {
//         for (const n of nodes) {
//           n.x += n.vx;
//           n.y += n.vy;
//           if (n.x < 0 || n.x > w) n.vx *= -1;
//           if (n.y < 0 || n.y > h) n.vy *= -1;
//         }
//       }

//       if (dark) {
//         drawMesh(ctx, nodes, VIOLET, linkDistance);
//       } else {
//         drawMesh(ctx, nodes, themeColor, linkDistance);
//         paintContactBox();
//       }

//       if (!reduceMotion) raf = requestAnimationFrame(draw);
//     };

//     // Runs on load and whenever the dark class is toggled on <html>
//     const syncTheme = () => {
//       dark = root.classList.contains("dark");
//       themeColor = getComputedStyle(canvas).color;
//       if (reduceMotion) draw(); // no animation loop, so redraw manually
//     };

//     resize();
//     syncTheme();
//     draw();

//     const observer = new MutationObserver(syncTheme);
//     observer.observe(root, { attributes: true, attributeFilter: ["class"] });

//     window.addEventListener("resize", resize);
//     if (reduceMotion) window.addEventListener("scroll", draw, { passive: true });

//     return () => {
//       cancelAnimationFrame(raf);
//       observer.disconnect();
//       window.removeEventListener("resize", resize);
//       window.removeEventListener("scroll", draw);
//     };
//   }, [count, linkDistance]);

//   return (
//     <canvas
//       ref={ref}
//       aria-hidden
//       className="pointer-events-none fixed inset-0 -z-10 h-full w-full text-foreground"
//     />
//   );
// }