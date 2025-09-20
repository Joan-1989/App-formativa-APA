/// <reference types="vite/client" />

// FIX: Augment the NodeJS.ProcessEnv interface to add the API_KEY property.
// This avoids redeclaring the global `process` variable, which caused a conflict with
// existing type definitions, resolving both the "subsequent variable declarations"
// and "cannot redeclare block-scoped variable" errors.
declare namespace NodeJS {
    interface ProcessEnv {
        API_KEY: string;
    }
}
