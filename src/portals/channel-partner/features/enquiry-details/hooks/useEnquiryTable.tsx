import { useEffect, useMemo, useState } from "react";

import { usePagination } from "@/shared/hooks/usePagination";
import { useFetchEnquiry } from "./useFetchEnquiry";
import useDebouncedCallback from "@/shared/hooks/useDebouncedCallback";
import type {
  SortInfo,
  FilterInfo,
  TableColumn,
} from "@/shared/components/DataTable/DataTable";
import { formatDate_dd_MonthName_yy } from "@/shared/utils/dateFormat";
import { getSortByParam } from "@/shared/utils/sortingColumnDetails";
import { Button } from "@/shared/components/forms";
import useToast from "@/app/providers/ToastProvider/ToastProvider";
import { Copy } from "lucide-react";
import TooltipText from "@/shared/components/Tooltip/TooltipText";
import { copyToClipboard } from "@/shared/utils/comman";

export interface EnquiryFilters extends FilterInfo {
  enquiryCode: string;
  mobileNumber: string;
  budget: string;
  requirementType: string;
  source: string;
  subSource: string;
  subSubSource: string;
  channelPartnerMobile: string;
  nationality: string;
  currentLocation: string;
  customerClassification: string;
  ethnicity: string;
  salesAdvisor: string;
  sourcingManager: string;
  fromDate: string;
  toDate: string;
  accomodation: string;
  followUpDays: string;
  finalStage: string;
}

export const initialFilterState = {
  enquiryCode: "",
  mobileNumber: "",
  budget: "",
  requirementType: "",
  source: "",
  subSource: "",
  subSubSource: "",
  channelPartnerMobile: "",
  nationality: "",
  currentLocation: "",
  customerClassification: "",
  ethnicity: "",
  salesAdvisor: "",
  sourcingManager: "",
  fromDate: "",
  toDate: "",
  accomodation: "",
  followUpDays: "",
  finalStage: "",
};

export const useEnquiryTable = (projectId: string) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<EnquiryFilters>(initialFilterState);
  const [sortInfo, setSortInfo] = useState<SortInfo | undefined>(undefined);
  const { pagination, setPagination, resetPagination } = usePagination();
  const { addToast } = useToast();

  //#region  column setup
  const EnquiryColumns = useMemo<TableColumn[]>(
    () => [
      {
        key: "SystemGeneratedCode",
        label: "Enquiry Code",
        sortable: true,
        fixed: "left",
        align: "left",
        render: (value) => {
          return (
            <div className="flex items-center gap-2">
              <TooltipText
                text={value || "-"}
                maxWidth="150px"
                tooltipThreshold={20}
                tooltipClassName="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 overflow-hidden text-ellipsis whitespace-nowrap"
              />

              {value && (
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const success = await copyToClipboard(value);
                    if (success) {
                      addToast({ type: "success", title: `${value} Copied!` });
                    }
                  }}
                  color="transparent"
                  size="sm"
                  style={{
                    padding: "2px 6px",
                    color: "#6B7280",
                    cursor: "pointer",
                  }}
                  title="Copy"
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          );
        },
      },
      {
        key: "Name",
        label: "Name",
        sortable: true,
        align: "left",
        render: (value, row) => (
          <TooltipText
            text={value || "-"}
            maxWidth="250px"
            tooltipThreshold={25}
            // onClick={() => handleNavigateToView(row)}
          />
        ),
      },

      {
        key: "MobileNumber",
        label: "Mobile Number",
        width: "14",
        sortable: false,
        align: "left",
        render: (value) => (value ? `+91 ${value}` : "-"),
      },
      {
        key: "EnquiryDate",
        label: "Enquiry Date",
        width: "12",
        sortable: false,
        align: "center",
        render: (value?: string) =>
          value ? formatDate_dd_MonthName_yy(value) : "-",
      },
      {
        key: "EnquiryFollowUpDays",
        label: "Enquiry Follow Up Days",
        width: "14",
        sortable: false,
        align: "left",
        render: (value) => value || "-",
      },
      {
        key: "NextFollowUpDate",
        label: "Next Follow-Up Date",
        width: "12",
        sortable: false,
        align: "center",
        render: (value?: string) =>
          value ? formatDate_dd_MonthName_yy(value) : "-",
      },
      {
        key: "FinalStage",
        label: "Stage",
        width: "14",
        sortable: false,
        align: "left",
        render: (value) => {
          // const { bg, text } = getStatusColor(value);

          // return (
          //     <span
          //         className="inline-block px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
          //         style={{
          //             backgroundColor: bg,
          //             color: text
          //         }}
          //     >
          //         {value || "-"}
          //     </span>
          // );
          return value;
        },
      },
      {
        key: "EmailId",
        label: "Email-Id",
        width: "14",
        sortable: false,
        align: "left",
        render: (value) => value || "-",
      },
      // {
      //   key: "OccupationType",
      //   label: "Occupation Type",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "Accommodation",
      //   label: "Accommodation",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "Budget",
      //   label: "Budget (In CR)",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "Requirement",
      //   label: "Requirement",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "RequirementType",
      //   label: "Requirement Type",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "AreaPreferred",
      //   label: "Area Preferred",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "PossessionType",
      //   label: "Possession Type",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "Timeline",
      //   label: "Timeline",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "Ethnicity",
      //   label: "Ethnicity",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "Source",
      //   label: "Source",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "SubSource",
      //   label: "Sub Source",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "SubSubSource",
      //   label: "Sub Sub Source",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value, row) =>
      //     row?.Source === "Channel Partner" ? "-" : value || "-",
      // },
      // {
      //   key: "ChannelPartnerName",
      //   label: "Channel Partner Name",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "ChannelPartnerCompany",
      //   label: "Channel Partner Company",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "ChannelPartnerMobileNumber",
      //   label: "Channel Partner Mobile No",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => (value ? `+91 ${value}` : "-"),
      // },
      // {
      //   key: "CustomerClassification",
      //   label: "Customer Classification",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "Nationality",
      //   label: "Nationality",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },
      // {
      //   key: "DateOfBirth",
      //   label: "Date Of Birth",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => (value ? formatDate_dd_MonthName_yy(value) : "-"),
      // },
      // {
      //   key: "DesiredFloorBand",
      //   label: "Desired Floor Band",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },

      // {
      //   key: "SourceOfFunding",
      //   label: "Source Of Funding",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },

      // {
      //   key: "FinalStageDetail",
      //   label: "Stage Detail",
      //   width: "14",
      //   sortable: false,
      //   align: "left",
      //   render: (value) => value || "-",
      // },

      {
        key: "SalesAdvisor",
        label: "Sales Advisor",
        width: "14",
        sortable: false,
        align: "left",
        render: (value) => value || "-",
      },
      {
        key: "SourcingManager",
        label: "Sourcing Manager",
        width: "14",
        sortable: false,
        align: "left",
        render: (value) => value || "-",
      },
      // {
      //   key: "Actions",
      //   label: "Actions",
      //   width: "12",
      //   fixed: "right",
      //   align: "center",
      //   render: (_value, row) => {
      //     const canDelete = canAction && row?.FinalStage?.toUpperCase() == "";

      //     return (
      //         <div className="flex items-center justify-center gap-2">
      //             <Button
      //                 onClick={(e) => {
      //                     e.preventDefault()
      //                     e.stopPropagation()
      //                     if (!canDelete) return;
      //                     handleConfirmationDialogBoxOpen(row)
      //                 }}
      //                 color="transparent"
      //                 isborderRadius
      //                 disabled={!canDelete}
      //                 size="sm"
      //                 style={{
      //                     color: canDelete ? 'red' : '#9CA3AF',
      //                     padding: '4px 8px',
      //                     cursor: canDelete ? 'pointer' : 'not-allowed',
      //                     opacity: canDelete ? 1 : 0.5
      //                 }}
      //                 title="Delete Enquiry"
      //             >
      //                 <Trash2 className="h-4 w-4" />
      //             </Button>
      //         </div>
      //     )
      //     return _value;
      //   },
      // },
    ],
    [],
  );
  const requiredEnquiryColumnKeys: string[] = ["Name"];
  const allEnquiryColumnKeys: string[] = EnquiryColumns.map((c) => c.key);
  const [selectedEnquiryColumnKeys, setSelectedEnquiryColumnKeys] = useState<
    string[]
  >(() => {
    try {
      const saved = null;

      if (saved) {
        const parsed = JSON.parse(saved) as string[];

        const withRequired = Array.from(
          new Set([...parsed, ...requiredEnquiryColumnKeys]),
        );

        return withRequired.filter((k) => allEnquiryColumnKeys.includes(k));
      }
    } catch {}
    return allEnquiryColumnKeys;
  });
  useEffect(() => {
    setSelectedEnquiryColumnKeys((prev) =>
      Array.from(new Set([...prev, ...requiredEnquiryColumnKeys])).filter((k) =>
        allEnquiryColumnKeys.includes(k),
      ),
    );
  }, [EnquiryColumns.length]);
  const visibleEnquiryColumns = useMemo(
    () =>
      EnquiryColumns.filter((col) =>
        selectedEnquiryColumnKeys.includes(col.key),
      ),
    [EnquiryColumns, selectedEnquiryColumnKeys],
  );
  //#endregion

  //#region Data Fetching
  const { data, loading, error } = useFetchEnquiry({
    ProjectId: projectId,
    Name: search,
    PageNumber: pagination.currentPage,
    PageSize: pagination.pageSize,
    ...filters,
    sortBy: sortInfo ? getSortByParam(sortInfo, EnquiryColumns) : undefined,
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
  const applyFilters = (values: EnquiryFilters) => {
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
    visibleEnquiryColumns,
    requiredEnquiryColumnKeys,
    selectedEnquiryColumnKeys,
    EnquiryColumns,
    setSelectedEnquiryColumnKeys,
  };
};
