import type { LoaderFunction } from "@remix-run/node";

import { prisma } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  try {
    const url = new URL(`http://localhost:${process.env.PORT ?? 3000}`);
    // If we cannot connect to the DB and make a simply query
    // and make a HEAD request ourselves, then we are good to go
    await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((res) => {
        if (!res.ok) {
          return Promise.reject(res);
        }
      }),
    ]);
    return new Response("OK");
  } catch (error: unknown) {
    console.log(`healthcheck ❌: ${error}`);
    return new Response("ERROR", { status: 500 });
  }
};
