import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useGetAllBoardsInWorkspaceQuery } from "../api/board.api";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import { isFetchBaseQueryError } from "@/utils/errorGuards";
import { showErrorToast } from "@/lib/toastHandler";
import MainLoader from "@/components/shared/MainLoader";
import { Link, useSearchParams } from "react-router-dom";
import CustomPagination from "@/components/shared/Pagination";
import useDebounce from "@/hooks/useDebounce";
import BoardCard from "./BoardCard";

function BoardList() {
  const workspaceId = useWorkspaceId();
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);
  const search = params.get("search") || "";

  const [inputValue, setInputValue] = useState(search);
  const debouncedSearch = useDebounce(inputValue, 500);

  //  Update URL when debounced search changes
  useEffect(() => {
    const newParams = new URLSearchParams(params);
    newParams.set("search", debouncedSearch);
    newParams.set("page", "1"); // reset page when search changes
    setParams(newParams);
  }, [debouncedSearch]);

  const { data, error, isError, isFetching } = useGetAllBoardsInWorkspaceQuery({
    workspaceId,
    page: page,
    pageSize: 9,
    search,
  });
  const boards = data?.boards || [];
  const pagination = data?.pagination ?? {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  };

  useEffect(() => {
    if (isError && error && isFetchBaseQueryError(error)) {
      if (
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
      ) {
        const message = (error.data as { message: string }).message;
        showErrorToast(message);
      }
    }
  }, [isError, error]);

  const goToPage = (newPage: number) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", String(newPage));
    setParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search */}
      <div className="mb-4 lg:mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-muted" />
          <Input
            placeholder="Search boards..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="pl-10  border-gray-boarder text-sm"
          />
        </div>
      </div>

      {/* Boards Grid */}
      {isFetching ? (
        <MainLoader className="mt-10"></MainLoader>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 gap-6">
            {boards.map((board) => (
              <Link to={board._id} key={board._id}>
                <BoardCard board={board} key={board._id} />
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8">
            <CustomPagination
              pagination={pagination}
              currentPage={page}
              goToPage={goToPage}
            />
          </div>
        </>
      )}
      {boards.length === 0 && !isFetching && (
        <div className="text-center py-12">
          <p className="text-text">No boards found matching your search.</p>
        </div>
      )}
    </div>
  );
}

export default BoardList;
