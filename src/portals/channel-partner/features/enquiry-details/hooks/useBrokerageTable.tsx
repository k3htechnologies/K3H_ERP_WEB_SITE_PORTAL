import { useEffect, useMemo, useState } from "react";

import usePagination from "@/shared/hooks/usePagination";
import type {
  FilterInfo,
  SortInfo,
  TableColumn,
} from "@/shared/components/DataTable/DataTable";
import TooltipText from "@/shared/components/Tooltip/TooltipText";
import { formatCurrency } from "@/shared/utils/comman";
import { useFetchBrokerage } from "./useFetchBrokerage";
import { getSortByParam } from "@/shared/utils/sortingColumnDetails";
import useDebouncedCallback from "@/shared/hooks/useDebouncedCallback";
import { useNavigate } from "react-router-dom";

export interface BrokerageFilters extends FilterInfo {
  channelPartnerCompanyName: string;
  channelPartnerMobileNumber: string;
  applicantName: string;
  applicantMobileNumber: string;
  wing: string;
  floor: string;
  flat: string;
  agreementValue: string;
  bookingType: string;
  fromDate: string;
  toDate: string;
}

export const initialFilterState = {
  channelPartnerCompanyName: "",
  channelPartnerMobileNumber: "",
  applicantName: "",
  applicantMobileNumber: "",
  wing: "",
  floor: "",
  flat: "",
  agreementValue: "",
  bookingType: "",
  fromDate: "",
  toDate: "",
};
export const useBrokrageTable = (projectId: string) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<BrokerageFilters>(initialFilterState);
  const [sortInfo, setSortInfo] = useState<SortInfo | undefined>(undefined);
  const { pagination, setPagination, resetPagination } = usePagination();
  const navigate = useNavigate();

  //#region Column Setup
  const BrokerageBookingColumns = useMemo<TableColumn[]>(
    () => [
      {
        key: "ChannelPartnerName",
        label: "CP Name",
        width: "15",
        sortable: true,
        fixed: "left",
        align: "left",
        render: (value: any, row: any) => {
          return (
            <TooltipText
              text={value || "-"}
              maxWidth="250px"
              tooltipThreshold={25}
              onClick={() => {
                navigate(
                  `/channelPartner/enquiryDetails/${projectId}/invoiceView/${row.BookingId}`,
                );
              }}
            />
          );
        },
      },
      {
        key: "ChannelPartnerCompany",
        label: "CP Company",
        width: "25",
        sortable: false,
        align: "left",
        render: (value: any) => value || "-",
      },
      {
        key: "ChannelPartnerMobileNumber",
        label: "CP Mobile Number",
        width: "25",
        sortable: false,
        align: "left",
        render: (value: any) => (value ? `+91 ${value}` : "-"),
      },
      {
        key: "SystemGeneratedCode",
        label: "Enquiry Code",
        width: "20",
        sortable: false,
        align: "left",
        render: (value: any) => (
          <TooltipText
            text={value || "-"}
            maxWidth="150px"
            tooltipThreshold={20}
            tooltipClassName="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 overflow-hidden text-ellipsis whitespace-nowrap"
          />
        ),
      },
      {
        key: "ApplicantName",
        label: "Applicant Name",
        width: "25",
        sortable: false,
        align: "left",
        render: (value: any) => value || "-",
      },
      {
        key: "ApplicantMobileNumber",
        label: "Mobile Number",
        width: "25",
        sortable: false,
        align: "left",
        render: (value: any) => (value ? `+91 ${value}` : "-"),
      },
      {
        key: "UnitGroup",
        label: "Unit",
        align: "center",
        children: [
          {
            key: "BuildingNumber",
            label: "Building",
            width: "25",
            sortable: false,
            align: "left",
            render: (value: any) => value || "-",
          },
          {
            key: "Wing",
            label: "Wing",
            width: "25",
            sortable: false,
            align: "left",
            render: (value: any) => value || "-",
          },
          {
            key: "Flat",
            label: "Flat",
            width: "25",
            sortable: false,
            align: "left",
            render: (value: any) => value || "-",
          },
          {
            key: "FlatType",
            label: "Type",
            width: "25",
            sortable: false,
            align: "left",
            render: (value: any) => value || "-",
          },
          {
            key: "FlatConfiguration",
            label: "Configuration",
            width: "25",
            sortable: false,
            align: "left",
            render: (value: any) => value || "-",
          },
          {
            key: "RERACarpetAreaSqFt",
            label: "RERA Carpet Area (SqFt)",
            width: "25",
            sortable: false,
            align: "left",
            render: (value: any) => (value ? `${value} Sq ft` : "-"),
          },
        ],
      },
      {
        key: "BrokeragePercentage",
        label: "Brokerage (%)",
        width: "25",
        sortable: false,
        align: "right",
        render: (value: any) => (value ? `${value}%` : "-"),
      },

      {
        key: "AmountGroup",
        label: "Amount",
        align: "center",
        children: [
          {
            key: "AgreementValue",
            label: "Agreement (₹)",
            align: "right",
            render: (value: any) => (value ? formatCurrency(value) : "0"),
          },
          {
            key: "BrokerageAmount",
            label: "Brokerage (₹)",
            align: "right",
            render: (value: any) => (value ? formatCurrency(value) : "0"),
          },
          {
            key: "InvoiceAmount",
            label: "Raise Invoice (₹)",
            align: "right",
            render: (value: any) => (value ? formatCurrency(value) : "0"),
          },

          {
            key: "PaymentPaidAmount",
            label: "Account Paid (₹)",
            align: "right",
            render: (value: any) => (value ? formatCurrency(value) : "0"),
          },
          {
            key: "OutstandingAmount",
            label: "Pending (₹)",
            align: "right",
            render: (_value: any, row: any) => {
              const brokerageAmount = Number(row.BrokerageAmount) || 0;
              const paidBrokerageAmount = Number(row.PaymentPaidAmount) || 0;
              const outstandingAmount = brokerageAmount - paidBrokerageAmount;
              return `₹ ${outstandingAmount.toFixed(2)}`;
            },
          },
        ],
      },
    ],
    [],
  );
  const requiredBrokerageBookingColumnKeys: string[] = [
    "ChannelPartnerName",
    "Actions",
  ];
  const allBrokerageBookingColumnKeys: string[] = BrokerageBookingColumns.map(
    (c) => c.key,
  );
  useEffect(() => {
    setSelectedBrokerageBookingColumnKeys((prev) =>
      Array.from(
        new Set([...prev, ...requiredBrokerageBookingColumnKeys]),
      ).filter((k) => allBrokerageBookingColumnKeys.includes(k)),
    );
  }, [BrokerageBookingColumns.length]);
  const [
    selectedBrokerageBookingColumnKeys,
    setSelectedBrokerageBookingColumnKeys,
  ] = useState<string[]>(() => {
    // try {
    // const saved = LocalStorageHelper.getBrokerageBookingTableColumns?.();
    //     if (saved) {
    //         const parsed = JSON.parse(saved) as string[]
    //         const withRequired = Array.from(new Set([
    //             ...parsed, ...requiredBrokerageBookingColumnKeys]));
    //         return withRequired.filter(k => allBrokerageBookingColumnKeys.includes(k));
    //     }
    // } catch { }
    return allBrokerageBookingColumnKeys;
  });

  const visibleBrokerageBookingColumns = useMemo(
    () =>
      BrokerageBookingColumns.filter((col) =>
        selectedBrokerageBookingColumnKeys.includes(col.key),
      ),
    [BrokerageBookingColumns, selectedBrokerageBookingColumnKeys],
  );
  //#endregion

  //#region Data Fetching
  const { data, loading, error } = useFetchBrokerage({
    ProjectId: projectId,
    Name: search,
    PageNumber: pagination.currentPage,
    PageSize: pagination.pageSize,
    ...filters,
    sortBy: sortInfo
      ? getSortByParam(sortInfo, BrokerageBookingColumns)
      : undefined,
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
  const applyFilters = (values: BrokerageFilters) => {
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
    visibleBrokerageBookingColumns,
    requiredBrokerageBookingColumnKeys,
    selectedBrokerageBookingColumnKeys,
    BrokerageBookingColumns,
    setSelectedBrokerageBookingColumnKeys,
  };
};
