export default function RegisterProduct() {
  return (
    <div class="max-w-[400px] mx-auto py-8">
      <form method="POST">
        <div>
          <label for="productName" class="block mb-2 text-sm font-medium">
            Nome do Produto
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product Name"
          />
        </div>
        <div>
          <label for="description" class="block mb-2 text-sm font-medium">
            Descrição
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="description"
            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label for="quantity" class="block mb-2 text-sm font-medium">
            Quantidade
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="quantity"
            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full mt-4 text-white bg-black  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
