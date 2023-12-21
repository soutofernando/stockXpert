import Layout from "../../Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "../_middleware.ts";
import PaymentsList from "../../islands/PaymentsList.tsx";

export const handler: Handlers<any, State> = {
  async GET(_req, ctx) {
    const url = new URL(_req.url);
    const queryParams = url.searchParams;
    const valueStart = queryParams.get("month");

    let startDate = "2023-01-01T00:00:00.000Z";
    let endDate = "2024-01-01T00:00:00.000Z";

    if (valueStart) {
      const monthNumber = parseInt(valueStart);
      startDate = new Date(
        `2023-${
          monthNumber < 10 ? `0${monthNumber}` : monthNumber
        }-01T00:00:00.000Z`,
      ).toISOString();

      const nextMonth = monthNumber !== 12 ? monthNumber + 1 : 1;
      endDate = new Date(
        `202${monthNumber == 12 ? 4 : 3}-${nextMonth < 10 ? `0${nextMonth}` : nextMonth}-01T00:00:00.000Z`,
      ).toISOString();
    } else {
      const { data: allData, error: allError } = await ctx.state.supabaseClient
        .from("Payments")
        .select("*");

      if (allError) {
        throw allError;
      }

      let subtotal = 0;

      if (allData && allData.length > 0) {
        subtotal = allData.reduce(
          (acc: number, curr: any) => acc + curr.value,
          0,
        );
      }

      return ctx.render({ data: allData, subtotal: subtotal });
    }

    const { data, error } = await ctx.state.supabaseClient
      .from("Payments")
      .select()
      .gte("created_at", startDate)
      .lt("created_at", endDate);

    if (error) {
      throw error;
    }

    let subtotal = 0;
    let errorMessage = "";

    if (data && data.length > 0) {
      subtotal = data.reduce((acc: number, curr: any) => acc + curr.value, 0);
    } else {
      
      errorMessage = "Não há dados disponíveis para o mês selecionado.Por favor, selecione outro mês.";
    }

    return ctx.render({ data, subtotal, errorMessage });
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
