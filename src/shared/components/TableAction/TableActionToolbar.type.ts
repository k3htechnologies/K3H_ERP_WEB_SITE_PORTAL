import type { FilterInfo } from "../DataTable/DataTable"

export interface TableActionToolbarProps {
  isShowSearchBar?: boolean
  searchTerm?: string
  searchPlaceholder?: string
  onSearchChange?: (value: string) => void
  onClearSearch?: () => void

  /** FILTER BUTTON */
  isShowFilterButton?: boolean
  filters?: FilterInfo
  filterTooltipOverride?: string
  onOpenFilter?: () => void

  /** CUSTOMIZE TABLE BUTTON */
  isShowCustomizeButton?: boolean
  customizeLabel?: string
  onCustomize?: () => void

  /** ADD BUTTON */
  isShowAddButton?: boolean
  addTitle?: string
  onAdd?: () => void
  showMoreAddOptions?: React.ReactNode

  /** ADD EXTRA BUTTON */
  isShowAddExtraButton?: boolean
  addExtraTitle?: string
  onAddExtra?: () => void

  /** IMPORT BUTTON */
  isShowImportButton?: boolean
  importTitle?: string
  onUploadExcel?: () => void
  onDownloadSampleExcel?: () => void

  /** EXPORT BUTTON + DROPDOWN */
  isShowExportButton?: boolean
  onExportExcel?: () => void
  onExportPdf?: () => void
  exportLoading?: boolean
}