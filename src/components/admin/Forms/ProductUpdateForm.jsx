/* eslint-disable react/prop-types */

import { Button } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const ProductUpdateForm = ({
  product,
  onSubmit,
  colors,
  brands,
  subCat,
  handleCategory,
  categories,
  handleSubSelectChange,
  options,
  selectedSubs,
  defaultSubs,
  setDefaultSubs,
  uploadedImages,
}) => {
  const {
    title,
    description,
    category,
    price,
    images,
    shipping,
    quantity,
    color,
    brand,
  } = product;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const defaultSubsOptions = subCat
    .filter(sub => product.subs.some(prodSub => prodSub._id === sub._id))
    .map(sub => ({
      value: sub._id,
      label: sub.name,
    }));

  React.useEffect(() => {
    const defaultSubsOption = subCat
      .filter(sub => product.subs.some(prodSub => prodSub._id === sub._id))
      .map(sub => sub._id);
    setDefaultSubs(defaultSubsOption);
  }, [setDefaultSubs, product.subs, subCat]);

  // console.log("defaultSubs", defaultSubs);
  // console.log("selectedSubs", selectedSubs);
  // console.log("subCat", subCat);
  // console.log(subs);
  // console.log(images);
  // console.log(uploadedImages);

  return (
    <div>
      <form
        onSubmit={handleSubmit(data => {
          const subsToSubmit =
            selectedSubs.length > 0 ? selectedSubs : defaultSubs;
          onSubmit(
            {
              ...data,
              subs: subsToSubmit,
              images: [...images, ...uploadedImages],
            },
            reset
          );
        })}
        className='flex flex-col space-y-3'
      >
        <label>Title</label>
        <input
          type='text'
          placeholder='Title'
          className='text-lg outline-none border px-2 py-1 '
          {...register("title", { required: true })}
          defaultValue={title}
        />
        {errors.title && (
          <span className='text-red-500'>Title is required!</span>
        )}
        <label>Description</label>
        <textarea
          type='text'
          placeholder='Description'
          className='text-lg outline-none border px-2 py-1 h-[120px] resize-none'
          {...register("description", { required: true, maxLength: 2000 })}
          defaultValue={description}
        />
        {errors.description && (
          <span className='text-red-500'>Description is required!</span>
        )}
        <div className='flex flex-wrap items-center justify-around'>
          <div className='flex flex-col space-y-1'>
            <label>Price</label>
            <input
              type='number'
              placeholder='Price'
              {...register("price", { required: true })}
              className='text-lg outline-none border px-2 py-1 '
              defaultValue={price}
            />
            {errors.price && (
              <span className='text-red-500'>Price is required!</span>
            )}
          </div>

          <div className='flex flex-col space-y-1'>
            <label>Quantity</label>
            <input
              type='number'
              placeholder='Quantity'
              {...register("quantity", { required: true })}
              className='text-lg outline-none border px-2 py-1 '
              defaultValue={quantity}
            />
            {errors.quantity && (
              <span className='text-red-500'>Quantity is required!</span>
            )}
          </div>
        </div>
        <div className='flex items-center flex-wrap justify-between'>
          <div className='flex flex-col space-y-1'>
            <label>Shipping</label>
            <select
              {...register("shipping", { required: true })}
              className='text-lg outline-none border px-2 py-1 '
              defaultValue={shipping}
            >
              <option value='No'>No</option>
              <option value='Yes'>Yes</option>
            </select>
            {errors.shipping && (
              <span className='text-red-500'>Shipping is required!</span>
            )}
          </div>
          <div className='flex flex-col space-y-1'>
            <label>Colors</label>
            <select
              {...register("color", { required: true })}
              className='text-lg outline-none border px-2 py-1 '
              defaultValue={color}
            >
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
              defaultValue={brand}
            >
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
            onChange={handleCategory}
            defaultValue={category._id}
          >
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

        <>
          {subCat && subCat.length > 0 && (
            <>
              <label>Sub-category</label>
              <Select
                isMulti
                options={options}
                defaultValue={defaultSubsOptions}
                className='basic-multi-select text-lg'
                classNamePrefix='select'
                onChange={handleSubSelectChange}
                required
              />
            </>
          )}
        </>

        <Button
          type='submit'
          colorScheme='teal'
          className='hover:cursor-pointer  uppercase font-semibold'
        >
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default ProductUpdateForm;
