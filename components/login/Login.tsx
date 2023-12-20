import { PageProps } from "$fresh/server.ts";

export default function Login(props: PageProps) {
  return (
    <div class="flex flex-col w-full">
      <form class="mt-10 max-w-[400px] w-full mx-auto border p-5 rounded" method="POST">
        <div>
          <label for="email" class="block mb-2 text-sm font-medium">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label for="password" class="block mb-2 text-sm font-medium">
            Senha
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="border mb-4 border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          class="focus:outline-none text-center max-w-[200px] mt-4 sm:mt-0 hover:bg-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out bg-black rounded text-white px-8 py-2 text-sm"
          >
          Log in
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Não tem conta ainda?{" "}
          <a
            href="/signup"
            class="font-medium text-black hover:underline"
          >
            Criar uma
          </a>
        </p>
      </form>
    </div>
  );
}
