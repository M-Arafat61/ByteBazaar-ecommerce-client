import { useState } from "react";
import CategoryForm from "../../../components/admin/Category/CategoryForm";
import { createCategoryData } from "../../../api/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Category = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector(state => state.user.userinfo);

  const onSubmit = async (data, resetForm) => {
    setLoading(true);
    const name = data.category;
    // console.log(name);
    try {
      const response = await createCategoryData({ name }, token);
      console.log(response);
      setLoading(false);
      toast.success(`Category ${name} is created`);
      resetForm();
    } catch (error) {
      console.log(error);
      resetForm();
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className=''>
      <CategoryForm onSubmit={onSubmit} />
    </div>
  );
};

export default Category;
