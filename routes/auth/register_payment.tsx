import { Handlers } from "$fresh/server.ts";
import type { State } from "../_middleware.ts";
import Layout from "../../Layout.tsx";
import RegisterPayment from "../../components/payment/RegisterPayment.tsx";

export const handler: Handlers<any, State> = {
  async POST(_req, ctx) {
    const form = await _req.formData();
    const description = form.get("description");
    const value = form.get("value");
    const status = "completo";
    const payment = {
      description: description,
      value: value,
      status: status,
    };

    const { error } = await ctx.state.supabaseClient.from("Payments").insert([
      payment,
    ]);

    const headers = new Headers();
    let redirect = "/auth/payments";
    if (error) {
      redirect = `/auth/payments?error=${error.message}`;
    }

    headers.set("location", redirect);
    return new Response(null, { status: 303, headers });
  },
};

export default function Greet() {
  return (
    <Layout>
      <RegisterPayment />
    </Layout>
  );
}
