import Layout from "../../Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "../_middleware.ts";
import PaymentsList from "../../islands/PaymentsList.tsx";

export const handler: Handlers<any, State> = {
  async GET(_req, ctx) {
    const { data } = await ctx.state.supabaseClient.from("Payments")
      .select("*");
    const subtotal = data?.reduce((acc: number, curr: any) => acc + curr.value, 0);

    return ctx.render({data, subtotal});
  },

  async PATCH(req, ctx) {
    try {
      const updateFilds = await req.json();
      const { error } = await ctx.state.supabaseClient
        .from("Payments")
        .update(updateFilds)
        .eq("id", updateFilds.id);
      const headers = new Headers();
      const redirect = "/auth/payments";

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

export default function payments(props: PageProps) {
  return (
    <Layout>
      <PaymentsList {...props} />
    </Layout>
  );
}
