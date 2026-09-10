import { useEffect, useState } from "react";

import TableActionToolbar from "@/shared/components/TableAction/TableActionToolbar";
import { updateFilter } from "@/shared/utils/filterHelper";
import { CustomTable } from "@/shared/components/DataTable/CustomTable";
import { Input } from "@/shared/components/forms";
import { Modal } from "@/shared/components/Modal/Modal";
import DatePickerInput from "@/shared/components/forms/Datepicker";
import CustomizeColumnsModal from "@/shared/components/CustomizeColumns/CustomizeColumnsModal";
import {
  useBrokrageTable,
  type BrokerageFilters,
} from "../../hooks/useBrokerageTable";
import { useChannelPartnerContext } from "@/portals/channel-partner/context/ChannelPartnerProvider";

const Brokerage = () => {
  const { selectedProject } = useChannelPartnerContext();
  const {
    data: brokerageData,
    loading,
    error,
    search: searchTerm,
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
  } = useBrokrageTable(selectedProject ? selectedProject.id : "");

  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [
    isShowCustomizeBrokerageColumnsModal,
    setIsShowCustomizeBrokerageColumnsModal,
  ] = useState<boolean>(false);
  const [tempFilters, setTempFilters] = useState<BrokerageFilters>(filters);
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
        searchPlaceholder="Search By CP Name"
        onSearchChange={handleSearchEnquiry}
        onClearSearch={clearSearch}
        isShowFilterButton
        filters={filters}
        onOpenFilter={() => {
          setShowFilterModal(true);
        }}
        isShowCustomizeButton
        onCustomize={() => setIsShowCustomizeBrokerageColumnsModal(true)}
      />
      {brokerageData && brokerageData.Data && (
        <CustomTable
          data={brokerageData?.Data || []}
          columns={visibleBrokerageBookingColumns}
          pagination={{
            ...pagination,
            totalRecords: brokerageData?.TotalNumberOfRecord
              ? brokerageData?.TotalNumberOfRecord
              : 0,
            onPageChange: handlePageChange,
            totalPages: brokerageData?.TotalNumberOfRecord
              ? Math.ceil(
                  brokerageData?.TotalNumberOfRecord / pagination.pageSize,
                )
              : 0,
          }}
          emptyMessage="No Brokerage Data Found"
          fixedHeight={true}
          recordsPerPage={20}
          className="flex-1"
          sortInfo={sortInfo}
          onSort={handleSortColumn}
        />
      )}

      {showFilterModal && (
        <Modal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          title="Filter - Brokerage Booking"
          onSubmit={handleSubmit}
          saveText="Apply "
          cancelText="Clear"
          onCancel={() => clearFilters()}
          resetText=""
          size="small-half"
        >
          <div className="space-y-4">
            {/* <div>
                        <Input
                            label='CP Name'
                            type="text"
                            value={tempFilters.ChannelPartnerName || ''}
                            onChange={e => handleFilterChange('ChannelPartnerName', e.target.value)}
                            placeholder="Enter CP name"
                        />
                    </div> */}
            <div>
              <Input
                label="CP Company"
                type="text"
                value={tempFilters.channelPartnerCompanyName || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "channelPartnerCompanyName",
                    e.target.value,
                  )
                }
                placeholder="Enter Company"
              />
            </div>
            <div>
              <Input
                label="CP Mobile Number"
                type="text"
                value={tempFilters.channelPartnerMobileNumber || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "channelPartnerMobileNumber",
                    e.target.value,
                  )
                }
                placeholder="Enter CP Mobile Number"
              />
            </div>
            <div>
              <Input
                label="Applicant Name"
                type="text"
                value={tempFilters.applicantName || ""}
                onChange={(e) =>
                  handleFilterChange("applicantName", e.target.value)
                }
                placeholder="Enter Applicant name"
              />
            </div>
            <div>
              <Input
                label="Applicant Mobile Number"
                type="text"
                value={tempFilters.applicantMobileNumber || ""}
                onChange={(e) =>
                  handleFilterChange("applicantMobileNumber", e.target.value)
                }
                placeholder="Enter Mobile Number"
              />
            </div>
            <div>
              <Input
                label="Wing"
                type="text"
                value={tempFilters.wing || ""}
                onChange={(e) => handleFilterChange("wing", e.target.value)}
                placeholder="Enter Wing"
              />
            </div>
            <div>
              <Input
                label="Flat"
                type="text"
                value={tempFilters.flat || ""}
                onChange={(e) => handleFilterChange("flat", e.target.value)}
                placeholder="Enter Flat"
              />
            </div>
            <div>
              <Input
                label="Floor"
                type="text"
                value={tempFilters.floor || ""}
                onChange={(e) => handleFilterChange("floor", e.target.value)}
                placeholder="Enter Floor"
              />
            </div>
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
            <div>
              <DatePickerInput
                label="From Date"
                value={tempFilters.fromDate || ""}
                onChange={(value) =>
                  handleFilterChange("fromDate", value || "")
                }
              />
            </div>
            <div>
              <DatePickerInput
                label="To Date"
                value={tempFilters.toDate || ""}
                onChange={(value) => handleFilterChange("toDate", value || "")}
              />
            </div>
          </div>
        </Modal>
      )}
      {isShowCustomizeBrokerageColumnsModal && (
        <CustomizeColumnsModal
          isOpen={isShowCustomizeBrokerageColumnsModal}
          onClose={() => setIsShowCustomizeBrokerageColumnsModal(false)}
          onApply={(keys) => {
            const withRequired = Array.from(
              new Set([...keys, ...requiredBrokerageBookingColumnKeys]),
            );
            setSelectedBrokerageBookingColumnKeys(withRequired);

            // try {
            //     LocalStorageHelper.storeBrokerageBookingTableColumns?.(
            //         JSON.stringify(withRequired)
            //     );
            // } catch { }
          }}
          columns={BrokerageBookingColumns}
          selectedKeys={selectedBrokerageBookingColumnKeys}
          requiredKeys={requiredBrokerageBookingColumnKeys}
          title="Customize Table Columns"
        />
      )}
    </>
  );
};

export default Brokerage;
