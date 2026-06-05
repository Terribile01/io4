import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
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

  // Middleware to ensure API requests receive JSON errors
  app.use("/api/*", (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    next();
  });

  // Import the audit handler for local development proxy
  const auditHandler = (await import("./api/audit")).default;

  // Secured Gemini API Proxy for the Lead Generation strategy builder
  // We place this BEFORE Vite middleware to ensure it's not caught by SPA fallback
  app.post("/api/audit", auditHandler);

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
