import Login from "../components/login/Login.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "./_middleware.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers<any, State> = {
  async POST(_req, ctx) {
    const form = await _req.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const { data, error } = await ctx.state.supabaseClient.auth
      .signInWithPassword({ email, password });
    const headers = new Headers();

    if (data.session) {
      setCookie(headers, {
        name: "supaLogin",
        value: data.session?.access_token,
        maxAge: data.session.expires_in,
      });
    }

    let redirect = "/";
    if (error) {
      redirect = `/login?error=${error.message}`;
    }

    headers.set("location", redirect);
    return new Response(null, { status: 303, headers });
  },
};

export default function Greet(props: PageProps) {
  return <Login {...props} />;
}
