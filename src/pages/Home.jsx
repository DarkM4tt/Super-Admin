import { useState } from "react";
import { Toaster } from "react-hot-toast";
import HomeHeader from "../components/common/HomeHeader";
import SideMenu from "../components/dashboard/SideMenu";
import Dashboard from "../components/dashboard/Dashboard";
import Partners from "../components/dashboard/Partners";
import PartnerInfo from "../components/dashboard/PartnerInfo";
import Services from "../components/dashboard/Services";
import Rentals from "../components/dashboard/Seprateservices/Rental/Rentals";
import Vehicles from "./../components/dashboard/Vehicles";
import Drivers from "./../components/dashboard/Drivers";
import VehicleInfo from "./../components/dashboard/VehicleInfo";
import DriverInfo from "./../components/dashboard/DriverInfo";
import FuelCard from "../components/dashboard/FuelCard";
import FuelStations from "../components/dashboard/FuelStations";
import Employees from "../components/dashboard/Employees";
import EmployeeInfo from "../components/dashboard/EmployeeInfo";
import Rentalinfo from "../components/dashboard/Seprateservices/Rental/Rentalinfo";
import Boldads from "../components/dashboard/Seprateservices/BoldAds/Boldads";
import Boldadsinfo from "../components/dashboard/Seprateservices/BoldAds/Boldadsinfo";
import Promotions from "../components/dashboard/Seprateservices/Promotions/Promotions";
import Promotioninfo from "../components/dashboard/Seprateservices/Promotions/Promotioninfo";
import Business from "../components/dashboard/Seprateservices/Business/Business";
import Businessinfo from "../components/dashboard/Seprateservices/Business/Businessinfo";
import Thirdparty from "../components/dashboard/Seprateservices/Boldthirdparty/Thirdparty";
import Thirdpartyinfo from "../components/dashboard/Seprateservices/Boldthirdparty/Thirdpartyinfo";
import Sos from "../components/dashboard/Seprateservices/Sos/Sos";
import Sosinfo from "../components/dashboard/Seprateservices/Sos/Sosinfo";
import Payouts from "../components/dashboard/Payouts";
import Rewards from "../components/dashboard/Rewards";
import TransactionHistory from "../components/dashboard/TransactionHistory";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedRentalId, setSelectedRentalId] = useState(null);
  const [selectedBoldadsId, setSelectedBoldadsId] = useState(null);
  const [selectedPromotionId, setSelectedPromotionId] = useState(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [selectedThirdpartyId, setSelectedThirdpartyId] = useState(null);
  const [selectedSosId, setSelectedSosId] = useState(null);

  const handleMenuItemClick = (itemName) => {
    setActiveComponent(itemName);
  };

  const handleOrgClick = (orgId) => {
    setSelectedOrgId(orgId);
    setActiveComponent("PartnerInfo");
  };

  const handleRentalClick = (rentalId) => {
    setSelectedRentalId(rentalId);
    setActiveComponent("RentalInfo");
  };

  const handleBoldadsClick = (BoldadsId) => {
    setSelectedBoldadsId(BoldadsId);
    setActiveComponent("BoldadsInfo");
  };

  const handlePromotionClick = (PromotionId) => {
    setSelectedPromotionId(PromotionId);
    setActiveComponent("PromotionInfo");
  };

  const handleBusinessClick = (BusinessId) => {
    setSelectedBusinessId(BusinessId);
    setActiveComponent("BusinessInfo");
  };

  const handleThirdpartyClick = (ThirdpartyId) => {
    setSelectedThirdpartyId(ThirdpartyId);
    setActiveComponent("ThirdpartyInfo");
  };

  const handleSosClick = (SosId) => {
    setSelectedSosId(SosId);
    setActiveComponent("SoSInfo");
  };

  const handleVehicleClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setActiveComponent("VehicleInfo");
  };

  const handleDriverClick = (driverId) => {
    setSelectedDriverId(driverId);
    setActiveComponent("DriverInfo");
  };

  const handleEmployeeClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setActiveComponent("EmployeeInfo");
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
    if (selectedEmployeeId && activeComponent === "EmployeeInfo") {
      return (
        <EmployeeInfo
          setSelectedEmployeeId={setSelectedEmployeeId}
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
        return <Rentals handleRentalClick={handleRentalClick} />;
      case "RentalInfo":
        return <Rentalinfo />;
      case "Boldads":
        return <Boldads handleBoldadsClick={handleBoldadsClick} />;
      case "BoldadsInfo":
        return <Boldadsinfo />;
      case "Promotion":
        return <Promotions handlePromotionClick={handlePromotionClick} />;
      case "PromotionInfo":
        return <Promotioninfo />;
      case "Business":
        return <Business handleBusinessClick={handleBusinessClick} />;
      case "BusinessInfo":
        return <Businessinfo />;
      case "Thirdparty":
        return <Thirdparty handleThirdpartyClick={handleThirdpartyClick} />;
      case "ThirdpartyInfo":
        return <Thirdpartyinfo />;
      case "SoS":
        return <Sos handleSosClick={handleSosClick} />;
      case "SoSInfo":
        return <Sosinfo />;
      case "Accounts":
        return <Payouts />;
      case "Payouts":
        return <Payouts />;
      case "Rewards":
        return <Rewards />;
      case "TransactionHistory":
        return <TransactionHistory />;
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
      case "Fuel Card":
        return <FuelCard setActiveComponent={setActiveComponent} />;
      case "FuelStations":
        return <FuelStations setActiveComponent={setActiveComponent} />;
      case "Employees":
        return (
          <Employees
            onEmployeeClick={handleEmployeeClick}
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
          <div className="py-8 px-14 bg-[#F8F8F8]">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
