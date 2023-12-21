import { PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import { formatDate, formatPrice } from "../sdk/format.ts";
import Icon from "../components/ui/Icon.tsx";
import { months } from "../components/utils.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function PaymentsList(props: PageProps) {
  const { data } = props;
  const colums = data.data[0] ? Object.keys(data.data[0]) : [];
  const updateStatus = useSignal({});
  const canceledPayments = data.data.filter((payment) =>
    payment.status == "cancelado"
  );
  const total = canceledPayments.reduce(
    (acc: number, curr: any) => acc + curr.value,
    0,
  );

  if (IS_BROWSER) {
    const select = document.getElementById("selectMonth") as HTMLSelectElement;
    select.addEventListener("change", () => {
      const queryParams = new URLSearchParams(window.location.search);
      const selectedMonth = select.value;

      if (queryParams.has("month")) {
        queryParams.set("month", selectedMonth);
      } else {
        queryParams.append("month", selectedMonth);
      }

      const baseUrl = window.location.href.split("?")[0];
      const newUrl = `${baseUrl}?${queryParams.toString()}`;

      window.location.href = newUrl;
    });
  }

  const filterMonth = async () => {
    await fetch("http://localhost:8000/auth/payments", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  };

  const updatePayment = async () => {
    const update = {
      id: updateStatus.value.id,
      status: updateStatus.value.status,
    };

    const response = await fetch("http://localhost:8000/auth/payments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    });

    if (response.ok) {
      window.location.reload();
    }

    return response;
  };

  return (
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        <div class="rounded-t mb-0 sm:px-4 py-3 border-0">
          <div class="flex flex-col items-start sm:flex-row sm:items-center">
            <div class="relative w-full max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-base text-blueGray-700">
                Pagamentos
              </h3>
            </div>
            <a
              href="/auth/register_payment"
              class="focus:outline-none text-center max-w-[200px] mt-4 sm:mt-0 hover:bg-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out bg-black rounded text-white px-8 py-2 text-sm"
            >
              Registrar Pagamento
            </a>
          </div>
          <div class="my-2 flex sm:flex-row flex-col">
            <div class="flex flex-row mb-1 sm:mb-0">
              <div class="relative">
                <select
                  onChange={() => filterMonth()}
                  id="selectMonth"
                  class="appearance-none h-full rounded-l border sm:rounded-r-none sm:border-r-0  block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  {months.map((month) => (
                    <option value={month.value}>{month.month}</option>
                  ))}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="block relative">
              <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>
              <input
                placeholder="Search"
                class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <table class="items-center bg-transparent w-full border-collapse ">
            {data.data[0] && (
              <thead>
                <tr>
                  {colums.map((colum) => (
                    <th class="px-6 bg-gray-100 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      {colum}
                    </th>
                  ))}
                  <th class="px-6 bg-gray-100 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Cancelar Pagamento
                  </th>
                </tr>
              </thead>
            )}
            {data.errorMessage && (
              <span class="text-red-400 px-4">{data.errorMessage}</span>
            )}
            <tbody>
              {data.data.map((row) => (
                <tr>
                  <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                    {row.id}
                  </th>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {row.description}
                  </td>
                  <td
                    class={`${
                      row.status == "cancelado" ? "line-through " : ""
                    } border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-row items-center`}
                  >
                    {formatPrice(row.value)}
                    {row.status == "cancelado"
                      ? <Icon id="ArrowUp" class="w-4 h-4 text-green-500" />
                      : (
                        <Icon
                          id="ArrowDown"
                          class="w-4 h-4 text-red-500 ml-1"
                        />
                      )}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span
                      class={`rounded-xl px-2 py-1 font-medium capitalize ${
                        row.status == "completo" ? "bg-green-400" : "bg-red-400"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {formatDate(row.created_at)}
                  </td>
                  <td class="border-t-0 px-3 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      onClick={() => {
                        updateStatus.value = {
                          id: row.id,
                          value: row.value,
                          status: row.status == "cancelado"
                            ? "completo"
                            : "cancelado",
                        };
                        updatePayment();
                      }}
                      class="flex justify-center w-full"
                    >
                      {row.status == "cancelado"
                        ? <Icon id="ArrowBack" class="w-4 h-4" />
                        : (
                          <Icon
                            id="CicleX"
                            class="w-4 h-4 text-red-400"
                          />
                        )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <span class="text-lg font-normal text-gray-600">
        Subtotal: {formatPrice(data.subtotal)}
      </span>
      <h1 class="text-xl font-semibold text-gray-800">
        Total: {formatPrice(data.subtotal - total)}
      </h1>
    </div>
  );
}
