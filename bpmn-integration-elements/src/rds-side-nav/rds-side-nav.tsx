import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RdsIcon from "../rds-icon/rds-icon";
import { useTranslation } from "react-i18next";

export interface RdsSideNavProps {
  sideNavItems: any;
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  collapse?: boolean;
  toggleClass?: boolean;
  handlerLogoClick?: any;
  sideNavLogo?: string;
}

const RdsSideNav = (props: RdsSideNavProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [collapse, setCollapse] = useState(true);
  const [hoveredItem, setHoveredItem] = useState("");
  const [isCustomClass, setCustomClass] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [savedOpenMenus, setSavedOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [activeMenu, setActiveMenu] = useState("");

  const mainMenu = props.sideNavItems;

  const onCollapse = () => {
    setCollapse(!collapse);
    localStorage.setItem("isMenuCollapse", !collapse + "");
  };

  useEffect(() => {
    const isMenuCollapse = localStorage.getItem("isMenuCollapse");
    if (isMenuCollapse !== null) setCollapse(isMenuCollapse === "true");

    const isCustomClass = localStorage.getItem("isCustomClass");
    if (isCustomClass !== null) setCustomClass(isCustomClass === "true");

    const savedOpenMenus = localStorage.getItem("openMenus");
    if (savedOpenMenus) {
      setOpenMenus(JSON.parse(savedOpenMenus));
      setSavedOpenMenus(JSON.parse(savedOpenMenus));
    }

    // Set the active menu based on the current location
    const currentPath = location.pathname;
    const activeItem = findActiveMenuItem(mainMenu, currentPath);
    if (activeItem) setActiveMenu(activeItem.key);
  }, [mainMenu, location]);

  const findActiveMenuItem = (items: any, path: string): any => {
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children) {
        const activeChild = findActiveMenuItem(item.children, path);
        if (activeChild) return activeChild;
      }
    }
    return null;
  };

  const onMenuClick = (item: any) => {
    if (item.children) {
      setOpenMenus((prevOpenMenus) => {
        const newOpenMenus = {
          ...prevOpenMenus,
          [item.key]: !prevOpenMenus[item.key],
        };
        localStorage.setItem("openMenus", JSON.stringify(newOpenMenus));
        return newOpenMenus;
      });
    } else {
      setActiveMenu(item.key);
    }
  };

  const handleMouseEnter = () => {
    if (isCustomClass) {
      setOpenMenus(savedOpenMenus);
    }
  };

  const handleMouseLeave = () => {
    if (isCustomClass) {
      setSavedOpenMenus(openMenus);
      setOpenMenus({});
    }
  };

  const displayMenu = (items: any, level: number = 1) => {
    return items.map((item: any) => (
      <React.Fragment key={item.key}>
        <li
          onMouseEnter={() => setHoveredItem(item.key)}
          onMouseLeave={() => setHoveredItem("")}
          className="pe-xxl-0 pe-xl-0 pe-lg-0 pe-md-0 pe-0"
        >
          {item.children ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onMenuClick(item);
              }}
              className={`align-items-center d-inline-flex text-decoration-none cursor-pointer 
                ${collapse ? (level === 1 ? "ps-3 pe-2" : "pe-2") : "ps-3 pe-1"} 
                ${item.children ? "child " : ""} 
                ${openMenus[item.key] ? " " : ""}`}
              aria-expanded={openMenus[item.key] ? "true" : "false"}
            >
              <span>
                {item.iconPath ? (
                  <RdsIcon
                    iconPath={item.iconPath}
                    fill={false}
                    stroke={true}
                    height="24px"
                    width="24px"
                    classes="me-2"
                    type="lottie"
                    isHovered={hoveredItem === item.key}
                  />
                ) : (
                  <RdsIcon
                    name={item.icon}
                    fill={false}
                    stroke={true}
                    height="20px"
                    width="20px"
                    classes="me-2"
                  />
                )}
              </span>
              <span
                style={{ lineHeight: "initial" }}
                className={collapse ? "menuLabels" : "sideNavLabels"}
              >
                {t(item.label)}
              </span>
            </a>
          ) : (
            <Link
              to={item.path}
              className={`align-items-center d-inline-flex text-decoration-none cursor-pointer 
                ${collapse ? (level === 1 ? "ps-3 pe-2" : "pe-2") : "ps-3 pe-1"} 
                ${activeMenu === item.key ? "active " : ""}`}
              onClick={() => onMenuClick(item)}
            >
              <span>
                {item.iconPath ? (
                  <RdsIcon
                    iconPath={item.iconPath}
                    fill={false}
                    stroke={true}
                    height="24px"
                    width="24px"
                    classes="me-2"
                    type="lottie"
                    isHovered={hoveredItem === item.key}
                  />
                ) : (
                  <RdsIcon
                    name={item.icon}
                    fill={false}
                    stroke={true}
                    height="20px"
                    width="20px"
                    classes="me-2"
                  />
                )}
              </span>
              <span
                style={{ lineHeight: "initial" }}
                className={collapse ? "menuLabels" : "sideNavLabels"}
              >
                {t(item.label)}
              </span>
            </Link>
          )}
          
          {item.children && openMenus[item.key] && (
            <ul className="list-unstyled">
              {displayMenu(item.children, level + 1)}
            </ul>
          )}
        </li>
      </React.Fragment>
    ));
  };

  const onClickCollapseButton = () => {
    setCustomClass(!isCustomClass);
    localStorage.setItem("isCustomClass", (!isCustomClass).toString());
  };

  return (
    <>
      <div
        className={`aside ng-tns-c99-0 ${isCustomClass ? "on-collapse-sidebar" : ""}`}
        id="aside"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          onClick={props.handlerLogoClick}
          id="raaghuLogo"
          className="d-xxl-block d-xl-block d-lg-block d-md-block d-none"
        >
          <img
            className="cursor-pointer sidenav-logo mx-1"
            src={props.sideNavLogo}
            alt="logo"
          />
        </div>

        <div
          className="align-items-center cursor-pointer d-flex justify-content-center p-1 py-1 rounded-5 sidenav-footer text-center"
        >
          <span
            className="collpase-button cursor-pointer d-flex lock-icon"
            onClick={onClickCollapseButton}
          >
            <RdsIcon
              name={isCustomClass ? "unlock" : "lock_nav"}
              height="21px"
              width="21px"
              stroke={true}
              fill={false}
              strokeWidth="1.2"
              onClick={onCollapse}
              colorVariant="white"
            ></RdsIcon>
          </span>
        </div>

        <nav
          id="sidebar"
          className={`bd-links text-capitalize sidebar overflow-x-hidden overflow-y-auto pt-xxl-0 pt-xl-0 pt-lg-0 pt-md-0 mt-md-6 mobile-sidebar ${collapse ? "toggle-sidebar-menu" : ""} ${props.toggleClass ? "toggle" : ""}`}
        >
          <ul className="list-unstyled pb-5 pd-md-0 mb-5 mb-md-0">
            {mainMenu.length !== 0 ? displayMenu(mainMenu) : ""}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default RdsSideNav;