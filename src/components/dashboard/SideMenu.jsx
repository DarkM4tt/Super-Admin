// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import superadminlogo from "../../assets/superadminlogo.png";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// const SideMenu = ({ onMenuItemClick }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [subindex, setSubindex] = useState(0);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   const menuItems = [
//     { text: "Dashboard" },
//     {
//       text: "Services",
//       subItems: [
//         { text: "Overview", route: "/services/overview" },
//         { text: "Rentals" },
//         { text: "BOLD Ads", route: "/services/bold-ads" },
//         { text: "BOLD Promotions", route: "/services/bold-promotions" },
//         { text: "BOLD Business", route: "/services/bold-business" },
//         { text: "BOLD 3rd Party", route: "/services/bold-business" },
//         { text: "SoS", route: "/services/sos" },
//       ],
//     },
//     { text: "Partners" },
//     { text: "Fuel Card" },
//     {
//       text: "Internal Team",
//       subItems: [
//         { text: "Overview", route: "/services/overview" },
//         { text: "Operations", route: "/services/rentals" },
//         { text: "Customer Support", route: "/services/bold-ads" },
//         { text: "Product Development", route: "/services/bold-promotions" },
//         { text: "Finance", route: "/services/bold-business" },
//         { text: "Compliance", route: "/services/sos" },
//       ],
//     },
//     { text: "Employees" },
//     {
//       text: "Accounts",
//       subItems: [
//         { text: "Payouts", route: "/services/overview" },
//         { text: "Rewards", route: "/services/rentals" },
//         { text: "Transaction history", route: "/services/bold-ads" },
//       ],
//     },
//     { text: "Settings" },
//     { text: "Trash" },
//   ];

//   const handleMenuItemClick = (itemName) => {
//     if (itemName === "BOLD Ads") {
//       onMenuItemClick("Boldads");
//       return;
//     } else if (itemName === "BOLD Promotions") {
//       onMenuItemClick("Promotion");
//       return;
//     } else if (itemName === "BOLD Business") {
//       onMenuItemClick("Business");
//       return;
//     } else if (itemName === "BOLD 3rd Party") {
//       onMenuItemClick("Thirdparty");
//       return;
//     } else if (itemName === "Payouts") {
//       onMenuItemClick("Payouts");
//       return;
//     } else if (itemName === "Rewards") {
//       onMenuItemClick("Rewards");
//       return;
//     } else if (itemName === "Transaction history") {
//       onMenuItemClick("TransactionHistory");
//       return;
//     }

//     else if (activeDropdown === "services" && itemName === "Overview"){
//       onMenuItemClick("Services")
//       return;
//     }
//     else if (activeDropdown === "internalteam" && itemName === "Overview"){
//       onMenuItemClick("Internalteam");
//     }
//     else if (itemName === "Internal Team") {
//       onMenuItemClick("Internalteam");
//       return;
//     }

//      else onMenuItemClick(itemName);
//   };

//   return (
//     <div className="bg-[#1C1B1B] text-white h-full px-10 py-8 overflow-y-hidden no-scrollbar flex flex-col flex-grow justify-between">
//       {/* Logo Section */}
//       <div className="flex flex-col overflow-y-auto no-scrollbar">
//         <div className="flex flex-col gap-2">
//           <img src={superadminlogo} alt="logo" className="w-[33%]" />
//           <p className="font-sans font-semibold text-sm">
//             Super Admin Controls
//           </p>
//         </div>

//         {/* Menu Section */}
//         <ul className="mt-[5vh] flex-grow overflow-y-auto no-scrollbar ">
//           {menuItems.map((item, index) => {
//             if (
//               item.text === "Services" ||
//               item.text === "Internal Team" ||
//               item.text === "Accounts"
//             ) {
//               const isDropdownOpen =
//                 (item.text === "Services" && activeDropdown === "services") ||
//                 (item.text === "Internal Team" &&
//                   activeDropdown === "internalteam") ||
//                 (item.text === "Accounts" && activeDropdown === "accounts");

//               return (
//                 <li key={index} className="relative hover:bg-transparent">
//                   <div
//                     onClick={() => {
//                       setActiveIndex(index);
//                       handleMenuItemClick(item.text);
//                       setActiveDropdown(
//                         activeDropdown ===
//                           (item.text === "Services"
//                             ? "services"
//                             : item.text === "InternalTeam"
//                             ? "internalteam"
//                             : "accounts")
//                           ? null
//                           : item.text === "Services"
//                           ? "services"
//                           : item.text === "InternalTeam"
//                           ? "internalteam"
//                           : "accounts"
//                       );
//                     }}
//                     className={`flex hover:bg-transparent items-center gap-4 py-4 cursor-pointer rounded-lg ${
//                       activeIndex === index
//                         ? "text-white font-bold"
//                         : "text-[#777777] font-normal"
//                     } hover:bg-[#333]`}
//                   >
//                     <span className="text-lg">{item.text}</span>
//                     <span className="cursor-pointer">
//                       {isDropdownOpen ? (
//                         <KeyboardArrowUpIcon />
//                       ) : (
//                         <KeyboardArrowDownIcon />
//                       )}
//                     </span>
//                   </div>
//                   {/* Dropdown */}
//                   {isDropdownOpen && (
//                     <ul className="pl-6">
//                       {item.subItems.map((subItem, subIndex) => (
//                         <NavLink key={subIndex}>
//                           <div
//                             className={`border-l-4 ${
//                               subIndex === subindex
//                                 ? "border-[#18C4B8]"
//                                 : "border-[#2B2B2B]"
//                             }`}
//                             onClick={() => setSubindex(subIndex)}
//                           >
//                             <li
//                               onClick={() => {
//                                 activeDropdown === "services" &&
//                                   subItem.text === "Overview";
//                                 handleMenuItemClick(subItem.text);
//                               }}
//                               className={`py-3 px-4 text-lg font-redhat rounded-lg ml-3 text-[#777777] hover:text-white  hover:bg-[#18C4B833] hover:font-semibold cursor-pointer ${
//                                 subIndex === subindex
//                                   ? "font-semibold text-white"
//                                   : "font-normal"
//                               }`}
//                             >
//                               {subItem.text}
//                             </li>
//                           </div>
//                         </NavLink>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               );
//             }

//             return (
//               <NavLink key={index}>
//                 <li
//                   onClick={() => {
//                     setActiveIndex(index);
//                     setActiveDropdown(null);
//                     handleMenuItemClick(item.text);
//                   }}
//                   className={`flex items-center gap-4 py-4 cursor-pointer rounded-lg hover:bg-transparent ${
//                     activeIndex === index
//                       ? "text-white font-bold"
//                       : "text-[#777777] font-normal"
//                   } hover:bg-[#333]`}
//                 >
//                   <div className="relative text-lg w-full">
//                     {item.text}
//                     {activeIndex === index && (
//                       <div className="absolute bottom-[-6px] left-0 transform w-[10%] h-[4px] bg-[#18C4B8] rounded-full"></div>
//                     )}
//                   </div>
//                 </li>
//               </NavLink>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideMenu;

/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import superadminlogo from "../../assets/superadminlogo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const SideMenu = ({ onMenuItemClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [subindex, setSubindex] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { text: "Dashboard" },
    {
      text: "Services",
      subItems: [
        { text: "Overview"},
        { text: "Rentals" },
        { text: "BOLD Ads"},
        { text: "BOLD Promotions"},
        { text: "BOLD Business"},
        { text: "BOLD 3rd Party"},
        { text: "SoS"},
      ],
    },
    { text: "Partners" },
    { text: "Fuel Card" },
    {
      text: "Internal Team",
      subItems: [
        { text: "Overview"},
        { text: "Operations"},
        { text: "Customer Support"},
        { text: "Product Development"},
        { text: "Finance"},
        { text: "Compliance"},
      ],
    },
    { text: "Employees" },
    {
      text: "Accounts",
      subItems: [
        { text: "Payouts"},
        { text: "Rewards"},
        { text: "Transaction history"},
      ],
    },
    { text: "Settings" },
    { text: "Trash" },
  ];

  const handleMenuItemClick = (itemName) => {
    switch (itemName) {
      case "BOLD Ads":
        onMenuItemClick("Boldads");
        break;
      case "BOLD Promotions":
        onMenuItemClick("Promotion");
        break;
      case "BOLD Business":
        onMenuItemClick("Business");
        break;
      case "BOLD 3rd Party":
        onMenuItemClick("Thirdparty");
        break;
      case "Payouts":
        onMenuItemClick("Payouts");
        break;
      case "Rewards":
        onMenuItemClick("Rewards");
        break;
      case "Transaction history":
        onMenuItemClick("TransactionHistory");
        break;
      case "Overview":
        if (activeDropdown === "services") onMenuItemClick("Services");
        if (activeDropdown === "internalteam") onMenuItemClick("Internalteam");
        break;
      case "Internal Team":
        onMenuItemClick("Internalteam");
        break;
      default:
        onMenuItemClick(itemName);
    }
  };

  return (
    <div className="bg-[#1C1B1B] text-white h-full px-10 py-8 overflow-y-hidden no-scrollbar flex flex-col flex-grow justify-between">
      {/* Logo Section */}
      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-2">
          <img src={superadminlogo} alt="logo" className="w-[33%]" />
          <p className="font-sans font-semibold text-sm">
            Super Admin Controls
          </p>
        </div>

        {/* Menu Section */}
        <ul className="mt-[5vh] flex-grow overflow-y-auto no-scrollbar ">
          {menuItems.map((item, index) => {
            const isDropdown =
              item.text === "Services" ||
              item.text === "Internal Team" ||
              item.text === "Accounts";
            const isDropdownOpen =
              (item.text === "Services" && activeDropdown === "services") ||
              (item.text === "Internal Team" &&
                activeDropdown === "internalteam") ||
              (item.text === "Accounts" && activeDropdown === "accounts");

            return isDropdown ? (
              <li key={index} className="relative hover:bg-transparent">
                <div
                  onClick={() => {
                    setActiveIndex(index);
                    handleMenuItemClick(item.text);
                    setActiveDropdown(
                      activeDropdown === item.text.toLowerCase().replace(" ", "")
                        ? null
                        : item.text.toLowerCase().replace(" ", "")
                    );
                  }}
                  className={`flex hover:bg-transparent items-center gap-4 py-4 cursor-pointer rounded-lg ${
                    activeIndex === index
                      ? "text-white font-bold"
                      : "text-[#777777] font-normal"
                  } hover:bg-[#333]`}
                >
                  <span className="text-lg">{item.text}</span>
                  <span className="cursor-pointer">
                    {isDropdownOpen ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </span>
                </div>
                {/* Dropdown */}
                {isDropdownOpen && (
                  <ul className="pl-6">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink key={subIndex} to={subItem.route || "#"}>
                        <div
                          className={`border-l-4 ${
                            subIndex === subindex
                              ? "border-[#18C4B8]"
                              : "border-[#2B2B2B]"
                          }`}
                          onClick={() => setSubindex(subIndex)}
                        >
                          <li
                            onClick={() => handleMenuItemClick(subItem.text)}
                            className={`py-3 px-4 text-lg font-redhat rounded-lg ml-3 text-[#777777] hover:text-white hover:bg-[#18C4B833] hover:font-semibold cursor-pointer ${
                              subIndex === subindex
                                ? "font-semibold text-white"
                                : "font-normal"
                            }`}
                          >
                            {subItem.text}
                          </li>
                        </div>
                      </NavLink>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <NavLink key={index} to="#">
                <li
                  onClick={() => {
                    setActiveIndex(index);
                    setActiveDropdown(null);
                    handleMenuItemClick(item.text);
                  }}
                  className={`flex items-center gap-4 py-4 cursor-pointer rounded-lg hover:bg-transparent ${
                    activeIndex === index
                      ? "text-white font-bold"
                      : "text-[#777777] font-normal"
                  } hover:bg-[#333]`}
                >
                  <div className="relative text-lg w-full">
                    {item.text}
                    {activeIndex === index && (
                      <div className="absolute bottom-[-6px] left-0 transform w-[10%] h-[4px] bg-[#18C4B8] rounded-full"></div>
                    )}
                  </div>
                </li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;

