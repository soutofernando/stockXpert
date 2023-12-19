import Icon from "../../components/ui/Icon.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import type { State } from "../_middleware.ts";
import { formatPrice } from "../../sdk/format.ts";

export const handler: Handlers<any, State> = {
  async GET(_req, ctx) {
    const payments = await ctx.state.supabaseClient.from("Payments")
      .select("*");
    const subtotal = payments.data?.reduce(
      (acc: number, curr: any) => acc + curr.value,
      0,
    );

    const products = await ctx.state.supabaseClient.from("Stock").select("*");

    return ctx.render({
      payments: payments.data,
      subtotal,
      products: products.data,
    });
  },
};

export default function dashboard(props: PageProps) {
  const { payments, products, subtotal } = props.data;
  const colums = Object.keys(products[0]).filter((colum) =>
    colum == "product_name" || colum == "quantity"
  );
  const canceledPayments = payments.filter((payment) =>
    payment.status == "cancelado"
  );
  const total = canceledPayments.reduce(
    (acc: number, curr: any) => acc + curr.value,
    0,
  );

  return (
    <div>
      <aside class="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div class="-mx-6 px-6 py-4">
            <a href="/" class="flex items-center">
              <Icon id="Logo" class="w-44 h-[40px]" />
            </a>
          </div>

          <div class="mt-8 text-center">
            <img
              src="https://img.olhardigital.com.br/wp-content/uploads/2022/04/tesla-roadster.webp"
              alt=""
              class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              João Neves
            </h5>
            <span class="hidden text-gray-400 lg:block">Admin</span>
          </div>

          <ul class="space-y-2 tracking-wide mt-8">
            <li>
              <a
                href="/auth/dashboard"
                aria-label="dashboard"
                class="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-b from-gray-600 to-black"
              >
                <Icon id="Dashboard" class="w-5 h-5" />
                <span class="-mr-1 font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/auth/products"
                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <Icon id="Checkup" class="w-5 h-5" />
                <span class="group-hover:text-gray-700">Produtos</span>
              </a>
            </li>
            <li>
              <a
                href="/auth/payments"
                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <Icon id="Cifrao" class="h-5 w-5" />
                <span class="group-hover:text-gray-700">Pagamentos</span>
              </a>
            </li>
            <li>
              <a
                href="/auth/people"
                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
              >
                <Icon id="Users" class="h-5 w-5" />
                <span class="group-hover:text-gray-700">Pessoas</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span class="group-hover:text-gray-700">Logout</span>
          </button>
        </div>
      </aside>
      <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div class="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div class="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden class="text-2xl text-gray-600 font-medium lg:block">
              Dashboard
            </h5>
            <button class="w-12 h-16 -mr-2 border-r lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 my-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div class="flex space-x-4">
              <div hidden class="md:block">
                <div class="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                  <span class="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <svg
                      xmlns="http://ww50w3.org/2000/svg"
                      class="w-4 fill-current"
                      viewBox="0 0 35.997 36.004"
                    >
                      <path
                        id="Icon_awesome-search"
                        data-name="search"
                        d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                      >
                      </path>
                    </svg>
                  </span>
                  <input
                    type="search"
                    name="leadingIcon"
                    id="leadingIcon"
                    placeholder="Search here"
                    class="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                  />
                </div>
              </div>

              <button
                aria-label="search"
                class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden"
              >
                <svg
                  xmlns="http://ww50w3.org/2000/svg"
                  class="w-4 mx-auto fill-current text-gray-600"
                  viewBox="0 0 35.997 36.004"
                >
                  <path
                    id="Icon_awesome-search"
                    data-name="search"
                    d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                  >
                  </path>
                </svg>
              </button>
              <button
                aria-label="chat"
                class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 m-auto text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </button>
              <button
                aria-label="notification"
                class="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 m-auto text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="px-6 pt-6 2xl:container">
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div class="md:col-span-2 lg:col-span-1">
              <div class="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
                <h5 class="text-xl text-gray-700 mb-8">Produtos</h5>
                <div class="block w-full overflow-x-auto mb-8">
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
                      {products.map((row, index) => (
                        <tr class={index < 5 ? "visible" : "hidden"}>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 border-b">
                            {row.product_name}
                          </td>
                          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 border-b">
                            {row.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <a
                  href="/auth/products"
                  class="focus:outline-none text-center max-w-[200px] mt-4 sm:mt-0 hover:bg-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out bg-black rounded text-white px-8 py-2 text-sm"
                >
                  Ver Tudo
                </a>
              </div>
            </div>
            <div>
              <div class="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
                <h5 class="text-xl text-gray-700 mb-8">Pagamentos</h5>
                <svg
                  class="w-full"
                  viewBox="0 0 218 69"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 67.5C27.8998 67.5 24.6002 15 52.5 15C80.3998 15 77.1002 29 105 29C132.9 29 128.6 52 156.5 52C184.4 52 189.127 63.8158 217.027 63.8158"
                    stroke="#EA472E"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <path
                    d="M0 67.5C27.2601 67.5 30.7399 31 58 31C85.2601 31 80.7399 2 108 2C135.26 2 134.74 43 162 43C189.26 43 190.74 63.665 218 63.665"
                    stroke="#48CF1E"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_622:13664"
                      x1="217.027"
                      y1="15"
                      x2="7.91244"
                      y2="15"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#4DFFDF" />
                      <stop offset="1" stop-color="#4DA1FF" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_622:13664"
                      x1="218"
                      y1="18.3748"
                      x2="5.4362"
                      y2="18.9795"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#E323FF" />
                      <stop offset="1" stop-color="#7517F8" />
                    </linearGradient>
                  </defs>
                </svg>
                <table class="mt-6 -mb-2 w-full text-gray-600">
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr class={index < 3 ? "visible" : "hidden"}>
                        <td
                          class={`${
                            payment.status == "cancelado" ? "line-through " : ""
                          } border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex flex-row items-center`}
                        >
                          {formatPrice(payment.value)}
                          {payment.status == "cancelado"
                            ? (
                              <Icon
                                id="ArrowUp"
                                class="w-4 h-4 text-green-500"
                              />
                            )
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
                              payment.status == "completo"
                                ? "bg-green-400"
                                : "bg-red-400"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td>
                          <svg
                            class="w-16 ml-auto"
                            viewBox="0 0 68 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              opacity="0.4"
                              width="17"
                              height="21"
                              rx="1"
                              fill="#e4e4f2"
                            />
                            <rect
                              opacity="0.4"
                              x="19"
                              width="14"
                              height="21"
                              rx="1"
                              fill="#e4e4f2"
                            />
                            <rect
                              opacity="0.4"
                              x="35"
                              width="14"
                              height="21"
                              rx="1"
                              fill="#e4e4f2"
                            />
                            <rect
                              opacity="0.4"
                              x="51"
                              width="17"
                              height="21"
                              rx="1"
                              fill="#e4e4f2"
                            />
                            <path
                              d="M0 7C8.62687 7 7.61194 16 17.7612 16C27.9104 16 25.3731 9 34 9C42.6269 9 44.5157 5 51.2537 5C57.7936 5 59.3731 14.5 68 14.5"
                              stroke={payment.status == "cancelado"
                                ? "#48CF1E"
                                : "#EA472E"}
                              stroke-width="2"
                              stroke-linejoin="round"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_622:13631"
                                x1="68"
                                y1="7.74997"
                                x2="1.69701"
                                y2="8.10029"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#E323FF" />
                                <stop offset="1" stop-color="#7517F8" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div class="my-8">
                  <span class="text-lg font-normal text-gray-600">
                    Subtotal: {formatPrice(subtotal)}
                  </span>
                  <h1 class="text-xl font-semibold text-gray-800">
                    Total: {formatPrice(subtotal - total)}
                  </h1>
                </div>
                <a
                  href="/auth/payments"
                  class="focus:outline-none text-center max-w-[200px] mt-4 sm:mt-0 hover:bg-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out bg-black rounded text-white px-8 py-2 text-sm"
                >
                  Ver Tudo
                </a>
              </div>
            </div>
            <div>
              <div class="lg:h-full py-8 px-6 text-gray-600 rounded-xl border border-gray-200 bg-white">
                <svg
                  class="w-40 m-auto"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.9985 2.84071C31.2849 2.84071 34.539 3.488 37.5752 4.74562C40.6113 6.00324 43.3701 7.84657 45.6938 10.1703C48.0176 12.4941 49.861 15.2529 51.1186 18.289C52.3762 21.3252 53.0235 24.5793 53.0235 27.8657C53.0235 31.152 52.3762 34.4061 51.1186 37.4423C49.861 40.4785 48.0176 43.2372 45.6938 45.561C43.3701 47.8848 40.6113 49.7281 37.5752 50.9857C34.539 52.2433 31.2849 52.8906 27.9985 52.8906C24.7122 52.8906 21.4581 52.2433 18.4219 50.9857C15.3857 49.7281 12.627 47.8848 10.3032 45.561C7.97943 43.2372 6.1361 40.4785 4.87848 37.4423C3.62086 34.4061 2.97357 31.152 2.97357 27.8657C2.97357 24.5793 3.62086 21.3252 4.87848 18.289C6.13611 15.2529 7.97943 12.4941 10.3032 10.1703C12.627 7.84656 15.3857 6.00324 18.4219 4.74562C21.4581 3.488 24.7122 2.84071 27.9985 2.84071L27.9985 2.84071Z"
                    stroke="#e4e4f2"
                    stroke-width="3"
                  />
                  <path
                    d="M27.301 2.50958C33.0386 2.35225 38.6614 4.13522 43.26 7.57004C47.8585 11.0049 51.1637 15.8907 52.641 21.437C54.1182 26.9834 53.6811 32.8659 51.4002 38.133C49.1194 43.4001 45.1283 47.7437 40.0726 50.4611C35.0169 53.1785 29.1923 54.1108 23.541 53.1071C17.8897 52.1034 12.7423 49.2225 8.93145 44.9305C5.12062 40.6384 2.86926 35.1861 2.54159 29.4558C2.21391 23.7254 3.82909 18.0521 7.12582 13.3536"
                    stroke="url(#paint0_linear_622:13696)"
                    stroke-width="5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M13.3279 30.7467C13.3912 29.48 13.8346 28.5047 14.6579 27.8207C15.4939 27.124 16.5896 26.7757 17.9449 26.7757C18.8696 26.7757 19.6612 26.9404 20.3199 27.2697C20.9786 27.5864 21.4726 28.0234 21.8019 28.5807C22.1439 29.1254 22.3149 29.746 22.3149 30.4427C22.3149 31.2407 22.1059 31.9184 21.6879 32.4757C21.2826 33.0204 20.7949 33.3877 20.2249 33.5777V33.6537C20.9596 33.8817 21.5296 34.287 21.9349 34.8697C22.3529 35.4524 22.5619 36.1997 22.5619 37.1117C22.5619 37.8717 22.3846 38.5494 22.0299 39.1447C21.6879 39.74 21.1749 40.2087 20.4909 40.5507C19.8196 40.88 19.0089 41.0447 18.0589 41.0447C16.6276 41.0447 15.4622 40.6837 14.5629 39.9617C13.6636 39.2397 13.1886 38.1757 13.1379 36.7697H15.7219C15.7472 37.3904 15.9562 37.8907 16.3489 38.2707C16.7542 38.638 17.3052 38.8217 18.0019 38.8217C18.6479 38.8217 19.1419 38.6444 19.4839 38.2897C19.8386 37.9224 20.0159 37.4537 20.0159 36.8837C20.0159 36.1237 19.7752 35.579 19.2939 35.2497C18.8126 34.9204 18.0652 34.7557 17.0519 34.7557H16.5009V32.5707H17.0519C18.8506 32.5707 19.7499 31.969 19.7499 30.7657C19.7499 30.221 19.5852 29.7967 19.2559 29.4927C18.9392 29.1887 18.4769 29.0367 17.8689 29.0367C17.2736 29.0367 16.8112 29.2014 16.4819 29.5307C16.1652 29.8474 15.9816 30.2527 15.9309 30.7467H13.3279ZM25.6499 37.9477C26.8659 36.9344 27.8349 36.092 28.5569 35.4207C29.2789 34.7367 29.8806 34.0274 30.3619 33.2927C30.8433 32.558 31.0839 31.836 31.0839 31.1267C31.0839 30.4807 30.9319 29.974 30.6279 29.6067C30.3239 29.2394 29.8553 29.0557 29.2219 29.0557C28.5886 29.0557 28.1009 29.271 27.7589 29.7017C27.4169 30.1197 27.2396 30.696 27.2269 31.4307H24.6429C24.6936 29.9107 25.1433 28.758 25.9919 27.9727C26.8533 27.1874 27.9426 26.7947 29.2599 26.7947C30.7039 26.7947 31.8123 27.181 32.5849 27.9537C33.3576 28.7137 33.7439 29.7207 33.7439 30.9747C33.7439 31.9627 33.4779 32.9064 32.9459 33.8057C32.4139 34.705 31.8059 35.4904 31.1219 36.1617C30.4379 36.8204 29.5449 37.6184 28.4429 38.5557H34.0479V40.7597H24.6619V38.7837L25.6499 37.9477Z"
                    fill="currentColor"
                  />
                  <path
                    d="M36.1948 28.8842C36.1948 29.4438 36.2557 29.8634 36.3775 30.1432C36.4992 30.423 36.6967 30.5628 36.9699 30.5628C37.5097 30.5628 37.7796 30.0033 37.7796 28.8842C37.7796 27.7717 37.5097 27.2155 36.9699 27.2155C36.6967 27.2155 36.4992 27.3537 36.3775 27.6302C36.2557 27.9067 36.1948 28.3247 36.1948 28.8842ZM38.456 28.8842C38.456 29.6347 38.3293 30.2024 38.0758 30.5875C37.8257 30.9693 37.457 31.1602 36.9699 31.1602C36.5091 31.1602 36.1504 30.9644 35.8936 30.5727C35.6402 30.181 35.5135 29.6182 35.5135 28.8842C35.5135 28.1371 35.6352 27.5742 35.8788 27.1957C36.1257 26.8172 36.4894 26.6279 36.9699 26.6279C37.4472 26.6279 37.8142 26.8238 38.0709 27.2155C38.3276 27.6071 38.456 28.1634 38.456 28.8842ZM40.5395 31.7774C40.5395 32.3402 40.6003 32.7615 40.7221 33.0413C40.8439 33.3178 41.043 33.456 41.3195 33.456C41.596 33.456 41.8001 33.3194 41.9317 33.0462C42.0634 32.7697 42.1292 32.3468 42.1292 31.7774C42.1292 31.2145 42.0634 30.7982 41.9317 30.5283C41.8001 30.2551 41.596 30.1185 41.3195 30.1185C41.043 30.1185 40.8439 30.2551 40.7221 30.5283C40.6003 30.7982 40.5395 31.2145 40.5395 31.7774ZM42.8056 31.7774C42.8056 32.5245 42.6789 33.0906 42.4254 33.4757C42.1753 33.8575 41.8067 34.0484 41.3195 34.0484C40.8521 34.0484 40.4917 33.8526 40.2383 33.4609C39.9881 33.0693 39.8631 32.5081 39.8631 31.7774C39.8631 31.0302 39.9849 30.4674 40.2284 30.0889C40.4753 29.7104 40.839 29.5211 41.3195 29.5211C41.7869 29.5211 42.1506 29.7153 42.4106 30.1037C42.6739 30.4888 42.8056 31.0467 42.8056 31.7774ZM41.5318 26.7316L37.5278 33.9497H36.8021L40.8061 26.7316H41.5318Z"
                    fill="white"
                  />
                  <path
                    d="M23.5776 18.4198H25.5424V22.8407H23.5776V18.4198ZM30.4545 16.455H32.4193V22.8407H30.4545V16.455ZM27.0161 13.5078H28.9809V22.8407H27.0161V13.5078Z"
                    fill="#6A6A9F"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_622:13696"
                      x1="5.54791e-07"
                      y1="42.0001"
                      x2="54.6039"
                      y2="41.9535"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#E323FF" />
                      <stop offset="1" stop-color="#7517F8" />
                    </linearGradient>
                  </defs>
                </svg>
                <div class="mt-6">
                  <h5 class="text-xl text-gray-700 text-center">
                    Ask to customize
                  </h5>
                  <div class="mt-2 flex justify-center gap-4">
                    <h3 class="text-3xl font-bold text-gray-700">28</h3>
                    <div class="flex items-end gap-1 text-green-500">
                      <svg
                        class="w-3"
                        viewBox="0 0 12 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>2%</span>
                    </div>
                  </div>
                  <span class="block text-center text-gray-500">
                    Compared to last week 13
                  </span>
                </div>
                <table class="mt-6 -mb-2 w-full text-gray-600">
                  <tbody>
                    <tr>
                      <td class="py-2">Tailored ui</td>
                      <td class="text-gray-500">896</td>
                      <td>
                        <svg
                          class="w-16 ml-auto"
                          viewBox="0 0 68 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.4"
                            width="17"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <rect
                            opacity="0.4"
                            x="19"
                            width="14"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <rect
                            opacity="0.4"
                            x="35"
                            width="14"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <rect
                            opacity="0.4"
                            x="51"
                            width="17"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <path
                            d="M0 7C8.62687 7 7.61194 16 17.7612 16C27.9104 16 25.3731 9 34 9C42.6269 9 44.5157 5 51.2537 5C57.7936 5 59.3731 14.5 68 14.5"
                            stroke="url(#paint0_linear_622:13631)"
                            stroke-width="2"
                            stroke-linejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_622:13631"
                              x1="68"
                              y1="7.74997"
                              x2="1.69701"
                              y2="8.10029"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#E323FF" />
                              <stop offset="1" stop-color="#7517F8" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2">Customize</td>
                      <td class="text-gray-500">1200</td>
                      <td>
                        <svg
                          class="w-16 ml-auto"
                          viewBox="0 0 68 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.4"
                            width="17"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <rect
                            opacity="0.4"
                            x="19"
                            width="14"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <rect
                            opacity="0.4"
                            x="35"
                            width="14"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <rect
                            opacity="0.4"
                            x="51"
                            width="17"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <path
                            d="M0 12.929C8.69077 12.929 7.66833 9.47584 17.8928 9.47584C28.1172 9.47584 25.5611 15.9524 34.2519 15.9524C42.9426 15.9524 44.8455 10.929 51.6334 10.929C58.2217 10.929 59.3092 5 68 5"
                            stroke="url(#paint0_linear_622:13640)"
                            stroke-width="2"
                            stroke-linejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_622:13640"
                              x1="34"
                              y1="5"
                              x2="34"
                              y2="15.9524"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#8AFF6C" />
                              <stop offset="1" stop-color="#02C751" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2">Other</td>
                      <td class="text-gray-500">12</td>
                      <td>
                        <svg
                          class="w-16 ml-auto"
                          viewBox="0 0 68 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.4"
                            width="17"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <rect
                            opacity="0.4"
                            x="19"
                            width="14"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <rect
                            opacity="0.4"
                            x="35"
                            width="14"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <rect
                            opacity="0.4"
                            x="51"
                            width="17"
                            height="21"
                            rx="1"
                            fill="#e4e4f2"
                          />
                          <path
                            d="M0 6C8.62687 6 6.85075 12.75 17 12.75C27.1493 12.75 25.3731 9 34 9C42.6269 9 42.262 13.875 49 13.875C55.5398 13.875 58.3731 6 67 6"
                            stroke="url(#paint0_linear_622:13649)"
                            stroke-width="2"
                            stroke-linejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_622:13649"
                              x1="67"
                              y1="7.96873"
                              x2="1.67368"
                              y2="8.44377"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#FFD422" />
                              <stop offset="1" stop-color="#FF7D05" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
