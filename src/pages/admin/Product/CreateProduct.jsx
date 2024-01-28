import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createProductData } from "../../../api/product";
import { useSelector } from "react-redux";

const colors = [
  "Silver",
  "Space Gray",
  "Black",
  "White",
  "Blue",
  "Red",
  "Gold",
  "Rose Gold",
  "Carbon Black",
  "Gunmetal",
];
const brands = [
  "Xiaomi",
  "Acer",
  "Dell",
  "MSI",
  "Microsoft",
  "Razer",
  "Samsung",
  "Apple",
  "HP",
  "Lenovo",
];

const CreateProduct = () => {
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { token } = useSelector(state => state.user.userinfo);

  const onSubmit = async (data, resetForm) => {
    try {
      const response = await createProductData(data, token);
      console.log(response.data);
      if (response.status == "200") {
        setLoading(false);
        toast.success(`Product creation successful.`);
        // resetForm();
      }
    } catch (error) {
      toast.error(error.response.data.error);
      //   console.log(error.response.data.error);
    }
  };

  return (
    <div className='space-y-5'>
      <div className='w-full md:w-1/2 mx-auto text-xl md:text-3xl font-bold'>
        {loading ? (
          <p className='text-red-500'>Loading</p>
        ) : (
          <p>Create Product</p>
        )}
      </div>
      {/* form */}

      <div className='border px-10 py-5 rounded-2xl'>
        <form
          onSubmit={handleSubmit(data => onSubmit(data, reset))}
          className='flex flex-col space-y-3'
        >
          <label>Title</label>
          <input
            type='text'
            placeholder='Title'
            className='text-lg outline-none border px-2 py-1 '
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className='text-red-500'>Title is required!</span>
          )}
          <label>Description</label>
          <textarea
            type='text'
            placeholder='Description'
            className='text-lg outline-none border px-2 py-1 h-[80px] resize-none'
            {...register("description", { required: true, maxLength: 2000 })}
          />
          {errors.description && (
            <span className='text-red-500'>Description is required!</span>
          )}
          <div className='flex items-center justify-around'>
            <div className='flex flex-col space-y-1'>
              <label>Price</label>
              <input
                type='number'
                placeholder='Price'
                {...register("price", { required: true })}
                className='text-lg outline-none border px-2 py-1 '
              />
              {errors.price && (
                <span className='text-red-500'>Price is required!</span>
              )}
            </div>

            <div className='flex flex-col space-y-1'>
              <label>Shipping</label>
              <select
                {...register("shipping", { required: true })}
                className='text-lg outline-none border px-2 py-1 '
              >
                <option value=''>Please select</option>
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
              </select>
              {errors.shipping && (
                <span className='text-red-500'>Shipping is required!</span>
              )}
            </div>
          </div>
          <div className='flex items-center justify-around'>
            <div className='flex flex-col space-y-1'>
              <label>Quantity</label>
              <input
                type='number'
                placeholder='Quantity'
                {...register("quantity", { required: true })}
                className='text-lg outline-none border px-2 py-1 '
              />
              {errors.quantity && (
                <span className='text-red-500'>Quantity is required!</span>
              )}
            </div>
            <div className='flex flex-col space-y-1'>
              <label>Colors</label>
              <select
                {...register("color", { required: true })}
                className='text-lg outline-none border px-2 py-1 '
              >
                <option value=''>Please select</option>
                {colors.map((color, idx) => (
                  <option key={idx} value={color}>
                    {color}
                  </option>
                ))}
              </select>
              {errors.color && (
                <span className='text-red-500'>Color is required!</span>
              )}
            </div>
            <div className='flex flex-col space-y-1'>
              <label>Brands</label>
              <select
                {...register("brand", { required: true })}
                className='text-lg outline-none border px-2 py-1 '
              >
                <option value=''>Please select</option>
                {brands.map((brand, idx) => (
                  <option key={idx} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <span className='text-red-500'>Brand is required!</span>
              )}
            </div>
          </div>
          <button
            type='submit'
            className='bg-emerald-400 hover:cursor-pointer py-2 text-white uppercase font-semibold'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
