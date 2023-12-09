import Icon from "../../components/ui/Icon.tsx";

const links = [
  { text: "Login", href: "/login" },
  { text: "Sobre Nós", href: "/sobre" },
];

export default function NavBar() {
  return (
    <div class="flex flex-row justify-center items-center">
      <a href="/">
        <Icon id="Logo" class="w-44 h-[40px]" />
      </a>
      <ul class="flex flex-row">
        {links.map((link) => (
          <li class="p-4">
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
