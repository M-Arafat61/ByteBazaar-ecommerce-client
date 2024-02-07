import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";
import { deleteProduct, getProductsByCount } from "../../../api/product";
import ProductCard from "../../../components/admin/Cards/ProductCard";
import { Heading } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Products = () => {
  // const [intervalMs, setIntervalMs] = React.useState(1000)
  const { token } = useSelector(state => state.user.userinfo);

  const {
    status,
    data: products = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await getProductsByCount(50);
      return res.data;
    },
    // Refetch the data every second
    // refetchInterval: intervalMs,
  });

  const handleProductDelete = async slug => {
    // console.log(slug);
    toast.info(
      <>
        <p>{`Are you sure to delete product ${slug} ?`}</p>
        <div className='flex gap-x-5 mt-5'>
          <button
            className='px-2 py-1 bg-red-500 text-white font-semibold'
            onClick={() => confirmProductDelete(slug)}
          >
            Yes
          </button>
          <button
            className='px-2 py-1 bg-emerald-500 text-white font-semibold'
            onClick={toast.dismiss}
          >
            No
          </button>
        </div>
      </>,
      { autoClose: false }
    );
  };

  const confirmProductDelete = async slug => {
    try {
      const response = await deleteProduct(slug, token);
      console.log(response);
      if (response.status == "200") {
        refetch();
        toast.success(`Product ${name} is deleted!`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  console.log(products);
  if (status === "pending") return <Loader />;
  if (status === "error") return <span>Error: {error.message}</span>;
  return (
    <div className='container mx-auto space-y-10'>
      <Heading size='xl'>All Products</Heading>

      <div className='grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'>
        {products.map(product => (
          <div key={product._id}>
            <ProductCard
              product={product}
              handleProductDelete={handleProductDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
