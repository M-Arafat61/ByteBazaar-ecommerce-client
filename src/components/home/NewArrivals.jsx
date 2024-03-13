import { useQuery } from "@tanstack/react-query";
import { getNewAndBestProducts } from "../../api/product";
import { useEffect } from "react";
import HomeProductCard from "./HomeProductCard";

const NewArrivals = () => {
  const {
    status,
    data: products = [],
    refetch,
  } = useQuery({
    queryKey: ["newProducts"],
    queryFn: async () => {
      const res = await getNewAndBestProducts("createdAt", "desc", 5);
      return res.data;
    },
    // Refetch the data every second
    // refetchInterval: intervalMs,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className='grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 xl:gap-9'>
      {products.map(product => (
        <HomeProductCard key={product._id} status={status} product={product} />
      ))}
    </div>
  );
};

export default NewArrivals;
