/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getSubData, updateSubData } from "../../../api/sub";
import Loader from "../../../components/shared/Loader";
import { getAllCategoriesData } from "../../../api/category";
import CategoryForm from "../../../components/admin/Forms/CategoryForm";

const UpdateSubCategory = () => {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [parent, setParent] = React.useState("");
  const { slug } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.user.userinfo);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getAllCategoriesData();
      return res.data;
    },
  });

  const { data: sub = {}, isLoading } = useQuery({
    queryKey: ["sub"],
    queryFn: async () => {
      const res = await getSubData(slug);
      return res.data;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setName(sub?.name);
      setParent(sub?.parent);
    }
  }, [isLoading, sub?.name, sub?.parent]);

  // console.log(parent);

  const onSubmit = async (data, resetForm) => {
    setLoading(true);
    const name = data.category;

    try {
      const response = await updateSubData(slug, { name, parent }, token);
      if (response.status == "200") {
        setLoading(false);
        resetForm();
        navigate("/admin/sub");
        toast.success(`sub-category ${name} is updated`);
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
      <div className='w-full md:w-1/2 mx-auto text-2xl md:text-3xl font-bold'>
        {loading ? <Loader /> : <p>Update sub-category</p>}
      </div>
      <div className='w-full flex flex-col md:w-1/2 mx-auto space-y-2'>
        <label className='text-xl'>Update parent category:</label>
        <select
          className='w-1/2 border border-emerald-500 outline-none py-1 hover:shadow-lg hover:font-semibold hover:rounded-r-2xl'
          name='category'
          onChange={e => setParent(e.target.value)}
        >
          <option value=''>Select category</option>
          {categories.length > 0 &&
            categories.map(cat => (
              <option
                key={cat._id}
                value={cat._id}
                selected={cat._id === parent}
              >
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <CategoryForm onSubmit={onSubmit} name={name} />
      <hr />
    </div>
  );
};

export default UpdateSubCategory;
