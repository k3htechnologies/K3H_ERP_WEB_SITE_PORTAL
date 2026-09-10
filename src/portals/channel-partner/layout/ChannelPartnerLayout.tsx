import { Outlet } from "react-router-dom";

import { ChannelPartnerProvider } from "../context/ChannelPartnerProvider";

const ChannelPartnerLayout = () => {
  return (
    <ChannelPartnerProvider>
      <Outlet />
    </ChannelPartnerProvider>
  );
};

export default ChannelPartnerLayout;
