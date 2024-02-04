import { useState } from "react";

import { getAllCategoriesData } from "../../../api/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import LocalSearch from "../../../utils/LocalSearch";
import { createSubData, getAllSubsData, removeSubData } from "../../../api/sub";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { FaDeleteLeft } from "react-icons/fa6";
import Loader from "../../../components/shared/Loader";
import CategoryForm from "../../../components/admin/Forms/CategoryForm";

const CreateSub = () => {
  const { token } = useSelector(state => state.user.userinfo);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getAllCategoriesData();
      return res.data;
    },
  });
  const { data: subs = [], refetch } = useQuery({
    queryKey: ["subs"],
    queryFn: async () => {
      const res = await getAllSubsData();
      return res.data;
    },
  });
  //   console.log(subs);

  const handleSearched = keyword => cat =>
    cat.name.toLowerCase().includes(keyword);

  const onSubmit = async (data, resetForm) => {
    setLoading(true);
    const name = data.category;
    // console.log(data);
    try {
      const response = await createSubData({ name, parent: category }, token);
      if (response.status == "200") {
        setLoading(false);
        refetch();
        toast.success(`sub-category ${name} is created`);
        resetForm();
      }
    } catch (error) {
      console.log(error);
      resetForm();
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleCategoryDelete = async slug => {
    // console.log(slug);
    toast.info(
      <>
        <p>{`Are you sure to delete sub-category ${slug} ?`}</p>
        <div className='flex gap-x-5 mt-5'>
          <button
            className='px-2 py-1 bg-red-500 text-white font-semibold'
            onClick={() => confirmCategoryDelete(slug)}
          >
            Yes
          </button>
          <button
            className='px-2 py-1 bg-emerald-500 text-white font-semibold'
            onClick={toast.dismiss}
          >
            No
          </button>
        </div>
      </>,
      { autoClose: false }
    );
  };
  const confirmCategoryDelete = async slug => {
    try {
      setLoading(true);
      const response = await removeSubData(slug, token);
      if (response.status == "200") {
        setLoading(false);
        toast.dismiss();
        refetch();
        toast.success(`sub-category ${slug} deleted successfully`);
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Error deleting sub-category");
    }
  };
  // console.log("Keyword:", keyword);
  // console.log(
  //   "Filtered Categories:",
  //   categories.filter(handleSearched(keyword))
  // );
  //   console.log("parent:", category);
  return (
    <div className='space-y-5'>
      <div className='w-full md:w-1/2 mx-auto text-2xl md:text-3xl font-bold'>
        {loading ? <Loader /> : <p>Create sub-category</p>}
      </div>
      <div className='w-full md:w-1/2 mx-auto space-x-2'>
        <label className='text-xl'>Parent category:</label>
        <select
          className='border border-emerald-500 outline-none py-1 hover:shadow-lg hover:font-semibold hover:rounded-r-2xl'
          name='category'
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option defaultValue defaultChecked>
            Select category
          </option>
          {categories.length > 0 &&
            categories.map(cat => (
              <option key={cat._id} value={cat._id} className=''>
                {cat.name}
              </option>
            ))}
        </select>
      </div>
      <CategoryForm onSubmit={onSubmit} />

      <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      <hr />
      <div className='w-full container mx-auto'>
        {subs.filter(handleSearched(keyword)).map((sub, idx) => (
          <div
            key={sub._id}
            className='bg-gray-200/100 mb-4 flex items-center justify-between'
          >
            <h3 className=' text-xl font-medium px-3 w-full'>
              {idx + 1}. {sub.name}
            </h3>
            <div className='flex gap-x-5 text-3xl'>
              <Link
                to={`/admin/sub/${sub.slug}`}
                className='hover:bg-emerald-400 rounded-full px-4 py-4'
              >
                <AiFillEdit color='#008000' />
              </Link>
              <Link
                onClick={() => handleCategoryDelete(sub.slug)}
                className='hover:bg-red-400 rounded-full px-4 py-4'
              >
                <FaDeleteLeft className='text-red-500 hover:text-red-800' />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSub;
