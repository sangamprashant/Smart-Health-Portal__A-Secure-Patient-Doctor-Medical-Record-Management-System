import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   server: {
    host: true,
    https: {
      key: fs.readFileSync("smarthealth.local-key.pem"),
      cert: fs.readFileSync("smarthealth.local.pem"),
    },
  },
});
