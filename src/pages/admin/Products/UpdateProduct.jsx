import { getSingleProduct, updateSingleProduct } from "../../../api/product";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";
import { toast } from "react-toastify";
import ProductUpdateForm from "../../../components/admin/Forms/ProductUpdateForm";
import React from "react";
import {
  getAllCategoriesData,
  getCategorySubsData,
} from "../../../api/category";
import FileUpload from "../../../components/admin/Forms/FileUpload";
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
const brands = ["Dell", "MSI", "Microsoft", "Razer", "Samsung", "Apple"];

const UpdateProduct = () => {
  const { slug } = useParams();
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [subCat, setSubCat] = React.useState([]);
  const [selectedSubs, setSelectedSubs] = React.useState([]);
  const [defaultSubs, setDefaultSubs] = React.useState([]);
  const [uploadedImages, setUploadedImages] = React.useState([]);

  const { token } = useSelector(state => state.user.userinfo);
  const navigate = useNavigate();

  const {
    data: product = {},
    isFetching,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await getSingleProduct(slug);
      return response.data;
    },
  });

  const {
    data: allCat = [],
    isLoading,
    isFetching: isCatFetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getAllCategoriesData();
      return res?.data;
    },
  });

  React.useEffect(() => {
    if (product?.category?._id) {
      const fetchSubCategories = async () => {
        try {
          setLoading(true);
          setSubCat([]);
          const res = await getCategorySubsData(product.category._id);
          // console.log(res.data);
          setSubCat(res?.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchSubCategories();
    }
  }, [product]);

  // console.log("uploadedImages", uploadedImages);
  // console.log("product", product);

  React.useEffect(() => {
    if (!isLoading) {
      setCategories(allCat);
    }
  }, [isLoading, allCat]);

  if (isCatFetching) {
    return <Loader />;
  }
  if (isFetching) {
    return <Loader />;
  }
  // if (loading) {
  //   return <Loader />;
  // }

  if (error) {
    return toast.error(error?.message);
  }

  const onSubmit = async (data, resetForm) => {
    try {
      const response = await updateSingleProduct(slug, data, token);

      if (response.status == "200") {
        setLoading(false);
        toast.success(`"${data.title}" updated successfully.`);
        setSubCat([]);
        resetForm();
        setUploadedImages([]);
        navigate("/admin/products");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error);
    }
  };

  const handleCategory = async e => {
    setLoading(true);
    e.preventDefault();
    setSelectedSubs([]);
    const id = e?.target?.value;
    try {
      setSubCat([]);
      setDefaultSubs([]);
      const res = await getCategorySubsData(id);
      setLoading(false);
      setSubCat(res?.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const options = subCat?.map(sub => ({
    value: sub?._id,
    label: sub?.name,
  }));

  const handleSubSelectChange = selectedOptions => {
    setSelectedSubs(selectedOptions.map(option => option.value));
  };

  return (
    <div className='space-y-5'>
      <div className='w-full md:w-1/2 mx-auto text-xl md:text-3xl font-bold'>
        <p>Product Update</p>
      </div>
      <div className='border px-10 py-5 rounded-2xl'>
        <div className='flex items-center gap-x-10'>
          <FileUpload
            images={product.images}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
        </div>
        <ProductUpdateForm
          onSubmit={onSubmit}
          product={product}
          uploadedImages={uploadedImages}
          colors={colors}
          brands={brands}
          handleCategory={handleCategory}
          categories={categories}
          subCat={subCat}
          options={options}
          handleSubSelectChange={handleSubSelectChange}
          selectedSubs={selectedSubs}
          defaultSubs={defaultSubs}
          setDefaultSubs={setDefaultSubs}
        />
      </div>
    </div>
  );
};

export default UpdateProduct;
