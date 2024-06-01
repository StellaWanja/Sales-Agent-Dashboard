import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SchoolIcon from "@mui/icons-material/School";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { Link } from "react-router-dom";
import { School } from "../interfaces/School";

const MainSidebar = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await fetch("http://localhost:3000/schools");
      const data = await response.json();
      setSchools(data);
    };
    fetchSchools();

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="!bg-[#010C0B] h-100vh m-0 p-0">
      <Sidebar collapsed={collapsed}>
        <Menu
          className="bg-[#010C0B] text-[#FDFEFF]"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#FDFEFF" : "#7F8182",
                  backgroundColor: active ? "#222222" : undefined,
                  "&:hover": {
                    backgroundColor: "#3570FF !important",
                    color: "#FDFEFF !important",
                  },
                };
              if (level === 1) {
                return {
                  color: disabled ? "#FDFEFF" : "#7F8182",
                  backgroundColor: "#010C0B",
                  "&:hover": {
                    backgroundColor: "#3570FF !important",
                    color: "#FDFEFF !important",
                  },
                };
              }
            },
          }}
        >
          <MenuItem
            component={<Link to="/" />}
            style={{ color: "#FDFEFF" }}
            className="pb-10 pt-5"
            icon={<MenuRoundedIcon />}
            onClick={handleToggleSidebar}
          >
            <h2> Zeraki</h2>
          </MenuItem>
          <SubMenu
            label="Dashboard"
            className="bg-[#010C0B] text-[#FDFEFF]"
            component={<Link to="/" />}
            icon={<GridViewRoundedIcon />}
          >
            <MenuItem icon={<CollectionsIcon />}>Collections</MenuItem>
            <MenuItem icon={<HowToRegIcon />}>Sign-ups</MenuItem>
            <MenuItem icon={<AttachMoneyIcon />}>Total Revenue</MenuItem>
            <MenuItem icon={<CreditCardIcon />}>Bounced Cheques</MenuItem>
          </SubMenu>
          <SubMenu
            label="Schools"
            component={<Link to="/school-management" />}
            icon={<SchoolIcon />}
          >
            {schools.map((school, index) => {
              return (
                <MenuItem key={index} icon={<LocationCityIcon />}>
                  {school.name}
                </MenuItem>
              );
            })}
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MainSidebar;
