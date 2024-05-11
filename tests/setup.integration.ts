import * as integration from "./factory";

beforeEach((ctx) => {
  ctx.request = new Request("http://localhost:3000");
  ctx.integration = integration;
});
