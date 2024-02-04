/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCategoryData, updateCategoryData } from "../../../api/category";
import { useQuery } from "@tanstack/react-query";
import CategoryForm from "../../../components/admin/Forms/CategoryForm";

const UpdateCategory = () => {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const { slug } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.user.userinfo);

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await getCategoryData(slug);
      return res.data;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setName(data?.name);
    }
  }, [isLoading, data?.name]);

  //   console.log(name);

  const onSubmit = async (data, resetForm) => {
    setLoading(true);
    const name = data.category;
    // console.log(name);
    try {
      const response = await updateCategoryData(slug, { name }, token);
      if (response.status == "200") {
        setLoading(false);
        resetForm();
        navigate("/admin/category");
        toast.success(`Category ${name} is updated`);
      }
    } catch (error) {
      console.log(error);
      //   resetForm();
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className='space-y-5'>
      <div className='w-full md:w-1/2 mx-auto text-xl md:text-3xl font-bold'>
        {loading ? (
          <p className='text-red-500'>Loading</p>
        ) : (
          <p>Update Category</p>
        )}
      </div>
      <CategoryForm onSubmit={onSubmit} name={name} />
      <hr />
    </div>
  );
};

export default UpdateCategory;
