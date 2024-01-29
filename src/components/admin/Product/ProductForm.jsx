/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import Select from "react-select";

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

const ProductForm = ({
  onSubmit,
  categories,
  handleCategory,
  subs,
  selectedSubs,
  handleSubSelectChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // console.log(subs);
  const allOptions = subs?.map(sub => ({
    value: sub?._id,
    label: sub?.name,
  }));

  return (
    <form
      onSubmit={handleSubmit(data =>
        onSubmit({ ...data, subs: selectedSubs }, reset)
      )}
      className='flex flex-col space-y-3'
    >
      <label>Title</label>
      <input
        type='text'
        placeholder='Title'
        className='text-lg outline-none border px-2 py-1 '
        {...register("title", { required: true })}
      />
      {errors.title && <span className='text-red-500'>Title is required!</span>}
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

      <div className='flex flex-col space-y-1'>
        <label>Category</label>
        <select
          {...register("category", { required: true })}
          className='text-lg outline-none border px-2 py-1'
          name='category'
          onChange={handleCategory}
        >
          <option value=''>Select category</option>
          {categories.length > 0 &&
            categories.map(cat => (
              <option key={cat._id} value={cat._id} className=''>
                {cat.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <span className='text-red-500'>Category is required!</span>
        )}
      </div>
      {subs && subs.length > 0 && (
        <>
          <label>Sub-category</label>
          <Select
            name='subs'
            isMulti
            options={allOptions}
            className='basic-multi-select text-lg'
            classNamePrefix='select'
            onChange={handleSubSelectChange}
            required
          />
        </>
      )}

      <button
        type='submit'
        className='bg-emerald-400 hover:cursor-pointer py-2 text-white uppercase font-semibold'
      >
        Save
      </button>
    </form>
  );
};

export default ProductForm;
