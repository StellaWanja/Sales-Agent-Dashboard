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

const MainSidebar = ({ collapsed, onToggle }) => {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await fetch("http://localhost:3000/schools");
      const data = await response.json();
      setSchools(data);
    };
    fetchSchools();
  }, []);

  return (
    <div className="!bg-[#010C0B] m-0 fixed h-screen overflow-y-auto">
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
            onClick={onToggle}
          >
            <h2> Zeraki</h2>
          </MenuItem>
          <SubMenu
            label="Dashboard"
            className="bg-[#010C0B] text-[#FDFEFF]"
            component={<Link to="/" />}
            icon={<GridViewRoundedIcon />}
          >
            <MenuItem icon={<CollectionsIcon />} component={<Link to="/#collection-stats" />} >Collections</MenuItem>
            <MenuItem icon={<HowToRegIcon />} component={<Link to="/#signup-stats" />} >Sign-ups</MenuItem>
            <MenuItem icon={<AttachMoneyIcon />} component={<Link to="/#revenue-stats" />}>Total Revenue</MenuItem>
            <MenuItem icon={<CreditCardIcon />}  component={<Link to="/#bounced-cheques-stats" />}>Bounced Cheques</MenuItem>
          </SubMenu>
          <SubMenu
            label="Schools"
            component={<Link to="/school-management" />}
            icon={<SchoolIcon />}
          >
            {schools.map((school, index) => {
              return (
                <MenuItem component={<Link to="/school-management/#school-detail" />} key={index} icon={<LocationCityIcon />}>
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
