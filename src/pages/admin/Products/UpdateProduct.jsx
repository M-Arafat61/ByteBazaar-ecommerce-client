import { getSingleProduct } from "../../../api/product";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { slug } = useParams();

  const {
    data: product = {},

    isLoading,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await getSingleProduct(slug);
      return response.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return toast.error(error?.message);
  }
  console.log(product);

  //   React.useEffect(() => {
  //     const fetchProduct = async () => {
  //       const response = await getSingleProduct(slug);
  //       console.log(response.data);
  //     };
  //     fetchProduct();
  //   }, [slug]);
  return (
    <div className='space-y-5'>
      <div className='w-full md:w-1/2 mx-auto text-xl md:text-3xl font-bold'>
        <p>Product Update</p>
      </div>
    </div>
  );
};

export default UpdateProduct;
