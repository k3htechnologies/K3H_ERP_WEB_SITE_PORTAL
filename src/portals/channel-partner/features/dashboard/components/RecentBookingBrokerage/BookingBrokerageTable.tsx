import { useState } from "react";
import { Upload } from "lucide-react";

import IconContainer from "@/shared/components/IconContainer/IconContainer";
import { Modal } from "@/shared/components/Modal/Modal";
import { Input } from "@/shared/components/forms";
import MultiFilePicker from "@/shared/components/forms/MultiFilePicker";
import { formatINR } from "@/shared/utils/currency";
import DatePickerInput from "@/shared/components/forms/Datepicker";
import {
  convert_dd_mm_yyyy_To_Yyyy_mm_dd,
  formatDate_dd_mm_yyyy,
} from "@/shared/utils/dateFormat";
import { TextArea } from "@/shared/components/forms/Textarea";
import SingleSelectDropdownWithPagination from "@/shared/components/DropDown/SingleSelectDropdownWithPagination";
import { createDropdownInitialValue } from "@/shared/utils/createDropdownInitialValue";
import {
  filterIFSC,
  filterNumbers,
  filterNumbersWithDecimal,
  hasAnyDocumentFile,
  isValidIFSC,
} from "@/shared/utils/fileValidation";
import { bankListMasterService } from "@/shared/services/bankListMaster/bankListMaster.service";
import { useLoading } from "@/app/providers/LoadingProvider/LoadingProvider";
import useToast from "@/app/providers/ToastProvider/ToastProvider";
import { InvoiceService } from "@/shared/services/invoice/invoice.service";
import type { RecentBooking } from "../../api/dashboard.response";
import type { UploadInvoiceRequest } from "../../api/dashboard.request";
import NoDataView from "@/shared/components/NoDataView/NoDataView";

interface Props {
  data: RecentBooking[];
}

const initialValue = {
  projectId: 0,
  uniqueKey: "",
  bookingId: 0,
  brokerageInvoiceId: 0,
  invoiceNumber: "",
  invoiceDate: "",
  invoiceAmount: 0,
  bankListMasterId: 0,
  accountHolderName: "",
  accountNumber: "",
  ifscCode: "",
  uploadInvoiceURL: "",
  removeUploadInvoiceURL: "",
  remark: "",
  bankName: "",
};

const BookingBrokerageTable = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRecentBooking, setSelectedRecentBooking] =
    useState<RecentBooking | null>(null);
  const [formDataForInvoiceUpload, setFormDataForInvoiceUpload] =
    useState<UploadInvoiceRequest>(initialValue);
  const [invoiceFile, setInvoiceFile] = useState<(File | string)[]>([]);
  const [uploadInvoiceURL, setUploadInvoiceURL] = useState<string>();
  const [removeInvoiceFile, setRemoveInvoiceFile] = useState<string[]>([]);
  const [errorsInvoiceUpload, setErrorsInvoiceUpload] = useState<{
    [k: string]: string;
  }>({});
  const [dropdownLabels, setDropdownLabels] = useState<{
    bankName?: string;
  }>({});
  const { showLoading, hideLoading } = useLoading();
  const { showSuccess, showError } = useToast();

  const handleFieldChange = (field: keyof UploadInvoiceRequest, value: any) => {
    setFormDataForInvoiceUpload((prev) => ({ ...prev, [field]: value }));
    if (errorsInvoiceUpload[field]) {
      setErrorsInvoiceUpload((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleUpload = (
    e: React.MouseEvent<HTMLButtonElement>,
    row: RecentBooking,
  ) => {
    e.preventDefault();
    setSelectedRecentBooking(row);
    setIsOpen(true);
  };

  const validateAddBrokerageInvoiceForm = (): {
    isValid: boolean;
    errors: { [key: string]: string };
  } => {
    const newErrors: { [key: string]: string } = {};
    if (!formDataForInvoiceUpload.invoiceNumber) {
      newErrors.invoiceNumber = "Invoice Number is required";
    }
    if (!formDataForInvoiceUpload.invoiceDate) {
      newErrors.invoiceDate = "Invoice Date is required";
    }
    if (!hasAnyDocumentFile(invoiceFile, uploadInvoiceURL, removeInvoiceFile)) {
      newErrors.invoiceUrl = "Invoice is required";
    }
    if (!formDataForInvoiceUpload.bankListMasterId) {
      newErrors.bankListMasterId = "Bank Name is required";
    }
    if (!formDataForInvoiceUpload.accountNumber) {
      newErrors.accountNumber = "Account Number is required.";
    }
    if (!formDataForInvoiceUpload.accountHolderName) {
      newErrors.accountHolderName = "Account Name is required.";
    }
    if (!formDataForInvoiceUpload.ifscCode?.trim()) {
      newErrors.ifscCode = "IFSC Code is required.";
    } else if (formDataForInvoiceUpload.ifscCode.trim().length > 12) {
      newErrors.ifscCode = "IFSC Code must be at most 50 characters";
    } else if (!isValidIFSC(formDataForInvoiceUpload.ifscCode.trim())) {
      newErrors.ifscCode = "Enter a valid IFSC Code";
    }
    if (!formDataForInvoiceUpload.accountNumber?.trim()) {
      newErrors.accountNumber = "Account Number is required.";
    } else if (formDataForInvoiceUpload.accountNumber.trim().length > 18) {
      newErrors.accountNumber = "Account Number must be at most 18 characters";
    }
    if (!formDataForInvoiceUpload.invoiceAmount) {
      newErrors.invoiceAmount = "Invoice Amount is required";
    } else if (Number(formDataForInvoiceUpload.invoiceAmount) <= 0) {
      newErrors.invoiceAmount = "Invoice Amount cannot be zero or negative";
    }

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  const handleInvoiceUpload = async () => {
    setErrorsInvoiceUpload({});
    const validation = validateAddBrokerageInvoiceForm();

    if (!validation.isValid) {
      setErrorsInvoiceUpload(validation.errors);
      return;
    }
    try {
      const fd = new FormData();
      fd.append(
        "BrokerageInvoiceId",
        formDataForInvoiceUpload.brokerageInvoiceId.toString(),
      );
      fd.append("Uniquekey", formDataForInvoiceUpload.uniqueKey ?? "");
      if (selectedRecentBooking?.ProjectId)
        fd.append("ProjectId", selectedRecentBooking?.ProjectId.toString());
      if (selectedRecentBooking?.BookingId)
        fd.append("BookingId", selectedRecentBooking?.BookingId.toString());
      fd.append(
        "InvoiceNumber",
        formDataForInvoiceUpload.invoiceNumber.toString(),
      );
      fd.append("InvoiceDate", formDataForInvoiceUpload.invoiceDate ?? "");
      fd.append(
        "BankListMasterId",
        formDataForInvoiceUpload.bankListMasterId.toString(),
      );
      fd.append(
        "AccountName",
        formDataForInvoiceUpload.accountHolderName ?? "",
      );
      fd.append(
        "AccountNumber",
        formDataForInvoiceUpload.accountNumber.toString(),
      );
      fd.append("IFSCCode", formDataForInvoiceUpload.ifscCode ?? "");
      fd.append(
        "InvoiceAmount",
        formDataForInvoiceUpload.invoiceAmount.toString(),
      );
      fd.append("Remark", formDataForInvoiceUpload.remark ?? "");
      invoiceFile.forEach((file) => {
        if (file instanceof File) {
          fd.append("UploadInvoiceURL", file);
        }
      });
      fd.append("RemoveUploadInvoiceURL", removeInvoiceFile.join(","));
      showLoading("Adding Invoice");
      const response = await InvoiceService.apiCallAddInvoice(fd);
      if (response && response.IsSuccess) {
        showSuccess("Invoice Added");
        setFormDataForInvoiceUpload(initialValue);
        setIsOpen(false);
      }
    } catch (error) {
      showError((error as any).message);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
        <table className="w-full border-spacing-0">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                Project Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                Unit No.
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                Applicant Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                Agreement Value
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                Brokerage %
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                Brokerage Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                Paid
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                Pending
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.BookingId} className="border-b border-slate-100">
                  <td className="px-4 py-4 text-sm">{row.ProjectName}</td>
                  <td className="px-4 py-4 text-sm">{row.UnitNo}</td>
                  <td className="px-4 py-4 text-sm">{row.ApplicantName}</td>
                  <td className="px-4 py-4 text-sm">
                    {formatINR(row.AgreementValue)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {row.BrokeragePercentage}%
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {formatINR(row.BrokerageAmount)}
                  </td>
                  {/* <td className="px-4 py-4 text-sm">
                    {formatINR(row.InvoiceAmount)}
                  </td> */}
                  <td className="px-4 py-4 text-sm">
                    {formatINR(row.AmountPaid)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {formatINR(row.PendingAmount)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <IconContainer
                        className="h-7 w-7 rounded-md"
                        onClick={(e) => handleUpload(e, row)}
                      >
                        <Upload size={14} />
                      </IconContainer>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-10">
                  <NoDataView />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ADD INVOICE MODAL */}
      <Modal
        isOpen={isOpen}
        title="Upload Invoice"
        onClose={() => setIsOpen(false)}
        size="small-half"
        saveText="Add"
        cancelText="Cancel"
        onCancel={() => setIsOpen(false)}
        onSubmit={(e) => {
          e.preventDefault();
          handleInvoiceUpload();
        }}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <MultiFilePicker
                required
                label="Upload Invoice"
                placeholder="Select File"
                error={errorsInvoiceUpload.invoiceUrl}
                value={invoiceFile}
                onChange={setInvoiceFile}
                allowedTypes={["image/jpeg", "image/png", "image/jpg"]}
                maxFiles={1}
                maxSizeMB={10}
                onRemoveExisting={(url) => {
                  setRemoveInvoiceFile((prev) => [...prev, url]);
                }}
                availableFilesURL={uploadInvoiceURL}
              />
            </div>
            <div>
              <Input
                label="Invoice No"
                required
                error={errorsInvoiceUpload.invoiceNumber}
                value={formDataForInvoiceUpload.invoiceNumber ?? ""}
                maxLength={15}
                placeholder="Enter Invoice No."
                onChange={(e) =>
                  handleFieldChange("invoiceNumber", e.target.value)
                }
              />
            </div>
            <div>
              <DatePickerInput
                label="Invoice Date"
                value={formatDate_dd_mm_yyyy(
                  formDataForInvoiceUpload.invoiceDate,
                )}
                onChange={(val) => {
                  handleFieldChange(
                    "invoiceDate",
                    convert_dd_mm_yyyy_To_Yyyy_mm_dd(val),
                  );
                }}
                required
                error={errorsInvoiceUpload.invoiceDate}
              />
            </div>
            <div>
              <SingleSelectDropdownWithPagination
                label="Bank Name"
                required
                title="Select Bank"
                size="lg"
                dataFetchCallBack={
                  bankListMasterService.fetchBankListMasterDropdown
                }
                onSelected={(item: any) => {
                  if (!item) {
                    handleFieldChange("bankListMasterId", null);
                    return;
                  }
                  handleFieldChange("bankListMasterId", Number(item.value));
                }}
                initialValue={createDropdownInitialValue(
                  formDataForInvoiceUpload.bankListMasterId,
                  dropdownLabels.bankName,
                )}
                error={errorsInvoiceUpload.bankListMasterId}
              />
            </div>
            <div>
              <Input
                label="Account Holder Name"
                required
                error={errorsInvoiceUpload.accountHolderName}
                value={formDataForInvoiceUpload.accountHolderName ?? ""}
                maxLength={50}
                placeholder="Enter Account Holder Name"
                onChange={(e) =>
                  handleFieldChange("accountHolderName", e.target.value)
                }
              />
            </div>
            <div>
              <Input
                label="Account No."
                required
                error={errorsInvoiceUpload.accountNumber}
                value={formDataForInvoiceUpload.accountNumber ?? ""}
                maxLength={50}
                placeholder="Enter Account No."
                onChange={(e) =>
                  handleFieldChange(
                    "accountNumber",
                    filterNumbers(e.target.value),
                  )
                }
              />
            </div>
            <div>
              <Input
                label="Invoice Amount (₹)"
                value={formDataForInvoiceUpload.invoiceAmount?.toString() ?? ""}
                required
                onChange={(e) => {
                  const val = filterNumbersWithDecimal(e.target.value);
                  if (val !== null) {
                    const invoiceAmount = filterNumbersWithDecimal(
                      e.target.value,
                    );
                    handleFieldChange("invoiceAmount", invoiceAmount);
                  }
                }}
                placeholder="Enter Invoice Amount (₹)"
                rightIcon="₹"
                error={errorsInvoiceUpload.invoiceAmount}
              />
            </div>
            <div>
              <Input
                label="IFSC Code"
                required
                error={errorsInvoiceUpload.ifscCode}
                value={formDataForInvoiceUpload.ifscCode ?? ""}
                maxLength={50}
                placeholder="Enter IFSC Code"
                onChange={(e) =>
                  handleFieldChange("ifscCode", filterIFSC(e.target.value))
                }
              />
            </div>
            <div>
              <TextArea
                label="Remarks"
                className="thin-scroll"
                value={formDataForInvoiceUpload.remark ?? ""}
                placeholder="Enter Remarks"
                onChange={(e) => {
                  handleFieldChange("remark", e.target.value);
                }}
                error={errorsInvoiceUpload.Remark}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookingBrokerageTable;
