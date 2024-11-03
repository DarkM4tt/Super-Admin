import { useEffect, useState } from "react";
import HomeHeader from "../components/common/HomeHeader";
import Dashboard from "../components/dashboard/Dashboard";
import Fleets from "./../components/dashboard/Fleets";
import Vehicles from "./../components/dashboard/Vehicles";
import Drivers from "./../components/dashboard/Drivers";
import SideMenu from "../components/dashboard/SideMenu";
import Settings from "./../components/dashboard/Settings";
import Rides from "./../components/dashboard/Rides";
import Documents from "./../components/dashboard/Documents";
import LiveMap from "./../components/dashboard/LiveMap";
import Reports from "./../components/dashboard/Reports";
import Zones from "./../components/dashboard/Zones";
import Campaigns from "./../components/dashboard/Campaigns";
import Balance from "./../components/dashboard/Balance";
import Intercity from "../components/dashboard/Intercity";
import { generateToken, messaging } from "../firebase";
import { onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";
import Organisations from "../components/dashboard/Organisations";
import Organisationinfo from "../components/dashboard/Organisationinfo";
import IntercityModal from "../components/dashboard/Rideintercitymodal";
import Neworganisationinfo from "../components/dashboard/Neworganisationinfo";
import VehicleInfo from "../components/dashboard/Vehicleinfo";
import DriverInfo from "../components/dashboard/Driverinfo";
import Customer from "../components/dashboard/Customer";
import Customerinfo from "../components/dashboard/Customerinfo";
import Packages from "../components/dashboard/Packages";
import Organisationpackages from "../components/dashboard/Organisationpackages";
import Organisationpackagesinfo from "../components/dashboard/organisationpackagesinfo";
import Cabs from "../components/dashboard/Cabs";
import Cabsorganisation from "../components/dashboard/Cabsorganisation";
import Rentals from "../components/dashboard/Rentals";
import Rentalorganisation from "../components/dashboard/Rentalorganisation";

const Home = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedOrg,setselectedOrg]= useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [notification, setnotification] = useState(null);
  const [showsidebar, setshowsidebar] = useState(false);

  const handleMenuItemClick = (itemName) => {
    setActiveComponent(itemName);
  };

  const handleDriverClick = (driverId) => {
    setSelectedDriverId(driverId);
    setActiveComponent("Driverinfo");
  };

  const handleVehicleClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setActiveComponent("Vehicleinfo");
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return (
          <Dashboard
            onMenuItemClick={handleMenuItemClick}
            activeItem={activeComponent}
          />
        );
      case "Fleets":
        return <Fleets />;
      case "Organisations":
        return <Organisations onMenuItemClick={handleMenuItemClick} setselectedOrg={setselectedOrg} />;
      case "Organisationinfo":
        return <Organisationinfo onMenuItemClick={handleMenuItemClick} selectedOrg={selectedOrg} />;
      case "Neworganisationinfo":
        return <Neworganisationinfo onMenuItemClick={handleMenuItemClick} selectedOrg={selectedOrg} />;
      case "Intercityinfo":
        return <IntercityModal onMenuItemClick={handleMenuItemClick} />;
      case "Vehicles":
        return <Vehicles onVehicleClick={handleVehicleClick} />;
      case "Customer":
        return <Customer onMenuItemClick={handleMenuItemClick} />;
      case "Customerinfo":
        return <Customerinfo onMenuItemClick={handleMenuItemClick} />;
      case "Vehicleinfo":
        return (
          <VehicleInfo
            selectedVehicleId={selectedVehicleId}
            setActiveComponent={setActiveComponent}
          />
        );
      case "Drivers":
        return <Drivers onDriverClick={handleDriverClick} />;
      case "Packages":
        return <Packages onMenuItemClick={handleMenuItemClick} />;
      case "Organisationpackages":
        return <Organisationpackages onMenuItemClick={handleMenuItemClick} />;
      case "Organisationpackagesinfo":
        return (
          <Organisationpackagesinfo onMenuItemClick={handleMenuItemClick} />
        );
      case "Driverinfo":
        return (
          <DriverInfo
            selectedDriverId={selectedDriverId}
            setActiveComponent={setActiveComponent}
            setSelectedDriver={setSelectedDriverId}
          />
        );
      case "Rides":
        return <Rides />;
      case "Live Map":
        return <LiveMap />;
      case "Cabs":
        return <Cabs onMenuItemClick={handleMenuItemClick} />;
      case "Cabsorganisation":
        return <Cabsorganisation />;
      case "Zones":
        return <Zones />;
      case "Intercity":
        return <Intercity onMenuItemClick={handleMenuItemClick} />;
      case "Rentals":
        return <Rentals onMenuItemClick={handleMenuItemClick} />;
      case "Rentalorganisation":
        return <Rentalorganisation />;
      case "Reports":
        return <Reports />;
      case "Documents":
        return <Documents />;
      case "Campaigns":
        return <Campaigns />;
      case "Balance":
        return <Balance />;
      case "Settings":
        return <Settings />;
      default:
        return null;
    }
  };

  useEffect(() => {
  generateToken();
  onMessage(messaging, (payload) => {
    console.log(payload);
    setnotification(payload.notification.body);
  });
}, [setnotification]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <HomeHeader
        notification={notification}
        showsidebar={showsidebar}
        setshowsidebar={setshowsidebar}
      />
      <Toaster />
      <div className="flex flex-grow overflow-y-auto">
        <div
          className={`absolute sm:relative z-50 h-full w-2/5 sm:w-1/5 max-w-[280px] ${
            showsidebar ? "block" : "hidden"
          } md:block text-white overflow-y-auto`}
        >
          <SideMenu
            onMenuItemClick={handleMenuItemClick}
            activeItem={activeComponent}
          />
        </div>
        <div className="w-4/5 flex-1 p-4 overflow-y-auto">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default Home;
