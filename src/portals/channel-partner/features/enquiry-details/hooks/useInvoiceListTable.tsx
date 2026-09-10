import { useCallback, useEffect, useMemo, useState } from "react";

import { useFetchInvoices } from "./useFetchInvoices";
import usePagination from "@/shared/hooks/usePagination";
import type {
  SortInfo,
  TableColumn,
} from "@/shared/components/DataTable/DataTable";
import { getSortByParam } from "@/shared/utils/sortingColumnDetails";
import useDebouncedCallback from "@/shared/hooks/useDebouncedCallback";
import MultiImageViewer from "@/shared/components/ImageViewer/ImageViewer";
import { parseDocumentUrls } from "@/shared/utils/documentUtils";
import { formatDate_dd_MonthName_yy } from "@/shared/utils/dateFormat";
import { Button } from "@/shared/components/forms";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { BrokerageInvoiceData } from "@/shared/services/invoice/invoice.response";
import type { DeleteBrokerageInvoiceRequest } from "@/shared/services/invoice/invoice.request";
import { InvoiceService } from "@/shared/services/invoice/invoice.service";
import useToast from "@/app/providers/ToastProvider/ToastProvider";

export const useInvoiceListTable = (
  projectId: string = "",
  bookingId: string = "",
) => {
  const [search, setSearch] = useState("");
  const [isConfirmationDialogBoxOpen, setIsConfirmationDialogBoxOpen] =
    useState(false);
  const [deleteBrokerageInvoiceData, setDeleteBrokerageInvoiceData] =
    useState<BrokerageInvoiceData | null>(null);
  const [isInvoiceRemoving, setIsInvoiceRemoving] = useState(false);

  const { pagination, setPagination, resetPagination } = usePagination();
  const [sortInfo, setSortInfo] = useState<SortInfo | undefined>(undefined);

  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  //#region Column Setup
  const handleConfirmationDialogBoxOpen = useCallback(
    (row: BrokerageInvoiceData) => {
      setDeleteBrokerageInvoiceData(row);
      setIsConfirmationDialogBoxOpen(true);
    },
    [],
  );
  const handleConfirmationDialogBoxClose = useCallback(() => {
    setDeleteBrokerageInvoiceData(null);
    setIsConfirmationDialogBoxOpen(false);
  }, []);

  const brokerageInvoiceColumns = useMemo<TableColumn[]>(
    () => [
      {
        key: "InvoiceNumber",
        label: "Invoice Number",
        width: "30",
        sortable: false,
        fixed: "left",
        align: "left",
        render: (value: string, row: any) => {
          return (
            <MultiImageViewer
              images={parseDocumentUrls(row.UploadInvoiceURL)}
              title="Invoice Document"
              triggerLabel={value || "-"}
              isWrap={false}
            />
          );
        },
      },
      {
        key: "InvoiceDate",
        label: "Invoice Date ",
        width: "14",
        align: "left",
        render: (value) => (value ? formatDate_dd_MonthName_yy(value) : "-"),
      },

      {
        key: "InvoiceAmount",
        label: "Invoice Amount",
        width: "14",
        sortable: false,
        align: "right",
        render: (value) => value || "0",
      },
      {
        key: "PaymentAmount",
        label: "Paid Invoice Amount",
        width: "14",
        sortable: false,
        align: "right",
        render: (value) => value || "0",
      },
      {
        key: "PendingAmount",
        label: "Pending Amount",
        width: "14",
        sortable: false,
        align: "right",
        render: (_, row) => {
          const invoice = Number(row.InvoiceAmount || 0);
          const paid = Number(row.PaymentAmount || 0);
          const pending = invoice - paid;

          return pending >= 0 ? pending : 0;
        },
      },

      {
        key: "Actions",
        label: "Actions",
        width: "12",
        fixed: "right",
        align: "center",
        render: (_value, row) => {
          const status = row.ApprovalStatus?.toUpperCase() || "";
          const isApproved = status.includes("APPROVED");
          const isLocked = isApproved;
          return (
            <div className="flex items-center justify-center">
              <Button
                color="transparent"
                size="sm"
                disabled={isLocked}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isLocked) return;
                  navigate(
                    `/channelPartner/addInvoice/${row.BrokerageInvoiceId}`,
                    {
                      state: {
                        projectId,
                        bookingId,
                      },
                    },
                  );
                }}
                style={{
                  color: isLocked ? "#9CA3AF" : "",
                  padding: "4px 8px",
                  cursor: isLocked ? "not-allowed" : "pointer",
                  opacity: isLocked ? 0.5 : 1,
                }}
                leftIcon={<Edit className="h-4 w-4" />}
              />

              <Button
                color="transparent"
                size="sm"
                disabled={isLocked}
                style={{
                  color: isLocked ? "#9CA3AF" : "red",
                  padding: "4px 8px",
                  cursor: isLocked ? "not-allowed" : "pointer",
                  opacity: isLocked ? 0.5 : 1,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isLocked) return;
                  handleConfirmationDialogBoxOpen(row);
                }}
                leftIcon={<Trash2 className="h-4 w-4" />}
              />
            </div>
          );
        },
      },
    ],
    [],
  );
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

  //#region Sort
  const handleSortColumn = (sort: SortInfo) => {
    setSortInfo(sort);
    setPagination({
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

  //#region Data Fetching
  const { data, loading, error, refetch } = useFetchInvoices({
    ProjectId: projectId,
    BookingId: bookingId,
    InvoiceNumber: search,
    PageNumber: pagination.currentPage,
    PageSize: pagination.pageSize,
    SortBy: sortInfo
      ? getSortByParam(sortInfo, brokerageInvoiceColumns)
      : undefined,
  });
  //#endregion

  //#region Delete Invoice
  const handleDeletePaidPayment = async () => {
    try {
      setIsInvoiceRemoving(true);
      const params: DeleteBrokerageInvoiceRequest = {
        BookingId: deleteBrokerageInvoiceData?.BookingId || 0,
        Uniquekey: deleteBrokerageInvoiceData?.Uniquekey || "",
        ProjectId: deleteBrokerageInvoiceData?.ProjectId || 0,
        BrokerageInvoiceId: deleteBrokerageInvoiceData?.BrokerageInvoiceId || 0,
      };
      const response = await InvoiceService.apiCallDeleteInvoice(params);
      if (response && response.IsSuccess && response.Data) {
        setPagination({
          currentPage: 1,
          pageSize: 20,
        });
        await refetch();
        showSuccess(
          response.SuccessMessage
            ? response.SuccessMessage[0]
            : "Successfully Deleted",
        );
      }
    } catch (error) {
      showError("Unable to remove Invoice");
    } finally {
      setIsInvoiceRemoving(false);
      setIsConfirmationDialogBoxOpen(false);
    }
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
    sortInfo,
    handleSortColumn,
    brokerageInvoiceColumns,
    isConfirmationDialogBoxOpen,
    handleConfirmationDialogBoxClose,
    handleDeletePaidPayment,
    isInvoiceRemoving,
  };
};
