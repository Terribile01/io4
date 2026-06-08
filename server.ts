import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser for processing custom strategy request structures
  app.use(express.json());

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Proxy for local development of /api/audit
  app.post("/api/audit", async (req, res) => {
    try {
      // In development, we can try to load the local handler or just mock it
      // Since it's a serverless function, for local dev we can just import it if using tsx
      const { default: auditHandler } = await import("./api/audit.js").catch(() => import("./api/audit.ts"));
      await auditHandler(req as any, res as any);
    } catch (err) {
      console.error("Local audit proxy error:", err);
      res.status(500).json({ error: "Failed to run local audit handler" });
    }
  });

  // Middleware to ensure API requests receive JSON errors
  app.use("/api/*", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  });


  // API 404 handler - also before Vite to prevent HTML responses for missing API endpoints
  app.all("/api/*", (req, res) => {
    res.status(404).json({
      error: "ENDPOINT_NON_TROVATO",
      message: `L'endpoint ${req.originalUrl} non esiste.`,
    });
  });

  // Vite development vs production asset serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Ensure API routes are handled BEFORE Vite's SPA fallback
    // But we need to be careful with the order
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global API Error handler
  app.use("/api/*", (err: any, req: any, res: any, next: any) => {
    console.error("API Error Handler:", err);
    res.status(err.status || 500).json({
      error: "ERRORE_API",
      message: err.message || "Si è verificato un errore imprevisto.",
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Faciilissimo Web Server] Running on port ${PORT}`);
  });
}

startServer();
