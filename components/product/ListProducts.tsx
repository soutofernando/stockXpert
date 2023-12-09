import { PageProps } from "$fresh/server.ts";

export default function ListProducts(props: PageProps) {
  const { data } = props;
  return <div>
    {data.data.map((item) => 
    <div class="gap-2" >
        <span>{item.id}</span>
        <span>{item.product_name}</span>
        <span>{item.description}</span>
        <span>{item.quantity}</span>
        <span>{item.entry}</span>
        <span>{item.exit}</span>
    </div>
    )}
  </div>;
}
