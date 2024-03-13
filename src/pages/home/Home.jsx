import BestProducts from "../../components/home/BestProducts";
import NewArrivals from "../../components/home/NewArrivals";

const Home = () => {
  return (
    <div className='container mx-auto space-y-10 mt-10 md:mt-16 xl:mt-28'>
      <div className=' text-center pb-5'>
        <h2 className='text-xl md:text-2xl xl:text-4xl font-bold'>
          Home Products
        </h2>
      </div>

      <NewArrivals />
      <BestProducts />
    </div>
  );
};

export default Home;
