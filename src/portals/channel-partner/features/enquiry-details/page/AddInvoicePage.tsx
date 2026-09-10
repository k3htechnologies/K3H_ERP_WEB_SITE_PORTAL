import SingleSelectDropdownWithPagination from "@/shared/components/DropDown/SingleSelectDropdownWithPagination";
import { Button, Input } from "@/shared/components/forms";
import DatePickerInput from "@/shared/components/forms/Datepicker";
import MultiFilePicker from "@/shared/components/forms/MultiFilePicker";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { UploadInvoiceRequest } from "../../dashboard/api/dashboard.request";
import { bankListMasterService } from "@/shared/services/bankListMaster/bankListMaster.service";
import {
  convert_dd_mm_yyyy_To_Yyyy_mm_dd,
  formatDate_dd_mm_yyyy,
} from "@/shared/utils/dateFormat";
import { TextArea } from "@/shared/components/forms/Textarea";
import {
  filterIFSC,
  filterNumbers,
  filterNumbersWithDecimal,
  hasAnyDocumentFile,
  isValidIFSC,
} from "@/shared/utils/fileValidation";
import { createDropdownInitialValue } from "@/shared/utils/createDropdownInitialValue";
import { useLoading } from "@/app/providers/LoadingProvider/LoadingProvider";
import useToast from "@/app/providers/ToastProvider/ToastProvider";
import { InvoiceService } from "@/shared/services/invoice/invoice.service";
import { useNavigationState } from "@/shared/hooks/useNavigationState";
import { createFormData } from "@/shared/utils/createFormData";

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

const AddInvoicePage = () => {
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
  const { projectId, bookingId } =
    useNavigationState<{ projectId: string; bookingId: string }>() ?? {};

  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const { showLoading, hideLoading } = useLoading();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const fetchInvoiceData = async (BrokerageInvoiceId: string) => {
      const response = await InvoiceService.apiCallPullInvoice({
        BrokerageInvoiceId,
        PageNumber: 1,
        PageSize: 10,
      });
      if (response.IsSuccess && response.Data && response.Data[0]) {
        const e = response.Data[0];
        if (e) {
          setFormDataForInvoiceUpload((prev) => ({
            ...prev,
            brokerageInvoiceId: e.BrokerageInvoiceId ?? prev.brokerageInvoiceId,
            uniqueKey: e.Uniquekey ?? prev.uniqueKey,
            projectId: e.ProjectId ?? prev.projectId,
            bankListMasterId: e.BankListMasterId ?? prev.bankListMasterId,
            invoiceNumber: e.InvoiceNumber ?? prev.invoiceNumber,
            invoiceDate: e.InvoiceDate ?? prev.invoiceDate,
            accountHolderName: e.AccountName ?? prev.accountHolderName,
            bankName: e.BankName ?? prev.bankName,
            accountNumber: e.AccountNumber ?? prev.accountNumber,
            ifscCode: e.IFSCCode ?? prev.ifscCode,
            invoiceAmount: e.InvoiceAmount ?? prev.invoiceAmount,
          }));
        }
        setDropdownLabels({
          bankName: e.BankName || "",
        });

        setUploadInvoiceURL(e.UploadInvoiceURL);
        setInvoiceFile([]);
        setRemoveInvoiceFile([]);
      } else {
        setUploadInvoiceURL("");
        setInvoiceFile([]);
        setRemoveInvoiceFile([]);
        showError("Some error occured");
      }
    };
    if (invoiceId && invoiceId !== "0") {
      // fetch invoice details for edit
      fetchInvoiceData(invoiceId);
    }
  }, [invoiceId]);

  const handleFieldChange = (field: keyof UploadInvoiceRequest, value: any) => {
    setFormDataForInvoiceUpload((prev) => ({ ...prev, [field]: value }));
    if (errorsInvoiceUpload[field]) {
      setErrorsInvoiceUpload((prev) => ({ ...prev, [field]: "" }));
    }
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
      const fd = createFormData({
        BrokerageInvoiceId: formDataForInvoiceUpload.brokerageInvoiceId,
        Uniquekey: formDataForInvoiceUpload.uniqueKey,
        ProjectId: projectId,
        BookingId: bookingId,
        InvoiceNumber: formDataForInvoiceUpload.invoiceNumber,
        InvoiceDate: formDataForInvoiceUpload.invoiceDate,
        BankListMasterId: formDataForInvoiceUpload.bankListMasterId,
        AccountName: formDataForInvoiceUpload.accountHolderName,
        AccountNumber: formDataForInvoiceUpload.accountNumber,
        IFSCCode: formDataForInvoiceUpload.ifscCode,
        InvoiceAmount: formDataForInvoiceUpload.invoiceAmount,
        Remark: formDataForInvoiceUpload.remark,
        UploadInvoiceURL: invoiceFile,
        RemoveUploadInvoiceURL: removeInvoiceFile.join(","),
      });
      if (invoiceId && invoiceId === "0") {
        // add invoice
        showLoading("Adding Invoice");
        const response = await InvoiceService.apiCallAddInvoice(fd);
        if (response && response.IsSuccess) {
          showSuccess("Invoice Added");
          setFormDataForInvoiceUpload(initialValue);
          navigate(-1);
        }
      } else {
        // update invoice
        showLoading("Updating Invoice");
        const response = await InvoiceService.apiCallUpdateInvoice(
          fd,
          formDataForInvoiceUpload.brokerageInvoiceId.toString(),
          formDataForInvoiceUpload.uniqueKey,
        );
        if (response && response.IsSuccess) {
          showSuccess("Invoice Updated");
          setFormDataForInvoiceUpload(initialValue);
          navigate(-1);
        }
      }
    } catch (error) {
      showError((error as any).message);
    } finally {
      hideLoading();
    }
  };
  return (
    <>
      <form>
        {/* Basic Brokerage Invoice Details */}

        <div className="space-y-4 pb-3">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-300 pb-2">
            Add Invoice
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </form>
      <div className="flex justify-between items-center pr-5">
        <div className="flex gap-3">
          <Button color="cancel" size="md" onClick={() => navigate(-1)}>
            Cancel
          </Button>

          <Button color="blue" size="md" onClick={handleInvoiceUpload}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddInvoicePage;
