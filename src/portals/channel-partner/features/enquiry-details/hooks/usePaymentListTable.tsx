import useDebouncedCallback from "@/shared/hooks/useDebouncedCallback";
import { useFetchPayments } from "./useFetchPayments";
import { useEffect, useState } from "react";
import usePagination from "@/shared/hooks/usePagination";

export const usePaymentListTable = (
  projectId: string = "",
  bookingId: string = "",
) => {
  const [search, setSearch] = useState("");
  const { pagination, setPagination, resetPagination } = usePagination();

  //#region Data Fetching
  const { data, loading, error } = useFetchPayments({
    PageNumber: pagination.currentPage,
    PageSize: pagination.pageSize,
    ProjectId: projectId,
    BookingId: bookingId,
    InvoiceNumber: search,
  });
  //#endregion

  //#region Pagination
  const handlePageChange = (page: number) => {
    setPagination({
      currentPage: page,
    });
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination({
      pageSize,
      currentPage: 1,
    });
  };
  //#endregion

  //#region Search
  const debouncedSearch = useDebouncedCallback((value: string) => {
    const trimmed = value.trim();
    if (trimmed === "") {
      return;
    }
    setSearch(value);
    setPagination({
      currentPage: 1,
    });
  }, 350);
  const handleSearchEnquiry = (searchValue: string) => {
    setSearch(searchValue);
    debouncedSearch(searchValue);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel?.();
    };
  }, [debouncedSearch]);

  const clearSearch = () => {
    setSearch("");
    setPagination({
      currentPage: 1,
    });
  };
  //#endregion
  return {
    data,
    loading,
    error,
    search,
    handleSearchEnquiry,
    clearSearch,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    resetPagination,
  };
};
