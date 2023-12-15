import { PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import Modal from "../components/ui/Modal.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default function ProductsList(props: PageProps) {
  const { data } = props;
  const colums = Object.keys(data.data[0]);
  const open = useSignal(false);
  const modalValues = useSignal({});
  const selectValue = useSignal("entrada");
  const updateTypeValue = useSignal(0);

  if (IS_BROWSER) {
    const select = document.getElementById("updateType") as HTMLSelectElement;
    if (select) {
      selectValue.value = select.value;
    }
  }

  const updateProduct = async () => {
    const quantity = selectValue.value == "entrada"
      ? modalValues.value.quantity += updateTypeValue.value
      : modalValues.value.quantity -= updateTypeValue.value;
    const entry = selectValue.value == "entrada"
      ? modalValues.value.entry += updateTypeValue.value
      : modalValues.value.entry;
    const exit = selectValue.value == "saida"
      ? modalValues.value.exit += updateTypeValue.value
      : modalValues.value.exit;
    const newProduct = {
      id: modalValues.value.id,
      product_name: modalValues.value.product_name,
      description: modalValues.value.description,
      quantity: quantity,
      entry: entry,
      exit: exit,
    };

    const response = await fetch("http://localhost:8000/auth/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      window.location.reload();
    }

    return response;
  };

  const deleteProduct = async () => {
    const response = await fetch("http://localhost:8000/auth/products", {
      method: "DELETE",
      body: JSON.stringify(modalValues.value.id),
    });

    if (response.ok) {
      window.location.reload();
    }

    return response;
  };

  return (
    <div class="antialiased font-sans bg-gray-200">
      <div class="container mx-auto px-4 sm:px-8">
        <div class="py-8">
          <div>
            <h2 class="text-2xl font-semibold leading-tight">Produtos</h2>
          </div>
          <div class="my-2 flex sm:flex-row flex-col">
            <div class="flex flex-row mb-1 sm:mb-0">
              <div class="relative">
                <select class="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
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
              <div class="relative">
                <select class="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
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
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    {colums.map((colum) => (
                      <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {colum}
                      </th>
                    ))}
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((row) => (
                    <tr>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {row.id}
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {row.product_name}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {row.quantity}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {row.description}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {row.entry}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {row.exit}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {row.created_at}
                        </p>
                      </td>

                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            class={`absolute inset-0 ${
                              row.status ? "bg-green-200" : "bg-red-400"
                            } opacity-50 rounded-full`}
                          >
                          </span>
                          <span class="relative">
                            {row.status ? "Ativo" : "Desativado"}
                          </span>
                        </span>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => {
                            open.value = true, modalValues.value = row;
                          }}
                          class="px-1 py-1 text-gray-900 transition-colors duration-200 rounded-lg dark:text-gray-900 hover:bg-gray-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span class="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 5
                </span>
                <div class="inline-flex mt-2 xs:mt-0">
                  <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open.value}
      >
        <div
          role="alert"
          class="container mx-auto w-11/12 md:w-2/3 max-w-lg rounded-lg"
        >
          <div
            id="editProduct"
            class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"
          >
            <input name="id" value={modalValues.value.id} class="hidden" />
            <button
              class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              aria-label="close modal"
              role="button"
              onClick={() => {
                open.value = false, modalValues.value = {};
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
              Editar produto: {modalValues.value.product_name}
            </h1>
            <label
              for="name"
              class="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Produto
            </label>
            <input
              type="text"
              onChange={(e) =>
                modalValues.value.product_name = (e.target as HTMLInputElement)
                  ?.value}
              value={modalValues.value.product_name}
              id="productName"
              class="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-black font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Ex: Bota"
            />
            <label
              for="expiry"
              class="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Description
            </label>

            <input
              onChange={(e) =>
                modalValues.value.description = (e.target as HTMLInputElement)
                  ?.value}
              value={modalValues.value.description}
              id="description"
              class="text-gray-600 mb-2 focus:outline-none focus:border focus:border-black font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Ex: Tamnho 42"
            />
            <label
              for="quantity"
              class="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Quantidade
            </label>
            <span
              id="quantity"
              class="text-gray-600 mb-2 cursor-not-allowed max-w-[80px] focus:outline-none focus:border focus:border-black font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Ex: 2"
            >
              {modalValues.value.quantity}
            </span>
            <div class="flex flex-col">
              <label
                for="select"
                class="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Entrada / Saída:
              </label>

              <select
                id="updateType"
                class="h-10 pl-3 pr-3 border-gray-300 rounded border max-w-[120px] mb-2"
              >
                <option value="entrada">
                  Entrada
                </option>
                <option value="saida" selected>
                  Saída
                </option>
              </select>
            </div>

            <label
              for="select"
              class="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Quantidade:
            </label>

            <input
              onChange={(e) =>
                updateTypeValue.value = parseInt(
                  (e.target as HTMLInputElement)
                    ?.value,
                )}
              id="updateTypeValue"
              type="number"
              class="text-gray-600 max-w-[80px] mb-2 focus:outline-none focus:border focus:border-black font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Ex: 2"
            />

            <div class="flex items-center justify-start w-full pt-6">
              <button
                onClick={() => {
                  updateProduct();
                }}
                class="focus:outline-none hover:bg-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out bg-black rounded text-white px-8 py-2 text-sm"
              >
                Atualizar Produto
              </button>
              <button
                onClick={() => {
                  deleteProduct();
                }}
                class="focus:outline-none ml-3 hover:bg-red-400 focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out bg-red-600 rounded text-white px-8 py-2 text-sm"
              >
                Deletar Produto
              </button>
            </div>
            <button
              onClick={() => {
                open.value = false, modalValues.value = {};
              }}
              class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 mt-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
