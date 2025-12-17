import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Security plugin to prevent leaking secrets via VITE_* envs
const envSecretGuard = () => {
  return {
    name: "env-secret-guard",
    // Include env to detect mode
    config(_userConfig, env) {
      const isProd = env.mode === "production" || process.env.NODE_ENV === "production";
      const runtimeEnv = process.env || {};
      const keys = Object.keys(runtimeEnv).filter((k) => k.startsWith("VITE_"));

      // Publicly allowed VITE_* keys (expand as needed)
      const allowedPublic = new Set([
        "VITE_SUPABASE_URL",
        "VITE_SUPABASE_ANON_KEY",
      ]);

      // Disallowed substrings for sensitive keys
      const blockedPatterns = [
        "SERVICE_ROLE",
        "RESEND",
        "OPENAI",
        "FIRECRAWL",
        "LOVABLE",
        "ELEVENLABS",
        "SENDGRID",
        "AWS",
        "SECRET",
        "API_KEY",
      ];

      const offenders: string[] = [];
      for (const key of keys) {
        if (allowedPublic.has(key)) continue;
        const upper = key.toUpperCase();
        if (blockedPatterns.some((p) => upper.includes(p))) {
          offenders.push(key);
        }
      }

      if (offenders.length > 0) {
        const message =
          `Sensitive env vars must NOT use VITE_ prefix (client-exposed). Found: ${offenders.join(", ")}. ` +
          `Move these to server-only (edge functions) or rename without VITE_.`;

        if (isProd) {
          throw new Error(`Security error: ${message}`);
        } else {
          console.warn(`[env-secret-guard] ${message}`);
        }
      }
    },
  };
};

// Vite config
export default defineConfig({
  plugins: [react(), envSecretGuard()],
  server: {
    port: 5173,
    strictPort: true
  }
});