import { useState } from "react";
import { Toaster } from "react-hot-toast";
import HomeHeader from "../components/common/HomeHeader";
import SideMenu from "../components/dashboard/SideMenu";
import Dashboard from "../components/dashboard/Dashboard";
import Partners from "../components/dashboard/Partners";
import PartnerInfo from "../components/dashboard/PartnerInfo";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  // const [selectedOrg, setselectedOrg] = useState(null);
  // const [selectedDriverId, setSelectedDriverId] = useState(null);

  const handleMenuItemClick = (itemName) => {
    setActiveComponent(itemName);
  };

  const handleOrgClick = (orgId) => {
    setSelectedOrgId(orgId);
    setActiveComponent("PartnerInfo");
  };

  const renderActiveComponent = () => {
    if (selectedOrgId && activeComponent === "PartnerInfo") {
      return (
        <PartnerInfo
          orgId={selectedOrgId}
          setActiveComponent={setActiveComponent}
          setSelectedOrg={setSelectedOrgId}
        />
      );
    }

    switch (activeComponent) {
      case "Dashboard":
        return (
          <Dashboard
            onMenuItemClick={handleMenuItemClick}
            activeItem={activeComponent}
          />
        );
      case "Partners":
        return <Partners onPartnerClick={handleOrgClick} />;
      default:
        return null;
    }
  };

  console.log(activeComponent);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* <HomeHeader /> */}
      <Toaster />
      <div className="flex flex-grow overflow-y-auto">
        <div
          className={`absolute sm:relative z-50 h-full w-2/5 sm:w-[18%] max-w-[280px] md:block text-white overflow-y-auto`}
        >
          <SideMenu
            onMenuItemClick={handleMenuItemClick}
            activeItem={activeComponent}
          />
        </div>
        <div className="w-4/5 flex-1 overflow-y-auto">
          <HomeHeader />
          <div className="">{renderActiveComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
