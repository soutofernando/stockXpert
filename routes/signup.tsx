import SignUp from "../components/signup/SignUp.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "./_middleware.ts";

export const handler: Handlers<any, State> = {
  async POST(_req, ctx) {
    const form = await _req.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const { error } = await ctx.state.supabaseClient.auth.signUp({
      email,
      password,
    });

    const headers = new Headers();

    let redirect = "/";
    if (error) {
      redirect = `/signup?error=${error.message}`;
    }

    headers.set("location", redirect);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function Greet(props: PageProps) {
  return <SignUp {...props} />;
}
