/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />
/// <reference types="vitest" />
import * as integration from "./tests/factory";

declare module "vitest" {
  export interface TestContext {
    request: Request;
    integration: typeof integration;
  }
}
