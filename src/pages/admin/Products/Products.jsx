import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";
import { getProductsByCount } from "../../../api/product";
import ProductCard from "../../../components/admin/Cards/ProductCard";
import { Heading } from "@chakra-ui/react";

const Products = () => {
  // const [intervalMs, setIntervalMs] = React.useState(1000)

  const {
    status,
    data: products = [],
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await getProductsByCount(50);
      return res.data;
    },
    // Refetch the data every second
    // refetchInterval: intervalMs,
  });
  console.log(products);
  if (status === "pending") return <Loader />;
  if (status === "error") return <span>Error: {error.message}</span>;
  return (
    <div className='container mx-auto space-y-10'>
      <Heading size='xl'>All Products</Heading>

      <div className='grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {products.map(product => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
