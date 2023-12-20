import Layout from "../../Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "../_middleware.ts";
import PaymentsList from "../../islands/PaymentsList.tsx";

export const handler: Handlers<any, State> = {
  async GET(_req, ctx) {
    // const body = _req.json();
    const { data } = await ctx.state.supabaseClient.from("Payments")
      .select("*");
    const subtotal = data?.reduce(
      (acc: number, curr: any) => acc + curr.value,
      0,
    );

    const startDate = new Date(`2023-11-01T00:00:00.000Z`).toISOString();
    const endDate = new Date(`2023-12-01T00:00:00.000Z`).toISOString();

    try {
      const { data, error } = await ctx.state.supabaseClient
        .from("Payments")
        .select()
        .gte("created_at", startDate) // Início do mês
        .lt("created_at", endDate); // Início do próximo mês

      if (error) {
        throw error;
      }

      if (data) {
        console.log("Dados do mês:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error.message);
    }

    return ctx.render({ data, subtotal });
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
