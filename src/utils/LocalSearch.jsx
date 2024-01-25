/* eslint-disable react/prop-types */

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchField = e => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div className='w-full flex items-center justify-center mx-auto'>
      <input
        type='search'
        placeholder='Filter'
        value={keyword}
        onChange={handleSearchField}
        className='w-1/2 text-lg px-5 py-3 border border-emerald-400 outline-none'
      />
    </div>
  );
};

export default LocalSearch;
