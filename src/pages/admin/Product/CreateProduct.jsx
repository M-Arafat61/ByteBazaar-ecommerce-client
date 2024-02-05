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
import Loader from "../../../components/shared/Loader";
import FileUpload from "../../../components/admin/Forms/FileUpload";
import { Image, Stack } from "@chakra-ui/react";
import { CiCircleRemove } from "react-icons/ci";
import { axiosPublic } from "../../../hooks/useAxiosPublic";

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

  // const handleFileUploadState = images => {
  //   setUploadedImages(images);
  // };
  const handleImageRemove = public_id => {
    setLoading(true);
    axiosPublic
      .post(
        "/v1/removeImage",
        { public_id },
        {
          headers: {
            authtoken: token,
          },
        }
      )
      .then(res => {
        if (res) {
          setLoading(false);
          const filteredImages = uploadedImages.filter(image => {
            return image.public_id !== public_id;
          });
          setUploadedImages(filteredImages);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const onSubmit = async (data, resetForm) => {
    setLoading(true);
    console.log(data);
    // try {
    //   const response = await createProductData(data, token);
    //   console.log(response.data);
    //   if (response.status == "200") {
    //     setLoading(false);
    //     toast.success(`Product creation successful.`);
    //     // resetForm();
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   resetForm();
    //   toast.error(error.response.data.error);
    // }
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

  // console.log(selectedSubs);
  return (
    <div className='space-y-5'>
      <div className='w-full md:w-1/2 mx-auto text-xl md:text-3xl font-bold'>
        {loading ? (
          <div className='text-red-500'>
            <Loader />
          </div>
        ) : (
          <p>Create Product</p>
        )}
      </div>
      <div className='border px-10 py-5 rounded-2xl'>
        <div className='flex items-center gap-x-10'>
          <FileUpload setUploadedImages={setUploadedImages} />
          {uploadedImages.length > 0 &&
            uploadedImages.map(image => (
              <div className='relative' key={image.public_id}>
                <Image boxSize='140px' src={image.url} alt='Product Image' />

                <CiCircleRemove
                  size={38}
                  className='absolute right-0 top-0 text-red-600 cursor-pointer'
                  onClick={() => handleImageRemove(image.public_id)}
                />
              </div>
            ))}
        </div>

        <ProductForm
          uploadedImages={uploadedImages}
          colors={colors}
          brands={brands}
          onSubmit={onSubmit}
          categories={categories}
          handleCategory={handleCategory}
          subs={subs}
          selectedSubs={selectedSubs}
          handleSubSelectChange={handleSubSelectChange}
          options={options}
        />
      </div>
    </div>
  );
};

export default CreateProduct;
