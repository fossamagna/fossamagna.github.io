import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, getEntry } from "astro:content";
import { getBlogPostOgpImageResponse } from "../../../components/OgpImage";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({ params: { slug: post.id } }));
};

export const GET: APIRoute = async ({ params }) => {
  if (!params.slug) {
    return new Response("not found", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const post = await getEntry("blog", params.slug);

  return getBlogPostOgpImageResponse({
    title: post?.data.title ?? "No title",
  });
};
