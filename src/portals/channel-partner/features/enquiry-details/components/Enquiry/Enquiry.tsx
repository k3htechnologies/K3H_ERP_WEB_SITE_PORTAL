import { useEffect, useState } from "react";
import { DataTable } from "@/shared/components/DataTable/DataTable";
import {
  convert_dd_mm_yyyy_To_Yyyy_mm_dd,
  formatDate_dd_mm_yyyy,
} from "@/shared/utils/dateFormat";
import TableActionToolbar from "@/shared/components/TableAction/TableActionToolbar";

import { Modal } from "@/shared/components/Modal/Modal";
import { Input } from "@/shared/components/forms";
import { SinglePageSelection } from "@/shared/components/DropDown/SinglePageSelection";
import {
  SOURCE_TYPE_OPTIONS,
  SUB_SUB_SOURCE_CHANNEL_PARTNER_OPTIONS,
  SUB_SUB_SOURCE_TYPE_OPTIONS,
  SUBSOURCE_TYPE_OPTIONS,
} from "@/shared/constants";
import { updateFilter } from "@/shared/utils/filterHelper";
import DatePickerInput from "@/shared/components/forms/Datepicker";
import CustomizeColumnsModal from "@/shared/components/CustomizeColumns/CustomizeColumnsModal";
import {
  initialFilterState,
  useEnquiryTable,
  type EnquiryFilters,
} from "../../hooks/useEnquiryTable";
import { useChannelPartnerContext } from "@/portals/channel-partner/context/ChannelPartnerProvider";

const Enquiry = () => {
  const { selectedProject } = useChannelPartnerContext();
  const {
    data: enquiryData,
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
    visibleEnquiryColumns,
    selectedEnquiryColumnKeys,
    requiredEnquiryColumnKeys,
    EnquiryColumns,
    setSelectedEnquiryColumnKeys,
  } = useEnquiryTable(selectedProject ? selectedProject.id : "");

  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [
    isShowCustomizeEnquiryColumnsModal,
    setIsShowCustomizeEnquiryColumnsModal,
  ] = useState<boolean>(false);
  const [tempFilters, setTempFilters] = useState<EnquiryFilters>(filters);
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
        isShowCustomizeButton
        onCustomize={() => setIsShowCustomizeEnquiryColumnsModal(true)}
      />
      {enquiryData?.Data && (
        <DataTable
          data={enquiryData?.Data || []}
          columns={visibleEnquiryColumns}
          pagination={{
            ...pagination,
            totalRecords: enquiryData?.TotalNumberOfRecord
              ? enquiryData?.TotalNumberOfRecord
              : 0,
            onPageChange: handlePageChange,
            totalPages: enquiryData?.TotalNumberOfRecord
              ? Math.ceil(
                  enquiryData?.TotalNumberOfRecord / pagination.pageSize,
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
                label="Enquiry Code"
                value={tempFilters.enquiryCode ?? ""}
                onChange={(e) =>
                  handleFilterChange("enquiryCode", e.target.value)
                }
                placeholder="Enter System Code"
              />
            </div>
            {/* <div>
              <Input
                type="text"
                label="Enquiry Name"
                value={tempFilters.enquiryName ?? ""}
                onChange={(e) =>
                  handleFilterChange("enquiryName", e.target.value)
                }
                placeholder="Enter Enquiry Name"
              />
            </div> */}
            <div>
              <Input
                type="text"
                label="Mobile Number"
                value={tempFilters.mobileNumber ?? ""}
                onChange={(e) =>
                  handleFilterChange("mobileNumber", e.target.value)
                }
                placeholder="Enter Mobile Number"
              />
            </div>
            {/* <div>
              <Input
                type="text"
                label="Budget"
                value={tempFilters.budget ?? ""}
                onChange={(e) => handleFilterChange("budget", e.target.value)}
                placeholder="Enter Budget"
              />
            </div> */}
            {/* <div>
              <Input
                type="text"
                label="Requirement Type"
                value={tempFilters.requirementType ?? ""}
                onChange={(e) =>
                  handleFilterChange("requirementType", e.target.value)
                }
                placeholder="Enter Requirement Type"
              />
            </div> */}
            {/* <div>
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
            </div> */}
            {/* SUB SOURCE */}
            {/* {tempFilters.source === "Direct Walking" && (
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
            )} */}

            {/* SUB SUB SOURCE */}
            {/* {tempFilters.source === "Direct Walking" &&
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
              )} */}

            {/* CHANNEL PARTNER SUB SOURCE */}
            {/* {tempFilters.source === "Channel Partner" && (
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
            )} */}
            <div>
              <Input
                type="text"
                label="Channel Partner Mobile"
                value={tempFilters.channelPartnerMobile ?? ""}
                onChange={(e) =>
                  handleFilterChange("channelPartnerMobile", e.target.value)
                }
                placeholder="Enter Channel Partner Mobile"
              />
            </div>
            {/* <div>
              <Input
                type="text"
                label="Nationality"
                value={tempFilters.nationality ?? ""}
                onChange={(e) =>
                  handleFilterChange("nationality", e.target.value)
                }
                placeholder="Enter Nationality"
              />
            </div> */}
            {/* <div>
              <Input
                type="text"
                label="Current Location"
                value={tempFilters.currentLocation ?? ""}
                onChange={(e) =>
                  handleFilterChange("currentLocation", e.target.value)
                }
                placeholder="Enter Current Location"
              />
            </div> */}
            {/* <div>
              <Input
                type="text"
                label="Customer Classification"
                value={tempFilters.customerClassification ?? ""}
                onChange={(e) =>
                  handleFilterChange("customerClassification", e.target.value)
                }
                placeholder="Enter Customer Classification"
              />
            </div> */}
            {/* <div>
              <Input
                type="text"
                label="Ethnicity"
                value={tempFilters.ethnicity ?? ""}
                onChange={(e) =>
                  handleFilterChange("ethnicity", e.target.value)
                }
                placeholder="Enter Ethnicity"
              />
            </div> */}
            <div>
              <Input
                type="text"
                label="Sales Advisor"
                value={tempFilters.salesAdvisor ?? ""}
                onChange={(e) =>
                  handleFilterChange("salesAdvisor", e.target.value)
                }
                placeholder="Enter Sales Advisor"
              />
            </div>
            <div>
              <Input
                type="text"
                label="Sourcing Manager"
                value={tempFilters.sourcingManager ?? ""}
                onChange={(e) =>
                  handleFilterChange("sourcingManager", e.target.value)
                }
                placeholder="Enter Sourcing Manager"
              />
            </div>
            <div>
              <DatePickerInput
                label="From Date"
                value={formatDate_dd_mm_yyyy(tempFilters.fromDate)}
                onChange={(val) =>
                  handleFilterChange(
                    "fromDate",
                    convert_dd_mm_yyyy_To_Yyyy_mm_dd(val),
                  )
                }
              />
            </div>
            <div>
              <DatePickerInput
                label="To Date"
                value={formatDate_dd_mm_yyyy(tempFilters.toDate)}
                onChange={(val) =>
                  handleFilterChange(
                    "toDate",
                    convert_dd_mm_yyyy_To_Yyyy_mm_dd(val),
                  )
                }
              />
            </div>
            {/* <div>
              <Input
                type="text"
                label="Accommodation"
                value={tempFilters.accomodation ?? ""}
                onChange={(e) =>
                  handleFilterChange("accomodation", e.target.value)
                }
                placeholder="Enter Accommodation"
              />
            </div> */}
            <div>
              <Input
                type="text"
                label="Follow Up Days"
                value={tempFilters.followUpDays ?? ""}
                onChange={(e) =>
                  handleFilterChange("followUpDays", e.target.value)
                }
                placeholder="Enter Follow Up Days"
              />
            </div>
            <div>
              <Input
                type="text"
                label="Final Stage"
                value={tempFilters.finalStage ?? ""}
                onChange={(e) =>
                  handleFilterChange("finalStage", e.target.value)
                }
                placeholder="Enter Final Stage"
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
              new Set([...keys, ...requiredEnquiryColumnKeys]),
            );
            setSelectedEnquiryColumnKeys(withRequired);

            // try {
            //     LocalStorageHelper.storeEnquiryTableColumns?.(
            //         JSON.stringify(withRequired)
            //     );
            // } catch { }
          }}
          columns={EnquiryColumns}
          selectedKeys={selectedEnquiryColumnKeys}
          requiredKeys={requiredEnquiryColumnKeys}
          title="Customize Table Columns"
        />
      )}
    </>
  );
};

export default Enquiry;
