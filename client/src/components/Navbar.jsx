import React ,{ useState }from 'react'
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
  } from "@mui/icons-material";

import FlexBetween from "components/FlexBetween";

// import the dispatcher and reducer;
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import profileimage from "assets/profile.jpeg";


const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar
