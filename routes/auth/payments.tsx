import Layout from "../../Layout.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "../_middleware.ts";
import { formatPrice } from "../../sdk/format.ts";

export const handler: Handlers<any, State> = {
  async GET(_req, ctx) {
    const { data, error } = await ctx.state.supabaseClient.from("Payments")
      .select("*");

    return ctx.render(data);
  },
};

export default function payments(props: PageProps) {
  const { data } = props;
  const colums = Object.keys(data[0]);

  return (
    <Layout>
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex sm:flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-blueGray-700">
                  Pagamentos
                </h3>
              </div>
              <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  class="focus:outline-none text-center max-w-[200px] mt-4 sm:mt-0 hover:bg-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out bg-black rounded text-white px-8 py-2 text-sm"
                  type="button"
                >
                  Registrar Pagamento
                </button>
              </div>
            </div>
          </div>

          <div class="block w-full overflow-x-auto">
            <table class="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  {colums.map((colum) => (
                    <th class="px-6 bg-gray-100 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      {colum}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row) => (
                  <tr>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      {row.id}
                    </th>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                      {row.description}
                    </td>
                    <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {formatPrice(row.value)}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.status}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.created_at}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
