import { Post } from "@prisma/client";
import { prisma } from "../utils/db.server";

export async function createPost(post: Omit<Post, "id">) {
  return await prisma.post.create({ data: post });
}

export async function getPost(id: string) {
  return await prisma.post.findUnique({ where: { id } });
}
