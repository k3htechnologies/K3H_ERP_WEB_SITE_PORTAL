import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/app/auth/ProtectedRoute";
import Layout from "@/app/layout/Layout";
import { RoleProtectedRoute } from "@/app/auth/RoleProtectedRoute";
import { Role } from "@/shared/constants/roles";
import LoginPage from "../auth/login/pages/Login";
import CPDashBoard from "@/portals/channel-partner/features/dashboard/page";
import ProjectEnquiryDetailsPage from "@/portals/channel-partner/features/enquiry-details/page";
import ProjectDetailsPage from "@/portals/channel-partner/features/project-details/pages";
import NetworkLostModal from "@/shared/components/error/NetworkLostModal";
import InvoiceView from "@/portals/channel-partner/features/enquiry-details/page/InvoiceView";
import AddInvoicePage from "@/portals/channel-partner/features/enquiry-details/page/AddInvoicePage";
import ChannelPartnerLayout from "@/portals/channel-partner/layout/ChannelPartnerLayout";
import ChannelPartnerRegistrationPage from "../auth/register/channelPartner/pages/ChannelPartnerRegistrationPage";
import VendorRegistrationPage from "../auth/register/vendor/pages/VendorRegistrationPage";
import { PATHS, ROUTES } from "./routeConfig";
import ChannelPartnerProfile from "@/portals/channel-partner/features/profile/pages/ChannelPartnerProfile";

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.AUTH.REGISTER.CHANNEL_PARTNER}
        element={<ChannelPartnerRegistrationPage />}
      />
      <Route
        path={ROUTES.AUTH.REGISTER.VENDOR}
        element={<VendorRegistrationPage />}
      />
      <Route path={ROUTES.ERROR.NETWORK} element={<NetworkLostModal />} />
      {/* Protected Routes */}
      <Route
        path={PATHS.ROOT}
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Channel Partner */}
        <Route
          path={PATHS.CHANNEL_PARTNER.ROOT}
          element={<RoleProtectedRoute allowedRoles={Role.CP} />}
        >
          <Route element={<ChannelPartnerLayout />}>
            <Route
              path={PATHS.CHANNEL_PARTNER.PROFILE}
              element={<ChannelPartnerProfile />}
            />
            <Route
              path={PATHS.CHANNEL_PARTNER.DASHBOARD}
              element={<CPDashBoard />}
            />
            <Route
              path={PATHS.CHANNEL_PARTNER.ENQUIRY_DETAILS}
              element={<ProjectEnquiryDetailsPage />}
            />
            <Route
              path={PATHS.CHANNEL_PARTNER.INVOICE_VIEW}
              element={<InvoiceView />}
            />
            <Route
              path={PATHS.CHANNEL_PARTNER.PROJECT_DETAILS}
              element={<ProjectDetailsPage />}
            />
            <Route
              path={PATHS.CHANNEL_PARTNER.ADD_INVOICE}
              element={<AddInvoicePage />}
            />
          </Route>
        </Route>

        {/* Vendor */}
        <Route
          path={PATHS.VENDOR.ROOT}
          element={<RoleProtectedRoute allowedRoles={Role.VENDOR} />}
        >
          <Route
            path={PATHS.VENDOR.DASHBOARD}
            element={<div>Vendor DashBoard</div>}
          />
        </Route>

        {/* Architect */}
        <Route
          path={PATHS.ARCHITECT.ROOT}
          element={<RoleProtectedRoute allowedRoles={Role.ARCHITECT} />}
        >
          <Route
            path={PATHS.ARCHITECT.DASHBOARD}
            element={<div>Architect DashBoard</div>}
          />
        </Route>

        {/* Customer */}
        <Route
          path={PATHS.CUSTOMER.ROOT}
          element={<RoleProtectedRoute allowedRoles={Role.CUSTOMER} />}
        >
          <Route
            path={PATHS.CUSTOMER.DASHBOARD}
            element={<div>Customer DashBoard</div>}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default MainRouter;
