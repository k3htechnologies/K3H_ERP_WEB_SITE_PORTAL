import { useEffect, useMemo, useState } from "react";

import type {
  FilterInfo,
  SortInfo,
  TableColumn,
} from "@/shared/components/DataTable/DataTable";
import usePagination from "@/shared/hooks/usePagination";
import { formatDate_dd_MonthName_yy } from "@/shared/utils/dateFormat";
import { useFetchBooking } from "./useFetchBooking";
import { getSortByParam } from "@/shared/utils/sortingColumnDetails";
import useDebouncedCallback from "@/shared/hooks/useDebouncedCallback";

export interface BookingFilters extends FilterInfo {
  mobileNumber: string;
  fromDate: string;
  toDate: string;
  wing: string;
  flat: string;
  floor: string;
  source: string;
  subSource: string;
  subSubSource: string;
  agreementValue: string;
  bookingType: string;
}

export const initialFilterState = {
  mobileNumber: "",
  fromDate: "",
  toDate: "",
  wing: "",
  flat: "",
  floor: "",
  source: "",
  subSource: "",
  subSubSource: "",
  agreementValue: "",
  bookingType: "",
};

export const useBookingTable = (projectId: string) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<BookingFilters>(initialFilterState);
  const [sortInfo, setSortInfo] = useState<SortInfo | undefined>(undefined);
  const { pagination, setPagination, resetPagination } = usePagination();

  //#region  column setup
  const bookingColumns = useMemo<TableColumn[]>(
    () => [
      {
        key: "SystemGeneratedCode",
        label: "Booking Code",
        width: "20",
        sortable: false,
        fixed: "left",
        align: "left",
        render: (value) => value,
        // <TooltipText
        //     text={value || '-'}
        //     maxWidth="150px"
        //     tooltipThreshold={20}
        //     tooltipClassName="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 overflow-hidden text-ellipsis whitespace-nowrap"
        // />
      },
      {
        key: "ApplicantName",
        label: "Applicant Name",
        width: "20",
        sortable: true,
        align: "left",
        render: (value, row) => (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="min-w-0">
                {value}
                {/* <TooltipText
                                        text={value || '-'}
                                        maxWidth="260px"
                                        tooltipThreshold={26}
                                        onClick={() => handleViewBookingDetails(row)}
                                    /> */}
              </div>
            </div>
          </div>
        ),
      },
      // {
      //   key: "BookingType",
      //   label: "Booking Type",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      {
        key: "FlatNo",
        label: "Flat",
        width: "12",
        sortable: true,
        align: "left",
        render: (value) => value || "-",
      },
      {
        key: "WingName",
        label: "Wing",
        width: "10",
        sortable: false,
        align: "left",
        render: (value) => value || "-",
      },
      {
        key: "FloorName",
        label: "Floor",
        width: "10",
        sortable: false,
        align: "left",
        render: (value) => value || "-",
      },
      {
        key: "AgreementValue",
        label: "Agreement Value (₹)",
        width: "18",
        sortable: false,
        align: "right",
        render: (value) =>
          value ? `₹${Number(value).toLocaleString("en-IN")}` : "-",
      },
      {
        key: "RegistrationDate",
        label: "Expected Registration Date",
        width: "16",
        sortable: false,
        align: "center",
        render: (value) => (value ? formatDate_dd_MonthName_yy(value) : "-"),
      },
      // {
      //   key: "ApprovalStatus",
      //   label: "Approval Status",
      //   width: "18",
      //   sortable: false,
      //   align: "center",
      //   render: (value, row) => value,
      //   <ApprovalActions
      //       approvalStatus={value || "-"}
      //       showApproval={row.IsApproval}
      //       isIcons={true}
      //       onHistory={() => handleApprovalLog(row)}
      //       onApprove={() => handleApproveRejectDocument(row, "approve")}
      //       onReject={() => handleApproveRejectDocument(row, "reject")}
      //   />
      // },
    ],
    [],
  );
  const requiredBookingColumnKeys: string[] = ["ApplicantName"];
  const allBookingColumnKeys: string[] = bookingColumns.map((c) => c.key);
  const [selectedBookingColumnKeys, setSelectedBookingColumnKeys] = useState<
    string[]
  >(() => {
    try {
      const saved = null;
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        const withRequired = Array.from(
          new Set([...parsed, ...requiredBookingColumnKeys]),
        );
        return withRequired.filter((k) => allBookingColumnKeys.includes(k));
      }
    } catch {
      // ignore
    }
    return allBookingColumnKeys;
  });
  useEffect(() => {
    setSelectedBookingColumnKeys((prev) =>
      Array.from(new Set([...prev, ...requiredBookingColumnKeys])).filter((k) =>
        allBookingColumnKeys.includes(k),
      ),
    );
  }, [bookingColumns.length]);
  const visibleBookingColumns = useMemo(
    () =>
      bookingColumns.filter((col) =>
        selectedBookingColumnKeys.includes(col.key),
      ),
    [bookingColumns, selectedBookingColumnKeys],
  );
  //#endregion

  //#region Data Fetching
  const { data, loading, error } = useFetchBooking({
    ProjectId: projectId,
    Name: search,
    PageNumber: pagination.currentPage,
    PageSize: pagination.pageSize,
    ...filters,
    sortBy: sortInfo ? getSortByParam(sortInfo, bookingColumns) : undefined,
  });
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

  //#region  Pagination
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

  //#region  Filter
  const applyFilters = (values: BookingFilters) => {
    setFilters(values);
    setPagination({
      currentPage: 1,
    });
  };

  const clearFilters = () => {
    setFilters(initialFilterState);
    setPagination({
      currentPage: 1,
    });
  };
  //#endregion

  //#region Sort
  const handleSortColumn = (sort: SortInfo) => {
    setSortInfo(sort);
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
    filters,
    applyFilters,
    clearFilters,
    sortInfo,
    handleSortColumn,
    visibleBookingColumns,
    requiredBookingColumnKeys,
    selectedBookingColumnKeys,
    bookingColumns,
    setSelectedBookingColumnKeys,
  };
};
