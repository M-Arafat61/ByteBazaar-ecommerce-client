import React from "react";
import { toast } from "react-toastify";
import { createProductData } from "../../../api/product";
import { useSelector } from "react-redux";
import ProductForm from "../../../components/admin/Forms/ProductForm";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCategoriesData,
  getCategorySubsData,
} from "../../../api/category";
// import Loader from "../../../components/shared/Loader";
import FileUpload from "../../../components/admin/Forms/FileUpload";

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
const brands = ["Dell", "MSI", "Microsoft", "Razer", "Samsung", "Apple"];

const CreateProduct = () => {
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [subs, setSubs] = React.useState([]);
  const [selectedSubs, setSelectedSubs] = React.useState([]);
  const [uploadedImages, setUploadedImages] = React.useState([]);
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
    // console.log(data);
    try {
      const response = await createProductData(data, token);
      // console.log(response.data);
      if (response.status == "200") {
        setLoading(false);
        toast.success(`Product creation successful.`);
        setSubs([]);
        resetForm();
        setUploadedImages([]);
      }
    } catch (error) {
      setLoading(false);
      resetForm();
      toast.error(error.response.data.error);
    }
  };

  const handleCategory = async e => {
    setLoading(true);
    e.preventDefault();
    setSelectedSubs([]);
    const id = e?.target?.value;
    try {
      setSubs([]);
      const res = await getCategorySubsData(id);
      setLoading(false);
      setSubs(res?.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const options = subs?.map(sub => ({
    value: sub?._id,
    label: sub?.name,
  }));

  const handleSubSelectChange = selectedOptions => {
    setSelectedSubs(selectedOptions.map(option => option.value));
  };

  // console.log(loading);
  return (
    <div className='space-y-5'>
      <div className='w-full md:w-1/2 mx-auto text-xl md:text-3xl font-bold'>
        {/* {loading ? (
          <div className='text-red-500'>
            <Loader />
          </div>
        ) : ( */}
        <p>Create Product</p>
        {/* )} */}
      </div>
      <div className='border px-10 py-5 rounded-2xl'>
        <FileUpload
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />
        <ProductForm
          colors={colors}
          brands={brands}
          onSubmit={onSubmit}
          categories={categories}
          handleCategory={handleCategory}
          subs={subs}
          selectedSubs={selectedSubs}
          handleSubSelectChange={handleSubSelectChange}
          options={options}
          uploadedImages={uploadedImages}
        />
      </div>
    </div>
  );
};

export default CreateProduct;
