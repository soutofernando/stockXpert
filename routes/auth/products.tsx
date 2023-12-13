import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "../_middleware.ts";
import ProductsList from "../../islands/ProductsList.tsx";

export const handler: Handlers<any, State> = {
  async GET(_req, ctx) {
    const { data, error } = await ctx.state.supabaseClient.from("Stock").select(
      "*",
    );
    const headers = new Headers();
    let redirect = "/";
    if (error) {
      redirect = `/register_product?error=${error.message}`;
    }

    headers.set("location", redirect);
    return await ctx.render({ data });
  },

  async PATCH(req, ctx) {
    try {
      const updateFilds = await req.json();
      const { error } = await ctx.state.supabaseClient
        .from("Stock")
        .update(updateFilds)
        .eq("id", updateFilds.id);
      const headers = new Headers();
      const redirect = "/auth/secret";

      if (!error) {
        headers.set("location", redirect);
      }

      return new Response(null, {
        status: 200,
        headers,
      });
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  },
  async DELETE(req, ctx) {
    try {
      const id = await req.json();
      const { error } = await ctx.state.supabaseClient
        .from("Stock")
        .delete()
        .eq("id", id);
      const headers = new Headers();
      const redirect = "/auth/secret";

      if (!error) {
        headers.set("location", redirect);
      }

      return new Response(null, {
        status: 200,
        headers,
      });
    } catch (error) {
      return new Response(null, { status: 500 });
    }
  },
};

export default function products(props: PageProps) {
  return <ProductsList {...props} />;
}
