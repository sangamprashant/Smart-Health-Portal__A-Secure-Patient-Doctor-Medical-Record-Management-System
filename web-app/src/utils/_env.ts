const rawServerUrl =
  (import.meta.env.VITE_SERVER_URL as string | undefined) ||
  "http://localhost:5000/api";

const _env = {
  SERVER_URL: rawServerUrl.endsWith("/api")
    ? rawServerUrl
    : `${rawServerUrl.replace(/\/$/, "")}/api`,
};

export default _env;
