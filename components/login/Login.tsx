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
            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full mt-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login In
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Não tem conta ainda?{" "}
          <a
            href="/signup"
            class="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Criar uma
          </a>
        </p>
      </form>
    </div>
  );
}
