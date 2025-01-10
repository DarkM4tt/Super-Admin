import { useState } from "react";
import { Toaster } from "react-hot-toast";
import HomeHeader from "../components/common/HomeHeader";
import SideMenu from "../components/dashboard/SideMenu";
import Dashboard from "../components/dashboard/Dashboard";
import Partners from "../components/dashboard/Partners";
import PartnerInfo from "../components/dashboard/PartnerInfo";
import Services from "../components/dashboard/Services";
import Rentals from "../components/dashboard/Seprateservices/Rentals";
import Vehicles from "./../components/dashboard/Vehicles";
import Drivers from "./../components/dashboard/Drivers";
import VehicleInfo from "./../components/dashboard/VehicleInfo";
import DriverInfo from "./../components/dashboard/DriverInfo";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const handleMenuItemClick = (itemName) => {
    setActiveComponent(itemName);
  };

  const handleOrgClick = (orgId) => {
    setSelectedOrgId(orgId);
    setActiveComponent("PartnerInfo");
  };

  const handleVehicleClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setActiveComponent("VehicleInfo");
  };

  const handleDriverClick = (driverId) => {
    setSelectedDriverId(driverId);
    setActiveComponent("DriverInfo");
  };

  const renderActiveComponent = () => {
    if (selectedOrgId && activeComponent === "PartnerInfo") {
      return (
        <PartnerInfo
          {...{
            selectedOrgId,
            setActiveComponent,
            setSelectedOrgId,
          }}
        />
      );
    }
    if (selectedVehicleId && activeComponent === "VehicleInfo") {
      return (
        <VehicleInfo
          selectedVehicleId={selectedVehicleId}
          setActiveComponent={setActiveComponent}
        />
      );
    }
    if (selectedDriverId && activeComponent === "DriverInfo") {
      return (
        <DriverInfo
          setSelectedDriverId={setSelectedDriverId}
          setActiveComponent={setActiveComponent}
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
      case "Services":
        return <Services />;
        case "Rentals":
        return <Rentals />;
      case "Vehicles":
        return (
          <Vehicles
            onVehicleClick={handleVehicleClick}
            setActiveComponent={setActiveComponent}
          />
        );
      case "Drivers":
        return (
          <Drivers
            onDriverClick={handleDriverClick}
            setActiveComponent={setActiveComponent}
          />
        );
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
          <div className="py-8 px-14 bg-[#F8F8F8]">{renderActiveComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
