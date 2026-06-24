import type { APIRoute } from "astro";
import { getHomeOgpImageResponse } from "../components/OgpImage";

export const GET: APIRoute = async () => {
  return getHomeOgpImageResponse();
};
