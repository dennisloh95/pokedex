import { DOTS } from "../utils/config";
import { usePagination } from "../utils/hooks";
import { PaginationTypes } from "../utils/types";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const getButtonStyle = (active?: boolean) =>
  `w-7 h-7 flex items-center justify-center rounded-md disabled:opacity-75 disabled:cursor-not-allowed ${
    active ? "bg-blue-500 text-white" : ""
  }`;

const Pagination = ({
  currentPage,
  totalCount,
  siblingCount = 1,
  pageSize,
  onPageChange,
}: PaginationTypes & { onPageChange: (currPage: number) => void }) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex items-center justify-between border-t border-gray-400 px-4 py-6 my-6">
      <button
        onClick={onPrevious}
        className={getButtonStyle()}
        disabled={currentPage === 1}
      >
        <div>
          <AiOutlineLeft />
        </div>
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <div key={index}>...</div>;
        }

        return (
          <button
            key={index}
            className={getButtonStyle(pageNumber === currentPage)}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        onClick={onNext}
        className={getButtonStyle()}
        disabled={currentPage === lastPage}
      >
        <div>
          <AiOutlineRight />
        </div>
      </button>
    </div>
  );
};

export default Pagination;
