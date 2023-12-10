import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "../_middleware.ts";
import ListProducts from "../../components/product/ListProducts.tsx";

export const handler: Handlers<any, State> = {
   async GET(_req, ctx){
    const {data, error} = await ctx.state.supabaseClient.from("Stock").select("*")
    const headers = new Headers();
    let redirect = "/";
    if (error) {
      redirect = `/register_product?error=${error.message}`;
    }

    headers.set("location", redirect);
    return ctx.render({data})
   }
  };

export default function Greet (props: PageProps) {
    return <ListProducts {...props} />
}