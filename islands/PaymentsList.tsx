import { PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import { formatDate, formatPrice } from "../sdk/format.ts";
import Icon from "../components/ui/Icon.tsx";

export default function PaymentsList(props: PageProps) {
  const { data } = props;
  const colums = Object.keys(data.data[0]);
  const updateStatus = useSignal({});
  const canceledPayments = data.data.filter((payment) =>
    payment.status == "cancelado"
  );
  const total = canceledPayments.reduce(
    (acc: number, curr: any) => acc + curr.value,
    0,
  );

  const searchMonth = async () => {
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
            <div class="relative w-full sm:px-4 max-w-full flex-grow flex-1">
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
                <th class="px-6 bg-gray-100 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Cancelar Pagamento
                </th>
              </tr>
            </thead>
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
