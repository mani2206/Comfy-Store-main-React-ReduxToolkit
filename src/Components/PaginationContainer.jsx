import { useLoaderData, useNavigate, useLocation } from "react-router-dom";

const PaginationContainer = () => {
  // Getting pageCount & page data from the meta data
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  // useLocation Hook
  const { search, pathname } = useLocation();

  // useNavigate Hook
  const navigate = useNavigate();

  // Create Pages Array
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  // Handle Page Change Function
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  // Conditional Rendering
  if (pageCount < 2) return null;

  // JSX
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        {/* PREV BUTTON*/}
        <button
          onClick={() => {
            let prevPage = page - 1;
            if (page < 2) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
          className="btn btn-xs sm:btn-md join-item"
        >
          Prev
        </button>

        {/* PAGES BUTTONS*/}
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`btn btn-xs sm:btn-md join-item ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
              onClick={() => {
                handlePageChange(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* NEXT BUTTON*/}
        <button
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
          className="btn btn-xs sm:btn-md join-item"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default PaginationContainer;
