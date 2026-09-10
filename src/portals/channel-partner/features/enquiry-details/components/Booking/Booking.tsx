import { useEffect, useState } from "react";
import { DataTable } from "@/shared/components/DataTable/DataTable";
import CustomizeColumnsModal from "@/shared/components/CustomizeColumns/CustomizeColumnsModal";
import { Modal } from "@/shared/components/Modal/Modal";
import TableActionToolbar from "@/shared/components/TableAction/TableActionToolbar";

import { Input } from "@/shared/components/forms";
import { updateFilter } from "@/shared/utils/filterHelper";
import DatePickerInput from "@/shared/components/forms/Datepicker";
import { SinglePageSelection } from "@/shared/components/DropDown/SinglePageSelection";
import {
  SOURCE_TYPE_OPTIONS,
  SUB_SUB_SOURCE_CHANNEL_PARTNER_OPTIONS,
  SUB_SUB_SOURCE_TYPE_OPTIONS,
  SUBSOURCE_TYPE_OPTIONS,
} from "@/shared/constants";
import {
  initialFilterState,
  useBookingTable,
  type BookingFilters,
} from "../../hooks/useBookingTable";
import { useChannelPartnerContext } from "@/portals/channel-partner/context/ChannelPartnerProvider";
import { CalendarDays, Mail, Phone } from "lucide-react";
import { formatDate_dd_MonthName_yy } from "@/shared/utils/dateFormat";
import { formatINR } from "@/shared/utils/currency";
import NoData from "@/shared/components/NoData/NoData";

const Booking = () => {
  const { selectedProject } = useChannelPartnerContext();
  const {
    data: bookingData,
    search: searchTerm,
    handleSearchEnquiry,
    clearSearch,
    pagination,
    handlePageChange,
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
  } = useBookingTable(selectedProject ? selectedProject.id : "");
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [
    isShowCustomizeEnquiryColumnsModal,
    setIsShowCustomizeEnquiryColumnsModal,
  ] = useState<boolean>(false);
  const [tempFilters, setTempFilters] = useState<BookingFilters>(filters);
  useEffect(() => {
    if (showFilterModal) {
      setTempFilters(filters);
    }
  }, [showFilterModal]);

  const handleSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    applyFilters(tempFilters);
    setShowFilterModal(false);
  };

  const handleFilterChange = (key: string, value: string | null) => {
    setTempFilters((prev) => updateFilter(prev, key, value));
  };

  return (
    <>
      <TableActionToolbar
        isShowSearchBar
        searchTerm={searchTerm}
        searchPlaceholder="Search By Name"
        onSearchChange={handleSearchEnquiry}
        onClearSearch={clearSearch}
        isShowFilterButton
        filters={filters}
        onOpenFilter={() => {
          setShowFilterModal(true);
        }}
        // isShowCustomizeButton
        // onCustomize={() => setIsShowCustomizeEnquiryColumnsModal(true)}
      />
      {/* {bookingData?.Data && (
        <DataTable
          data={bookingData?.Data || []}
          columns={visibleBookingColumns}
          pagination={{
            ...pagination,
            totalRecords: bookingData?.TotalNumberOfRecord
              ? bookingData?.TotalNumberOfRecord
              : 0,
            onPageChange: handlePageChange,
            totalPages: bookingData?.TotalNumberOfRecord
              ? Math.ceil(
                  bookingData?.TotalNumberOfRecord / pagination.pageSize,
                )
              : 0,
          }}
          emptyMessage="No Enquiry Data Found"
          fixedHeight
          recordsPerPage={20}
          className="flex-1"
          sortInfo={sortInfo}
          onSort={handleSortColumn}
        />
      )} */}
      {bookingData?.Data && bookingData.Data.length > 0 ? (
        bookingData.Data.map((booking) => {
          const initials = booking.ApplicantName
            ? booking.ApplicantName.split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 3)
                .toUpperCase()
            : "";

          return (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="lg:flex border-l-4 border-blue-600">
                <div className="flex-1 px-6 py-5">
                  <p className="mb-4 text-sm font-medium text-slate-500">
                    Applicant Details
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                        {initials}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {booking.ApplicantName}
                        </h3>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                          {booking.SystemGeneratedCode}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="mt-4 space-y-2 pl-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="h-4 w-4 text-blue-600" />
                          {booking.ApplicantMobileNumber}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-4 w-4 text-blue-600" />
                          {booking.ApplicantEmailId}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="flex-1 px-6 py-5">
                  <p className="mb-4 text-sm font-medium text-slate-500">
                    Unit Details
                  </p>
                  <h3 className="mb-5 text-lg font-semibold text-slate-900">
                    Flat {booking.WingName}-{booking.FlatNo}, Wing-
                    {booking.WingName}
                  </h3>
                  <div className="flex gap-4">
                    <div className="min-w-20 rounded-lg bg-slate-50 px-4 py-3">
                      <p className="text-xs text-slate-500">Floor</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {booking.FloorName}
                      </p>
                    </div>
                    <div className="min-w-20 rounded-lg bg-slate-50 px-4 py-3">
                      <p className="text-xs text-slate-500">Type</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {booking.BookingType}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="flex-1 px-6 py-5">
                  <p className="mb-3 text-sm font-medium text-slate-500">
                    Agreement Value
                  </p>
                  <h2 className="mb-5 text-4xl font-bold text-[#004AC6]">
                    {formatINR(booking.AgreementValue)}
                  </h2>
                  <div className="inline-flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3">
                    <CalendarDays className="mt-0.5 h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-500">
                        Expected Registration Date
                      </p>
                      <p className="font-semibold text-slate-900">
                        {booking.RegistrationDate
                          ? formatDate_dd_MonthName_yy(booking.RegistrationDate)
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <NoData />
      )}
      {showFilterModal && (
        <Modal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          title="Filter - Enquiry"
          size="small-half"
          saveText="Apply"
          onSubmit={handleSubmit}
          cancelText="Clear"
          onCancel={() => {
            setTempFilters(initialFilterState);
            clearFilters();
          }}
        >
          <div className="space-y-6">
            <div>
              <Input
                type="text"
                label="Applicant Mobile Number"
                value={tempFilters.mobileNumber ?? ""}
                onChange={(e) =>
                  handleFilterChange("mobileNumber", e.target.value)
                }
                placeholder="Enter Mobile Number"
              />
            </div>
            <div>
              <DatePickerInput
                label="From Date"
                value={tempFilters.fromDate || ""}
                onChange={(value) =>
                  handleFilterChange("fromDate", value || "")
                }
                placeholder="Select From Date"
              />
            </div>
            <div>
              <DatePickerInput
                label="To Date"
                value={tempFilters.toDate || ""}
                onChange={(value) => handleFilterChange("toDate", value || "")}
                placeholder="Select To Date"
              />
            </div>
            <div>
              <Input
                type="text"
                label="Wing"
                value={tempFilters.wing ?? ""}
                onChange={(e) => handleFilterChange("wing", e.target.value)}
                placeholder="Enter Wing"
              />
            </div>
            <div>
              <Input
                type="text"
                label="Flat"
                value={tempFilters.flat ?? ""}
                onChange={(e) => handleFilterChange("flat", e.target.value)}
                placeholder="Enter Flat"
              />
            </div>
            <div>
              <Input
                type="text"
                label="Floor"
                value={tempFilters.floor ?? ""}
                onChange={(e) => handleFilterChange("floor", e.target.value)}
                placeholder="Enter Floor"
              />
            </div>
            <div>
              <SinglePageSelection
                label="Source"
                placeholder="Select Source"
                value={tempFilters.source || ""}
                onChange={(e) => handleFilterChange("source", String(e))}
                options={SOURCE_TYPE_OPTIONS.map((opt) => ({
                  label: opt.name,
                  value: opt.id,
                }))}
              />
            </div>
            {/* SUB SOURCE */}
            {tempFilters.source === "Direct Walking" && (
              <div>
                <SinglePageSelection
                  label="Sub Source"
                  placeholder="Select Sub Source"
                  value={tempFilters.subSource || ""}
                  onChange={(e) => handleFilterChange("subSource", String(e))}
                  options={SUBSOURCE_TYPE_OPTIONS.map((opt) => ({
                    label: opt.name,
                    value: opt.id,
                  }))}
                />
              </div>
            )}

            {/* SUB SUB SOURCE */}
            {tempFilters.source === "Direct Walking" &&
              tempFilters.subSource === "Advertisement" && (
                <div>
                  <SinglePageSelection
                    label="Sub Sub Source"
                    placeholder="Select Sub Sub Source"
                    value={tempFilters.subSubSource || ""}
                    onChange={(e) =>
                      handleFilterChange("subSubSource", String(e))
                    }
                    options={SUB_SUB_SOURCE_TYPE_OPTIONS.map((opt) => ({
                      label: opt.name,
                      value: opt.id,
                    }))}
                  />
                </div>
              )}

            {/* CHANNEL PARTNER SUB SOURCE */}
            {tempFilters.source === "Channel Partner" && (
              <div>
                <SinglePageSelection
                  label="Sub Source"
                  placeholder="Select Sub Source"
                  value={tempFilters.subSource || ""}
                  onChange={(e) => handleFilterChange("subSource", String(e))}
                  options={SUB_SUB_SOURCE_CHANNEL_PARTNER_OPTIONS.map(
                    (opt) => ({
                      label: opt.name,
                      value: opt.id,
                    }),
                  )}
                />
              </div>
            )}
            <div>
              <Input
                label="Agreement Value"
                type="number"
                value={tempFilters.agreementValue || ""}
                onChange={(e) =>
                  handleFilterChange("agreementValue", e.target.value)
                }
                placeholder="Enter Agreement Value"
              />
            </div>

            <div>
              <Input
                label="Booking Type"
                type="text"
                value={tempFilters.bookingType || ""}
                onChange={(e) =>
                  handleFilterChange("bookingType", e.target.value)
                }
                placeholder="Enter Booking Type"
              />
            </div>
          </div>
        </Modal>
      )}

      {isShowCustomizeEnquiryColumnsModal && (
        <CustomizeColumnsModal
          isOpen={isShowCustomizeEnquiryColumnsModal}
          onClose={() => setIsShowCustomizeEnquiryColumnsModal(false)}
          onApply={(keys) => {
            const withRequired = Array.from(
              new Set([...keys, ...requiredBookingColumnKeys]),
            );
            setSelectedBookingColumnKeys(withRequired);

            // try {
            //     LocalStorageHelper.storeEnquiryTableColumns?.(
            //         JSON.stringify(withRequired)
            //     );
            // } catch { }
          }}
          columns={bookingColumns}
          selectedKeys={selectedBookingColumnKeys}
          requiredKeys={requiredBookingColumnKeys}
          title="Customize Table Columns"
        />
      )}
    </>
  );
};

export default Booking;
