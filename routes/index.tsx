import NavBar from "../components/header/NavBar.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "./_middleware.ts";

export const handler: Handlers<any, State> = {
  GET(_req, ctx) {
    return ctx.render({ ...ctx.state });
  },
};

export default function Home(props: PageProps) {
  return (
    <div>
      <NavBar />
      {props.data.token
        ? <a href="/auth/dashboard">Dashboard</a>
        : "Voce não está logado"}
    </div>
  );
}
