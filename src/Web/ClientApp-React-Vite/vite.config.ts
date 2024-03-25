import { defineConfig, loadEnv } from "vite";
import fs from "fs";
import type { ServerOptions } from "https";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Determine the target for the proxy
  const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(";")[0]
    : "https://localhost:5001";

  // Proxy configuration
  const proxyConfig = {
    "/api": { target, changeOrigin: true, secure: false },
    "/Identity": { target, changeOrigin: true, secure: false },
    "/weatherforecast": { target, changeOrigin: true, secure: false },
    "/WeatherForecast": { target, changeOrigin: true, secure: false },
    // Additional paths as needed
  };

  // Initialize server configuration
  const serverConfig: {
    proxy: typeof proxyConfig;
    port: number;
    https?: ServerOptions;
  } = {
    proxy: proxyConfig,
    port: env.PORT ? parseInt(env.PORT, 10) : 3000,
  };

  // Only add HTTPS configuration if certificate and key paths are provided
  if (env.SSL_CRT_FILE && env.SSL_KEY_FILE) {
    serverConfig.https = {
      key: fs.readFileSync(env.SSL_KEY_FILE),
      cert: fs.readFileSync(env.SSL_CRT_FILE),
    };
  }

  return {
    server: serverConfig,
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    // Other Vite configuration options as needed
  };
});
