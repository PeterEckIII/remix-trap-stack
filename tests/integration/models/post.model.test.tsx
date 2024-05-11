import { createPost, getPost } from "~/models/post.server";

describe("Post model", () => {
  test("should create a post", async ({ integration }) => {
    const user = await integration.createNormalUser();
    const result = await createPost({
      title: "Test Post",
      content: "This is a test post",
      published: true,
      authorId: user.id,
    });

    expect(result.authorId).toBe(user.id);
  });
  test("should get a post", async ({ integration }) => {
    const user = await integration.createNormalUser();
    const post = await createPost({
      title: "Test Post",
      content: "This is a test post",
      published: true,
      authorId: user.id,
    });

    const result = await getPost(post.id);

    expect(result?.title).toBe(post.title);
  });
});
