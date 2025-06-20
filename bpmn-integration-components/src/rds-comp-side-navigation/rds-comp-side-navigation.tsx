import React from "react";
import { RdsSideNav } from "../rds-elements";
import { useTranslation } from "react-i18next";
export interface RdsCompSideNavigationProps {
  sideNavItems: any[];
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  toggleClass?: any;
  collapse?: any;
  sideNavLogo?: any;
}

const RdsCompSideNavigation = (props: RdsCompSideNavigationProps) => {
  return <RdsSideNav sideNavItems={props.sideNavItems} toggleTheme={props.toggleTheme} collapse={props.collapse} toggleClass={props.toggleClass}
  sideNavLogo={props.sideNavLogo}></RdsSideNav>;
};

export default RdsCompSideNavigation;