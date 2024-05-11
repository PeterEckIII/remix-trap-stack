import { createUser } from "~/models/user.server";

describe("User model", () => {
  test("should create a user", async ({ integration }) => {
    const user = await integration.createNormalUser();

    const result = await createUser({
      email: "test@email.com",
      firstName: "Test",
      lastName: "User",
      role: "USER",
    });

    expect(result.email).toBe(user.email);
  });
});
