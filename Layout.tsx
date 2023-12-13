import NavBar from "./components/header/NavBar.tsx";
import { ComponentChildren } from "https://esm.sh/v128/preact@10.19.2/src/index.js";

export default function Layout(props: { children: ComponentChildren }) {
  return (
    <div id="layout" class="h-screen">
      <NavBar />
      <main>{props.children}</main>
    </div>
  );
}
