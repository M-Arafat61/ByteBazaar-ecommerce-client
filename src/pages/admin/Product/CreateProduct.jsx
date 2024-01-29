import React from "react";
import { toast } from "react-toastify";
import { createProductData } from "../../../api/product";
import { useSelector } from "react-redux";
import ProductForm from "../../../components/admin/Product/ProductForm";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCategoriesData,
  getCategorySubsData,
} from "../../../api/category";

const CreateProduct = () => {
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [subs, setSubs] = React.useState([]);
  const [selectedSubs, setSelectedSubs] = React.useState([]);

  const { token } = useSelector(state => state.user.userinfo);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getAllCategoriesData();
      return res?.data;
    },
  });

  React.useEffect(() => {
    if (!isLoading) {
      setCategories(data);
    }
  }, [isLoading, data]);

  const onSubmit = async (data, resetForm) => {
    setLoading(true);
    console.log(data);
    try {
      const response = await createProductData(data, token);
      console.log(response.data);
      if (response.status == "200") {
        setLoading(false);
        toast.success(`Product creation successful.`);
        // resetForm();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const handleCategory = async e => {
    e.preventDefault();
    const id = e?.target?.value;
    try {
      const res = await getCategorySubsData(id);
      setSubs(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubSelectChange = selectedOptions => {
    setSelectedSubs(selectedOptions.map(option => option.value));
  };

  // console.log(selectedSubs);
  return (
    <div className='space-y-5'>
      <div className='w-full md:w-1/2 mx-auto text-xl md:text-3xl font-bold'>
        {loading ? (
          <p className='text-red-500'>Loading</p>
        ) : (
          <p>Create Product</p>
        )}
      </div>
      <div className='border px-10 py-5 rounded-2xl'>
        <ProductForm
          onSubmit={onSubmit}
          categories={categories}
          handleCategory={handleCategory}
          subs={subs}
          selectedSubs={selectedSubs}
          handleSubSelectChange={handleSubSelectChange}
        />
      </div>
    </div>
  );
};

export default CreateProduct;
