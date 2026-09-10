import type { EmployeeData } from "@/app/auth/login/api/login.response";
import {
  LOCAL_STORAGE_FOR_STATE_KEYS,
  LOCAL_STORAGE_KEYS,
} from "../constants/localStorageKeys";
import type { SelectedProject } from "@/portals/channel-partner/context/ChannelPartnerProvider";

export const LocalStorageHelper = {
  //EMPLOYEE DATA
  storeEmployeeData: (employeeData: EmployeeData[] | EmployeeData): void => {
    try {
      const dataToStore = Array.isArray(employeeData)
        ? employeeData[0]
        : employeeData;

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.EMPLOYEE,
        JSON.stringify(dataToStore),
      );

      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, dataToStore.Token);
    } catch (error) {
      console.error("Error storing employee data:", error);
    }
  },
  getStoredEmployeeData: (): EmployeeData | null => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.EMPLOYEE);
    if (stored) {
      try {
        return JSON.parse(stored) as EmployeeData;
      } catch (error) {
        console.error("Error parsing stored employee data:", error);
        return null;
      }
    }
    return null;
  },
  storeSelectedProject: (selectedProject: SelectedProject): void => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.SELECTED_PROJECT,
        JSON.stringify(selectedProject),
      );
    } catch (error) {
      console.error("Error storing selected project:", error);
    }
  },

  getSelectedProject: (): SelectedProject | null => {
    const storedProject = localStorage.getItem(
      LOCAL_STORAGE_KEYS.SELECTED_PROJECT,
    );
    if (storedProject) {
      return JSON.parse(storedProject) as SelectedProject;
    }
    return null;
  },
  removeSelectedProject: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PROJECT);
  },
  //SETTING -> COMPANY SETUP
  // getStoredEmployeeData: (): EmployeeData | null => {
  //   const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.EMPLOYEE);
  //   if (stored) {
  //     try {
  //       return JSON.parse(stored) as EmployeeData;
  //     } catch (error) {
  //       console.error("Error parsing stored employee data:", error);
  //       return null;
  //     }
  //   }
  //   return null;
  // },

  storeToken: (token: string): void => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
    } catch (error) {
      console.error("Error storing Token:", error);
    }
  },

  getStoredTokenData: (): string | null => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
    if (stored) {
      try {
        return stored;
      } catch (error) {
        console.error("Error parsing stored employee data:", error);
        return null;
      }
    }
    return null;
  },
  storeRole: (role: string): void => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ROLE, role);
    } catch (error) {
      console.error("Error storing Token:", error);
    }
  },

  getStoredRoleData: (): string | null => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.ROLE);
    if (stored) {
      try {
        return stored;
      } catch (error) {
        console.error("Error parsing stored employee data:", error);
        return null;
      }
    }
    return null;
  },
  storeLastVisitedPage: (path: string): void => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_VISITED_PAGE, path);
    } catch (error) {
      console.error("Error storing last visited page:", error);
    }
  },

  getLastVisitedPage: (): string | null => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_VISITED_PAGE);
    if (stored) {
      try {
        return localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_VISITED_PAGE);
      } catch (error) {
        console.error("Error reading last visited page:", error);
        return null;
      }
    }
    return null;
  },
  //#region CLEAR LOCAL STORAGE
  clearLocalStorageData: (): void => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.EMPLOYEE);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.LAST_VISITED_PAGE);
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.DAPARTMENT_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.DESIGNATION_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.BRANCH_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.BRANCH_ASSOCIATIONS_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ASSET_MASTER_SELECTED_COLUMNS);
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.ASSET_MAPPING_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.DEDUCTION_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.EARNING_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(LOCAL_STORAGE_KEYS.VENDOR_SELECTED_COLUMNS);
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.COMPANY_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.BANK_LIST_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.HOLIDAY_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.HOLIDAY_MAPPING_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.LEAVE_ENCASHMENT_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.LEAVE_TYPE_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(LOCAL_STORAGE_KEYS.COMP_OFF_SELECTED_COLUMNS);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SHIFT_MASTER_SELECTED_COLUMNS);
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.SHIFT_MAPPING_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.WEEK_OFF_MAPPING_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.WEEK_OFF_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.EMPLOYEE_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TNC_MASTER_SELECTED_COLUMNS);
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.SUB_MATERIAL_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(LOCAL_STORAGE_KEYS.UOM_MASTER_SELECTED_COLUMNS);
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.MATERIAL_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.PROJECT_DOCUMENT_CATEGORY_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.PROJECT_RERA_DOCUMENT_CATEGORY_MASTER_SELECTED_COLUMNS,
      );
      localStorage.removeItem(LOCAL_STORAGE_KEYS.MENU_MODULE);
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.COUNTRY_STATE_DISTRICT_CITY_VILLAGE_MASTER,
      );
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PROJECT_ID);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.LITIGATION_SELECTED_COLUMNS);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CALLING_DATA_SELECTED_COLUMNS);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CALL_LOG_SELECTED_COLUMNS);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.BOOKING_SELECTED_COLUMNS);
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.PAY_TRACK_BOOKING_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.PAY_TRACK_REPORT_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.PAYMENT_SCHEDULE_SCHEME_MASTER_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.BROKERAGE_BOOKING_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.PAY_TRACK_CALL_LOG_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.INWARD_OUTWARD_SELECTED_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.ACHIEVEMENT_BY_PROJECT_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.ACHIEVEMENT_BY_CLOSING_COLUMNS,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_KEYS.ACHIEVEMENT_BY_SOURCING_COLUMNS,
      );

      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.EMPLOYEE);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.COMPANY);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.VENDOR);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.PROJECT_MASTER);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.ASSET_MASTER);
      localStorage.removeItem(
        LOCAL_STORAGE_FOR_STATE_KEYS.ASSET_MAPPING_MASTER,
      );
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.DEDUCTION_MASTER);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.SHIFT_MASTER);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.WEEK_OFF_MASTER);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.LITIGATION);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.CHANNEL_PARTNER);
      localStorage.removeItem(
        LOCAL_STORAGE_FOR_STATE_KEYS.CHANNEL_PARTNER_SOURCING,
      );
      localStorage.removeItem(
        LOCAL_STORAGE_FOR_STATE_KEYS.CHANNEL_PARTNER_UNIVERSE,
      );
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.INCENTIVE_REPORT);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.OUTDOOR);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.LEAVE);
      localStorage.removeItem(
        LOCAL_STORAGE_FOR_STATE_KEYS.LEAVECREDITCONFIGURATION,
      );
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.BOOKING);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.PAY_TRACK_BOOKING);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.INWARD_OUTWARD);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.BOOKING_Brokerage);
      localStorage.removeItem(LOCAL_STORAGE_FOR_STATE_KEYS.ROLE);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PROJECT);
    } catch (error) {
      console.error("ERROR : CLEARING LOCAL STORAGE:", error);
    }
  },
  //#endregion
};
