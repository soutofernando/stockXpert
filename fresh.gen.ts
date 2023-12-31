// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $auth_middleware from "./routes/auth/_middleware.ts";
import * as $auth_dashboard from "./routes/auth/dashboard.tsx";
import * as $auth_payments from "./routes/auth/payments.tsx";
import * as $auth_people from "./routes/auth/people.tsx";
import * as $auth_products from "./routes/auth/products.tsx";
import * as $auth_register_payment from "./routes/auth/register_payment.tsx";
import * as $auth_register_product from "./routes/auth/register_product.tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $signup from "./routes/signup.tsx";
import * as $PaymentsList from "./islands/PaymentsList.tsx";
import * as $ProductsList from "./islands/ProductsList.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/auth/_middleware.ts": $auth_middleware,
    "./routes/auth/dashboard.tsx": $auth_dashboard,
    "./routes/auth/payments.tsx": $auth_payments,
    "./routes/auth/people.tsx": $auth_people,
    "./routes/auth/products.tsx": $auth_products,
    "./routes/auth/register_payment.tsx": $auth_register_payment,
    "./routes/auth/register_product.tsx": $auth_register_product,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/signup.tsx": $signup,
  },
  islands: {
    "./islands/PaymentsList.tsx": $PaymentsList,
    "./islands/ProductsList.tsx": $ProductsList,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
