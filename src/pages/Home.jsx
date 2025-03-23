/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../context/authContext";
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
import Customer from "../components/dashboard/Customer/Customer";
import Customerinfo from "../components/dashboard/Customer/Customerinfo";
import Trips from "../components/dashboard/Trips/Trips";
import Tripinfo from "../components/dashboard/Trips/Tripinfo";
import Internalteam from "../components/dashboard/Internalteam";
import Operations from "../components/dashboard/Seprateinternalteams/Operations";
import CustomerSupport from "../components/dashboard/Seprateinternalteams/CustomerSupport";
import Finance from "../components/dashboard/Seprateinternalteams/Finance";
import Payouts from "../components/dashboard/Payouts";
import Rewards from "../components/dashboard/Rewards";
import TransactionHistory from "../components/dashboard/TransactionHistory";
import FuelStationDetails from "../components/dashboard/FuelStationDetails";
import FuelRequest from "../components/dashboard/FuelRequest";
import Jumpstart from "../components/dashboard/Seprateservices/Jumpstart/Jumpstart";
import Packages from "../components/dashboard/Seprateservices/Packages/Packages";
import BoldMiles from "../components/dashboard/Seprateservices/BoldMiles/BoldMiles";
import CommonServiceInfo from "../components/dashboard/Seprateservices/CommonServiceInfo";
import Map from "../components/dashboard/Location/Map";
import AllowedServices from "../components/dashboard/Location/AllowedServices";
import Bidding from "../components/dashboard/Location/Bidding";
import AddLocation from "../components/dashboard/Location/AddLocation";
import AddCity from "../components/dashboard/Location/AddCity";
import AllZones from "../components/dashboard/Zones/AllZones";
import NewZone from "../components/dashboard/Zones/NewZone";
import LoadingAnimation from "../components/common/LoadingAnimation";
import ZoneCharges from "../components/dashboard/Zones/ZoneCharges";
import AddPrices from "../components/dashboard/Location/AddPrices";
import UpdatePolygon from "../components/dashboard/Location/UpdatePolygon";
import UpdatePrices from "../components/dashboard/Location/UpdateRideTypePrices";
import AcceptNewRequest from "../components/dashboard/AcceptNewRequest";
import AllVehicles from "../components/dashboard/AllVehicles";
import AllDrivers from "../components/dashboard/AllDrivers";
import AllCustomers from "../components/dashboard/Customer/AllCustomers";
import AllRides from "../components/dashboard/Rides/AllRides";
import CustomerDetails from "../components/dashboard/Customer/CustomerDetails";
import RideInfo from "../components/dashboard/Rides/RideInfo";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedFuelStationId, setSelectedFuelStationId] = useState(null);
  const [entity, setEntity] = useState("");
  const [entityId, setEntityId] = useState(null);
  const [areaDetails, setAreaDetails] = useState(null);
  const [isZone, setIsZone] = useState(false);
  const [addLocationData, setAddLocationData] = useState({
    countryId: "",
    cityId: "",
    zoneId: "",
    rideTypePrice: "",
  });
  const [selectedRentalId, setSelectedRentalId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedBoldadsId, setSelectedBoldadsId] = useState(null);
  const [selectedPromotionId, setSelectedPromotionId] = useState(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [selectedThirdpartyId, setSelectedThirdpartyId] = useState(null);
  const [selectedSosId, setSelectedSosId] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const { authLoading } = useAuth();

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

  const handleServiceClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    setActiveComponent("ServiceInfo");
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

  const handleRideClick = (rideId) => {
    setSelectedRideId(rideId);
    setActiveComponent("RideInfo");
  };

  const handleCustomerClick = (customerId) => {
    setSelectedCustomerId(customerId);
    setActiveComponent("CustomerInfo");
  };

  const handleEmployeeClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setActiveComponent("EmployeeInfo");
  };

  const handleFuelStationClick = (stationId) => {
    setSelectedFuelStationId(stationId);
    setActiveComponent("FuelStationDetails");
  };

  const handleEntityClick = (entityId, isZone) => {
    setEntityId(entityId);
    setIsZone(isZone);
    setActiveComponent("UpdatePolygon");
  };

  const handlePriceClick = (area, isZone) => {
    setAreaDetails(area);
    setIsZone(isZone);
    setActiveComponent("UpdatePrices");
  };

  const handleAcceptClick = (entityId, entity) => {
    setEntityId(entityId);
    setEntity(entity);
    setActiveComponent("AcceptNewRequest");
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
          selectedOrgId={selectedOrgId}
          selectedVehicleId={selectedVehicleId}
          setSelectedVehicleId={setSelectedVehicleId}
          setActiveComponent={setActiveComponent}
        />
      );
    }
    if (selectedDriverId && activeComponent === "DriverInfo") {
      return (
        <DriverInfo
          selectedOrgId={selectedOrgId}
          selectedDriverId={selectedDriverId}
          setSelectedDriverId={setSelectedDriverId}
          setActiveComponent={setActiveComponent}
        />
      );
    }
    if (selectedCustomerId && activeComponent === "CustomerInfo") {
      return (
        <CustomerDetails
          selectedCustomerId={selectedCustomerId}
          setSelectedCustomerId={setSelectedCustomerId}
          setActiveComponent={setActiveComponent}
        />
      );
    }
    if (selectedRideId && activeComponent === "RideInfo") {
      return (
        <RideInfo
          selectedRideId={selectedRideId}
          setSelectedRideId={setSelectedRideId}
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
    if (selectedFuelStationId && activeComponent === "FuelStationDetails") {
      return (
        <FuelStationDetails
          setSelectedFuelStationId={setSelectedFuelStationId}
          setActiveComponent={setActiveComponent}
        />
      );
    }
    if (entityId && activeComponent === "UpdatePolygon") {
      return (
        <UpdatePolygon
          isZone={isZone}
          entityId={entityId}
          setEntityId={setEntityId}
          setActiveComponent={setActiveComponent}
        />
      );
    }
    if (areaDetails && activeComponent === "UpdatePrices") {
      return (
        <UpdatePrices
          isZone={isZone}
          areaDetails={areaDetails}
          setAreaDetails={setAreaDetails}
          setActiveComponent={setActiveComponent}
        />
      );
    }
    if (entityId && entity && activeComponent === "AcceptNewRequest") {
      return (
        <AcceptNewRequest
          entityId={entityId}
          entity={entity}
          selectedOrgId={selectedOrgId}
          setActiveComponent={setActiveComponent}
        />
      );
    }

    switch (activeComponent) {
      case "Dashboard":
        return (
          <Dashboard
            setSelectedOrgId={setSelectedOrgId}
            onMenuItemClick={handleMenuItemClick}
            activeItem={activeComponent}
          />
        );
      case "AllVehicles":
        return (
          <AllVehicles
            onVehicleClick={handleVehicleClick}
            handleAcceptClick={handleAcceptClick}
            setActiveComponent={setActiveComponent}
          />
        );
      case "AllDrivers":
        return (
          <AllDrivers
            onDriverClick={handleDriverClick}
            handleAcceptClick={handleAcceptClick}
            setActiveComponent={setActiveComponent}
          />
        );
      case "AllCustomers":
        return (
          <AllCustomers
            onCustomerClick={handleCustomerClick}
            setActiveComponent={setActiveComponent}
          />
        );
      case "AllRides":
        return (
          <AllRides
            onRideClick={handleRideClick}
            setActiveComponent={setActiveComponent}
          />
        );
      case "Partners":
        return (
          <Partners
            onPartnerClick={handleOrgClick}
            handleAcceptClick={handleAcceptClick}
          />
        );
      case "Zones":
        return (
          <AllZones
            setActiveComponent={setActiveComponent}
            handleZoneClick={handleEntityClick}
            handlePriceClick={handlePriceClick}
          />
        );
      case "NewZone":
        return (
          <NewZone
            setActiveComponent={setActiveComponent}
            setAddLocationData={setAddLocationData}
          />
        );
      case "ZoneCharges":
        return <ZoneCharges setActiveComponent={setActiveComponent} />;
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
      case "Jumpstart":
        return <Jumpstart handleServiceClick={handleServiceClick} />;
      case "Packages":
        return <Packages handleServiceClick={handleServiceClick} />;
      case "BoldMiles":
        return <BoldMiles handleServiceClick={handleServiceClick} />;
      case "ServiceInfo":
        return <CommonServiceInfo />;
      case "Customer":
        return <Customer handleCustomerClick={handleCustomerClick} />;
      case "CustomerInfo":
        return <Customerinfo />;
      case "TripInfo":
        return <Tripinfo />;
      case "Internalteam":
        return <Internalteam />;
      case "Operations":
        return <Operations />;
      case "Customer Support":
        return <CustomerSupport />;
      case "Finance":
        return <Finance />;
      case "Fuel Request":
        return <FuelRequest />;
      case "Accounts":
        return <Payouts />;
      case "Payouts":
        return <Payouts />;
      case "Rewards":
        return <Rewards />;
      case "TransactionHistory":
        return <TransactionHistory />;
      case "Location":
        return <Map />;
      case "Map":
        return <Map />;
      case "AllowedServices":
        return <AllowedServices />;
      case "Bidding":
        return <Bidding />;
      case "AddPrices":
        return (
          <AddPrices
            addLocationData={addLocationData}
            setActiveComponent={setActiveComponent}
          />
        );
      case "AddLocation":
        return (
          <AddLocation
            setActiveComponent={setActiveComponent}
            handleEntityClick={handleEntityClick}
            handlePriceClick={handlePriceClick}
          />
        );
      case "AddCity":
        return (
          <AddCity
            setActiveComponent={setActiveComponent}
            setAddLocationData={setAddLocationData}
          />
        );
      case "Vehicles":
        return (
          <Vehicles
            selectedOrgId={selectedOrgId}
            onVehicleClick={handleVehicleClick}
            handleAcceptClick={handleAcceptClick}
            setActiveComponent={setActiveComponent}
          />
        );
      case "Drivers":
        return (
          <Drivers
            selectedOrgId={selectedOrgId}
            onDriverClick={handleDriverClick}
            setActiveComponent={setActiveComponent}
          />
        );
      case "Fuel Card":
        return <FuelCard setActiveComponent={setActiveComponent} />;
      case "FuelStations":
        return (
          <FuelStations
            onFuelStationClick={handleFuelStationClick}
            setActiveComponent={setActiveComponent}
          />
        );
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

  if (authLoading) {
    return <LoadingAnimation width={500} height={500} />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* <HomeHeader /> */}
      <Toaster />
      <div className="flex flex-grow overflow-y-auto bg-[#F8F8F8]">
        <div
          className={`absolute sm:relative z-50 h-full w-2/5 sm:w-[18%] max-w-[335px] md:block text-white overflow-y-auto`}
        >
          <SideMenu
            onMenuItemClick={handleMenuItemClick}
            activeItem={activeComponent}
          />
        </div>
        <div className="w-4/5 flex-1 overflow-y-auto">
          <HomeHeader setActiveComponent={setActiveComponent} />
          <div className="py-8 px-14 bg-[#F8F8F8]">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
