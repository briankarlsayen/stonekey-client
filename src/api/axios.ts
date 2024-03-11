import axios from "axios";

const timeoutMs = 10000;

export const instance = axios.create({
  // baseURL: "https://lock-manager-server.fly.dev",
  baseURL: "http://localhost:5020",
  timeout: timeoutMs,
  // signal: abortSignal(timeoutMs),
});
