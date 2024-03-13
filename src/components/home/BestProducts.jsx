import { useQuery } from "@tanstack/react-query";
import { getNewAndBestProducts } from "../../api/product";
import { useEffect } from "react";
import HomeProductCard from "./HomeProductCard";

const BestProducts = () => {
  const {
    status,
    data: bestProducts = [],
    refetch,
  } = useQuery({
    queryKey: ["bestProducts"],
    queryFn: async () => {
      const res = await getNewAndBestProducts("sold", "desc", 3);
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
      {bestProducts.map(product => (
        <HomeProductCard key={product._id} status={status} product={product} />
      ))}
    </div>
  );
};

export default BestProducts;
