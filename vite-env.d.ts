/// <reference types="vite/client" />

interface ImportMetaEnv {
  // NEVER expose API keys with VITE_ prefix - they will be bundled into client code
  // readonly VITE_GEMINI_API_KEY: string; // REMOVED - server-side only
  // readonly VITE_JSONBIN_API_KEY: string; // REMOVED - server-side only
  readonly VITE_JSONBIN_BIN_ID: string;
  readonly VITE_JSONBIN_BIN_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
