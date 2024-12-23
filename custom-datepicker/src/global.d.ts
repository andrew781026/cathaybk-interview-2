export {};

// __COMMIT_HASH__ come from vite.config.js define
declare global {
  interface Window {
    __COMMIT_HASH__: string;
  }
}
