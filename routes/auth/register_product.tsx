import RegisterProduct from "../../components/product/RegisterProduct.tsx";
import { Handlers } from "$fresh/server.ts";
import type { State } from "../_middleware.ts";
import Layout from "../../Layout.tsx";

export const handler: Handlers<any, State> = {
  async POST(_req, ctx) {
    const form = await _req.formData();
    const productName = form.get("productName");
    const description = form.get("description");
    const quantity = form.get("quantity");
    const entry = 0;
    const exit = 0;
    const product = {
      product_name: productName,
      description: description,
      quantity: quantity,
      entry: entry,
      exit: exit,
    };

    const { error } = await ctx.state.supabaseClient.from("Stock").insert([
      product,
    ]);

    const headers = new Headers();
    let redirect = "/";
    if (error) {
      redirect = `/register_product?error=${error.message}`;
    }

    headers.set("location", redirect);
    return new Response(null, { status: 303, headers });
  },
};

export default function Greet() {
  return (
    <Layout>
      <RegisterProduct />
    </Layout>
  );
}
