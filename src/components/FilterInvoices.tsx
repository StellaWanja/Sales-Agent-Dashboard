const FilterInvoices = ({ filter, setFilter }) => {
  return (
    <>
      <label>Filter: </label>
      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value as "all" | "completed" | "pending")
        }
        className="cursor-pointer mt-4 border-2 px-8 py-1 rounded-md"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </>
  );
};

export default FilterInvoices;
