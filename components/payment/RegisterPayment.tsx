export default function RegisterPayment() {
  return (
    <div class="max-w-[400px] mx-auto py-8">
      <form method="POST">
        <div>
          <label for="description" class="block mb-2 text-sm font-medium">
            Descrição do pagamento
          </label>
          <input
            type="text"
            name="description"
            id="description"
            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ex: Folha de pagamento CG"
          />
        </div>
        <div>
          <label for="value" class="block mb-2 text-sm font-medium">
            Valor do pagamento
          </label>
          <input
            step="0.01"
            type="number"
            name="value"
            id="value"
            placeholder="Ex: 4000"
            class="border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full mt-4 text-white bg-black  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Registrar Pagamento
        </button>
      </form>
    </div>
  );
}
