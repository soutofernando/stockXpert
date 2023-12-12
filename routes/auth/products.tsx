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
      const body = await req.body;
      console.log(body)      
      const { error } = await ctx.state.supabaseClient
        .from("Stock")
        .update({ product_name: "TEdsdSTE" })
        .eq("id", 3);

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
      console.error("Erro:", error.message);
      // Você pode querer retornar um código de erro ou fazer um tratamento apropriado aqui
      return new Response(null, { status: 500 });
    }
  },
};

export default function products(props: PageProps) {
  return <ProductsList {...props} />;
}
