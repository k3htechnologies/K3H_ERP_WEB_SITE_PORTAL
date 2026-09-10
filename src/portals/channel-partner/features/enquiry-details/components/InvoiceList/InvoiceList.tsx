import TableActionToolbar from "@/shared/components/TableAction/TableActionToolbar";
import DataTableExpandable from "@/shared/components/DataTable/DataTableExpandable";
import { FieldItem } from "@/shared/components/forms/FieldItem";
import {
  formatDate_dd_MonthName_yy,
  formatDate_dd_MonthName_yy_hh_mm,
} from "@/shared/utils/dateFormat";
import type { BrokerageInvoiceData } from "@/shared/services/invoice/invoice.response";
import { useInvoiceListTable } from "../../hooks/useInvoiceListTable";
import { DeleteDialog } from "@/shared/components/forms/DeleteDialog";

const InvoiceList = ({
  projectId,
  bookingId,
}: {
  projectId: string;
  bookingId: string;
}) => {
  const {
    data: brokerageInvoiceListForTable,
    loading,
    search: searchTerm,
    handleSearchEnquiry,
    clearSearch,
    brokerageInvoiceColumns,
    pagination,
    handlePageChange,
    isConfirmationDialogBoxOpen,
    handleConfirmationDialogBoxClose,
    handleDeletePaidPayment,
    isInvoiceRemoving,
  } = useInvoiceListTable(projectId, bookingId);

  return (
    <>
      <TableActionToolbar
        searchTerm={searchTerm}
        searchPlaceholder="Search By Invoice Number"
        onSearchChange={handleSearchEnquiry}
        onClearSearch={clearSearch}
      />
      {brokerageInvoiceListForTable && brokerageInvoiceListForTable.Data && (
        <DataTableExpandable
          data={brokerageInvoiceListForTable.Data || []}
          columns={brokerageInvoiceColumns}
          pagination={{
            ...pagination,
            totalRecords: brokerageInvoiceListForTable?.TotalNumberOfRecord
              ? brokerageInvoiceListForTable?.TotalNumberOfRecord
              : 0,
            onPageChange: handlePageChange,
            totalPages: brokerageInvoiceListForTable?.TotalNumberOfRecord
              ? Math.ceil(
                  brokerageInvoiceListForTable?.TotalNumberOfRecord /
                    pagination.pageSize,
                )
              : 0,
          }}
          emptyMessage="No Invoice Data Found"
          loading={loading}
          fixedHeight
          recordsPerPage={20}
          expandable={{
            keyField: "BrokerageInvoiceId",
            alwaysFetchOnOpen: false,

            fetchRow: async (row) => {
              return row;
            },

            renderRow: (row: BrokerageInvoiceData) => {
              return (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <FieldItem label="Account Name" value={row.AccountName} />
                      <FieldItem
                        label="Account Number"
                        value={row.AccountNumber}
                      />
                      <FieldItem label="IFSC Code" value={row.IFSCCode} />
                      <FieldItem label="Bank Name" value={row.BankName} />
                      <FieldItem
                        label="Due Date"
                        value={formatDate_dd_MonthName_yy(row.DueDate ?? "")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 pt-5">
                    <FieldItem label="Remark" value={row.Remark} />
                  </div>
                  <h3 className="font-semibold pt-5 mb-2">Action Details</h3>
                  <div className="grid grid-cols-3 gap-6 text-sm  space-y-3">
                    <FieldItem
                      label="Created By"
                      value={row?.CreatedBy ?? "-"}
                    />
                    <FieldItem
                      label="Created Date"
                      value={formatDate_dd_MonthName_yy_hh_mm(
                        row?.CreatedDate ?? "-",
                      )}
                    />
                    <FieldItem
                      label="Modified By"
                      value={row?.ModifiedBy ?? "-"}
                    />
                    <FieldItem
                      label="Modified Date"
                      value={formatDate_dd_MonthName_yy_hh_mm(
                        row?.ModifiedDate ?? "-",
                      )}
                    />
                  </div>
                </div>
              );
            },

            expandButton: { openText: "Hide", closeText: "Show" },
          }}
        />
      )}
      <DeleteDialog
        isOpen={isConfirmationDialogBoxOpen}
        onClose={handleConfirmationDialogBoxClose}
        onConfirm={handleDeletePaidPayment}
        loading={isInvoiceRemoving}
        pageName="Brokerage Invoice"
      />
    </>
  );
};

export default InvoiceList;
