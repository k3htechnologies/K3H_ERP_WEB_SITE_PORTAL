import TableActionToolbar from "@/shared/components/TableAction/TableActionToolbar";
import { FieldItem } from "@/shared/components/forms/FieldItem";
import { formatCurrency, getSafeString } from "@/shared/utils/comman";
import {
  formatDate_dd_MonthName_yy,
  formatDate_dd_MonthName_yy_hh_mm,
} from "@/shared/utils/dateFormat";
import NoDataView from "@/shared/components/NoDataView/NoDataView";
import { usePaymentListTable } from "../../hooks/usePaymentListTable";

const PaymentList = ({
  projectId,
  bookingId,
}: {
  projectId: string;
  bookingId: string;
}) => {
  const {
    data: paidBrokerageBookingList,
    loading,
    error,
    search: searchPaidInvoiceNumber,
    handleSearchEnquiry,
    clearSearch,
  } = usePaymentListTable(projectId, bookingId);
  return (
    <>
      <TableActionToolbar
        searchTerm={searchPaidInvoiceNumber}
        searchPlaceholder="Search By Invoice Number"
        onSearchChange={handleSearchEnquiry}
        onClearSearch={clearSearch}
      />
      {paidBrokerageBookingList &&
      paidBrokerageBookingList.Data &&
      paidBrokerageBookingList.Data.length ? (
        paidBrokerageBookingList.Data.map((data, i) => (
          <section
            key={i}
            className="bg-white rounded-xl shadow-sm p-6 border border-[#3333334f]"
          >
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">
                <FieldItem
                  label="Invoice Number"
                  value={data.InvoiceNumber}
                  isRow
                />
                <FieldItem
                  label="Invoice Amount"
                  value={formatCurrency(data.InvoiceAmount)}
                  isRow
                />
              </div>

              <div className="flex items-center gap-2">
                {/* <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (!canMakePaymentAction) return;
                                                handleConfirmationDialogBoxOpenForPayment(data);
                                            }}
                                            color="transparent"
                                            isborderRadius
                                            disabled={!canMakePaymentAction}
                                            size="sm"
                                            style={{
                                                color: canMakePaymentAction ? "red" : "#9CA3AF",
                                                cursor: canMakePaymentAction ? "pointer" : "not-allowed",
                                                opacity: canMakePaymentAction ? 1 : 0.5,
                                            }}
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button> */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b border-[#135bec2e] pb-4 pt-5">
              <FieldItem label="Bank Name" value={data.BankName} />
              <FieldItem label="Payment Type" value={data.PaymentType} />
              <FieldItem label="Payment Mode" value={data.PaymentMode} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b border-[#135bec2e] pt-4 pb-4">
              <FieldItem label="Account Number" value={data.AccountNumber} />
              <FieldItem label="IFSC Code" value={data.IFSCCode} />
              <FieldItem
                label="Date"
                value={formatDate_dd_MonthName_yy(data.CreatedDate ?? "")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b border-[#135bec2e] pt-4 pb-4">
              <FieldItem
                label="Transaction Number / Receipt"
                value={data.TransactionNumber}
                urls={data.TransactionReceiptURL}
                isIcon
              />
              <FieldItem
                label="Amount Paid"
                value={formatCurrency(data.AmountPaid)}
              />
              <FieldItem
                label="TDS Amount"
                value={formatCurrency(data.TDSAmount)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b border-[#135bec2e] pt-4 pb-4">
              <FieldItem
                label="Created By"
                value={getSafeString(data.CreatedBy)}
              />
              <FieldItem
                label="Created Date"
                value={
                  data.CreatedDate
                    ? formatDate_dd_MonthName_yy_hh_mm(data.CreatedDate)
                    : "-"
                }
              />
              <FieldItem
                label="Modified By"
                value={getSafeString(data.ModifiedBy)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              <FieldItem
                label="Modified Date"
                value={
                  data.ModifiedDate
                    ? formatDate_dd_MonthName_yy_hh_mm(data.ModifiedDate)
                    : "-"
                }
              />
            </div>
          </section>
        ))
      ) : (
        <section className="md:col-span-4 bg-white rounded-xl shadow-sm p-6 border-[0.1px] border-[#3333334f]">
          <NoDataView message="No Data Found" />
        </section>
      )}
    </>
  );
};

export default PaymentList;
