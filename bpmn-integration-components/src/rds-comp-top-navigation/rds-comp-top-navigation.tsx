import React, { useState, useEffect } from "react";
import RdsCompProfile from "../rds-comp-profile/rds-comp-profile";
import { RdsIcon, RdsOffcanvas, RdsBreadcrumb, RdsDropdownList, RdsButton, RdsBadge, RdsToggle } from "../rds-elements";
import { useTranslation } from "react-i18next";
import {
    authCodeService, hybridCodeService, implicitTokenService
} from "../../../bpmn-integration-react-core/src/index";
import RdsCompDeveloperMode from "../rds-comp-developer-mode";
import { getConfig, setConfig } from '../../../bpmn-integration-mfe/rds_pages/host/config';

export interface RdsCompTopNavigationProps {
    ProfileReplaceIconPath?: string
    ShowProfileSection?: boolean
    onClick?: (event: React.MouseEvent<HTMLLIElement>, val: string) => void;
    onChatClickHandler?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
    onClickThemeCheck?: (event: React.MouseEvent<HTMLLIElement>, val: string) => void;
    notifications?: any[];
    languageItems: any[];
    themeItems: any[];
    toggleItems: any[];
    elementList: any[];
    componentsList: any[];
    navbarTitle?: string;
    brandName?: string;
    profileTitle?: any;
    profileName?: string;
    profileEmail?: string
    logo?: string;
    languageLabel: string;
    languageIcon?: string;
    width?: string;
    themeLabel: string;
    breacrumItem?: any;
    profilePic?: any;
    onLogout?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    onElementSelect?: (selectedElement: any) => void;
    isImpersonation?: any;
    backToMyAccount?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    onForgotPassword: (isForgotPasswordClicked?: boolean) => void;
    onProfileLinkTopNav: (id: string, navigateTo?: string, label?: string) => void;
    chatsHandler?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    tenantName?: any;
    mobileViewLogoClick?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    onClickHamburger?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    isLandingPage?: boolean;
    isChatPermission?: any;
    showUserName?: boolean;
    navbarSubTitle?: any;
    loginHandler?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    handlerLogoClick?: any;
    // sideNavLogo?: string;
    sideNavLogo?: any;
}


const RdsCompTopNavigation = (props: RdsCompTopNavigationProps) => {
    const { t } = useTranslation();
    // const navigate = useNavigate();
    const [themes, setThemes] = useState("light");
    // const [auth, setAuth] = useState(props.auth);
    const [logoImage, setLogoImage] = useState(props.logo);
    const [breacrumItem, setBreadCrumItem] = useState(props.breacrumItem);

    const labelObj: any = {};
    const [hoverState, setHoverState] = useState(labelObj);
    const [navtitle, setNavtitle] = useState(props.navbarTitle);
    const [resetDrop, setResetDrop] = useState(false);

    const currentPath = window.location.pathname;
    console.log("currentPath", currentPath);

    useEffect(() => {
        setHoverState(labelObj);
    }, []);


    const navtabItems = [
        {
            label: t("AbpAccount.LinkedAccounts"),
            icon: "manage_linked",
            subText: t("Manage linked accounts"),
            id: "nav-LinkedAccounts",
            navigateTo: "/linked-accounts",
            iconPath: "./assets/lottie-files/outlined/dual-color/LinkedAccount.json"
        },
        {
            label: t("AbpAccount.AuthorityDelegation"),
            icon: "manage_authority",
            subText: t("Manage authority accounts"),
            id: "nav-AuthorityDelegation",
            navigateTo: "/authority-delegation",
            iconPath: "./assets/lottie-files/outlined/dual-color/Authority Delegation.json"
        },
        {
            label: t("AbpAccount.MyAccount"),
            icon: "manage_authority",
            subText: t("Manage authority accounts"),
            id: "nav-MyAccount",
            navigateTo: "/my-account",
            iconPath: "./assets/lottie-files/outlined/dual-color/myaccount.json"
        },
        {
            label: t("AbpAccount.MySecurityLogs"),
            icon: "login_attempts",
            subText: t("See recent login attempts"),
            id: "nav-SecuityLogs",
            navigateTo: "/security-Logs",
            iconPath: "./assets/lottie-files/outlined/dual-color/ProtectedAccount.json"
        },
        {
            label: t("AbpGdpr.PersonalData"),
            icon: "my_settings",
            subText: t("Change your account settings"),
            id: "nav-PersonalData",
            navigateTo: "/personal-data",
            iconPath: "./assets/lottie-files/outlined/dual-color/personal-data.json",
        },
    ];

    const onClickHandler = (e: any, val: any) => {
        if (props.onClick) {
            props.onClick(e, val);
        }
    };

    const onClicktheme = (e: any, val: string) => {
        if (props.onClickThemeCheck) {
            props.onClickThemeCheck(e, val);
        }
    };

    useEffect(() => {
        setLogoImage(props.logo);
        setBreadCrumItem(props.breacrumItem);
        if (props.profilePic) {
            setProfilePic(props.profilePic);
        }
    }, [props.logo, props.breacrumItem, props.profilePic]);

    const [profilePic, setProfilePic] = useState(
        "./assets/profile-picture-circle.svg"
    );

    //side effect for the navtitle adn reset
    useEffect(() => {
        const navtitl = t("Dashboard") || "";
        if (props.navbarTitle === navtitl) {
            setBreadCrumItem([]);
        }
        setNavtitle(props.navbarTitle);
        if (
            (navtitle != "Element" &&
                navtitle != "Component" &&
                navtitle != "Chart") ||
            props.navbarTitle != navtitle
        ) {
            setResetDrop(!resetDrop);

        }
    }, [props.breacrumItem, props.navbarTitle]);


    const [expanded, setExpanded] = useState(true);


    const handlerLogoClick = () => {
        // navigate("/raaghu-dashboard");
        //setCurrentTitle("Dashboard")
        setBreadCrumItem([]);
    };
    const toggleBetweenMode = (event: any) => {
        const checked = event;
        let selectedTheme = "default";
        if (!checked) {

            localStorage.setItem("THEME", "dark");
            selectedTheme = "dark";
            localStorage.setItem("themeIndex", "7");

        } else {

            localStorage.setItem("THEME", "light");
            selectedTheme = "default";
            localStorage.setItem("themeIndex", "12");

        }
        // this.alertService.setTheme(selectedTheme); 
    };
    const getThemeIconPath = (theme: string) => props.themeItems?.find(item => item.val.toLowerCase().replace(" ", "") === theme).iconPath;

    const profileLinkListHandler: any = (id: string, navigateTo: string, label: string) => {
        props.onProfileLinkTopNav(id, navigateTo, label);

    };


    const [isBadgeVisible, setIsBadgeVisible] = useState(false);

    useEffect(() => {
        checkTheVisibility();
    }, []);

    const checkTheVisibility = () => {
        const developerData = localStorage.getItem("REACT_APP_URL");
        if (developerData === "http://localhost:8080") {
            setIsBadgeVisible(true);
        } else {
            setIsBadgeVisible(false);
        }
    }

    // Update the configuration  
    const handleDeveloperData = (modeData: any) => {
        debugger;
        setConfig({
            REACT_APP_URL: modeData?.apiUrl,
            REACT_APP_API_URL: modeData?.appUrl,
            REACT_APP_CLIENT_ID: modeData?.clientId,
            NODE_ENV: modeData.env,
            REACT_APP_GRANT_TYPE: modeData?.grantType,
            REACT_APP_REPLACE_URL: modeData?.replaceUrl,
            REACT_APP_SCOPE: modeData?.scope,
        });

    }

    return (
        <div>
            {props.isLandingPage && (
                <div>
                    <nav className="navbar-custom-bg navbar d-flex justify-content-between p-2 min-width align-items-center justify-content-md-between justify-content-lg-between h-auto">
                        <div className="container">
                            <div>
                                <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-frontendsuite-darkmode.png" height="37px" />
                            </div>
                            <div>
                                <RdsButton
                                    label={`${t("AbpUi.Login")}`}
                                    colorVariant="primary"
                                    showLoadingSpinner={true}
                                    block={false}
                                    tooltipTitle={""}
                                    type="submit"
                                    onClick={props.loginHandler}
                                    dataTestId="AbpUi.Login"
                                />
                            </div>
                        </div>
                    </nav>
                </div>
            )}

            {props.isLandingPage == false && (
                <nav
                    className="navbar d-flex justify-content-between p-2 min-width align-items-center justify-content-md-end justify-content-lg-between">
                    {/* <div
                        onClick={handlerLogoClick}
                        id="raaghuLogo"
                        className="d-xxl-none d-xl-none d-lg-none d-md-none d-block">
                        <img
                            className="cursor-pointer sidenav-mobile-logo"
                            src={logoImage}
                            alt="logo"
                        ></img>
                    </div> */}

                    <div
                        onClick={props.handlerLogoClick}
                        id="raaghuLogo"
                        className="d-md-none d-block">
                        <img
                            className="cursor-pointer sidenav-logo mx-1"
                            // src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-frontendsuite-lightmode.png"
                            src={logoImage}
                            alt="logo"
                        ></img>
                    </div> 
                    <button className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
                        type="button" onClick={props.onClickHamburger} >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="d-flex align-items-center mx-4 ms-2 mt-5 mt-md-0 d-xxl-block d-xl-block d-lg-block d-none">
                        <div>
                            {breacrumItem?.length == 0 && (
                                <div className="text-bold text-primary">{navtitle}</div>
                            )}
                            {/* <div className="text-bold text-primary">{navtitle}</div> */}
                            {breacrumItem?.length > 0 && (
                                <div className="mob-description ">
                                    <>
                                        <RdsBreadcrumb
                                            breadItems={breacrumItem}
                                        ></RdsBreadcrumb>
                                    </>
                                </div>
                            )}
                        </div>
                    </div>

                    {expanded ? (
                        <div className={"d-flex align-items-center justify-content-between right-side-menu"}>
                            {/* <div className="position-relative me-3 border-end"><MultiLevelDropdown
reset={resetDrop}
onsubmenu={handlerSubMenuselect}
></MultiLevelDropdown></div> */}
                            <div>
                                {isBadgeVisible && (
                                    <div className="position-relative px-md-3">
                                        {/* <RdsBadge
                                            badgeType="rectangle"
                                            colorVariant="primary"
                                            label="Dev Mode"
                                        /> */}
                                        <div className="border-before-end d-md-block d-none pe-2">
                                            <RdsOffcanvas
                                                canvasTitle={"Developer Mode"}
                                                placement="end"
                                                offcanvasbutton={
                                                    <RdsButton
                                                        class="h-auto smallest"
                                                        isOutline={true}
                                                        type="button"
                                                        block={false}
                                                        size="small"
                                                        showLoadingSpinner={true}
                                                        colorVariant="primary"
                                                        label={"Developer Mode"}
                                                    />
                                                }
                                                backDrop={true}
                                                scrolling={false}
                                                preventEscapeKey={false}
                                                offId={"mode"}
                                            >
                                                <div className="d-md-block d-none">
                                                    <RdsCompDeveloperMode onModeDataSubmit={handleDeveloperData} applicationUrl={undefined}></RdsCompDeveloperMode>
                                                    {/* Need this code in future */}
                                                    {/* <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons gap-2">
                                                        <RdsButton
                                                            label={t("AbpUi.Cancel") || ""}
                                                            databsdismiss="offcanvas"
                                                            type={"button"}
                                                            size="small"
                                                            isOutline={true}
                                                            colorVariant="primary"
                                                            class="me-2"
                                                        ></RdsButton>
                                                        <RdsButton
                                                            label={t("AbpUi.Save") || ""}
                                                            type={"button"}
                                                            size="small"
                                                            showLoadingSpinner={true}
                                                            databsdismiss="offcanvas"
                                                            // isDisabled={value === ""}
                                                            colorVariant="primary"
                                                            class="me-2"
                                                        // onClick={addDataHandler}
                                                        ></RdsButton>
                                                    </div> */}
                                                </div>
                                            </RdsOffcanvas>
                                        </div>
                                    </div>

                                )}
                            </div>

                            {currentPath != "/" && (
                                <div className="position-relative px-2 px-md-3 col text-center  ">
                                    <RdsDropdownList
                                        iconPath={getThemeIconPath(localStorage.getItem("theme") || "light")}
                                        labelIconWidth='30px'
                                        labelIconHeight='26px'
                                        isIconPlaceholder={true}
                                        isPlaceholder={false}
                                        placeholder={props.themeLabel}
                                        id={"themeDropdown"}
                                        listItems={props.themeItems}
                                        onClick={onClicktheme}
                                        showIcon={true}
                                        tooltip={true}
                                        tooltipTitle={"Select Theme"}
                                        tooltipPlacement="bottom"
                                    ></RdsDropdownList>
                                    <div className="d-block d-none fs-8 text-center">Light</div>
                                </div>
                            )}

                            {props.ShowProfileSection && (<div className={`position-relative px-2 px-md-3 col ${currentPath != "/" && "border-start-custom"}  ${props.isChatPermission && "border-end-custom"} border-2 d-flex justify-content-center align-items-center text-center`}>
                                <div className="py-xxl-0 py-xl-0 py-lg-0 py-1 d-flex align-items-center justify-content-center">
                                    {props.isChatPermission && (
                                        <span className="cursor-pointer" onClick={props.chatsHandler}>
                                            <RdsIcon iconPath={"./assets/lottie-files/outlined/dual-color/chatting.json"} tooltip={true}
                                                tooltipTitle={"Chat"}
                                                tooltipPlacement="bottom" width="28px"
                                                height="28px" type="lottie" isHovered></RdsIcon>
                                        </span>
                                    )}
                                </div> </div>)}


                            <div className="d-block d-none fs-8 text-center">Chat</div>


                            {props.ShowProfileSection ? (<div className={`position-relative px-2 px-md-3 d-flex ${!props.ShowProfileSection && "border-start-custom"} justify-content-center d-lg-none d-md-none col text-center border-end-custom border-2 align-items-center`}><div className="rounded-circle mbhome bg-primary">
                                <RdsIcon
                                    name="home"
                                    fill={false}
                                    stroke={true}
                                    height="18px"
                                    width="18px"
                                    colorVariant="light" onClick={props.mobileViewLogoClick}
                                ></RdsIcon></div></div>) : (<span></span>)}

                            {currentPath != "/" && (
                                <div className={`position-relative px-2 px-md-3 ${!props.ShowProfileSection && "border-start-custom"}  border-end-custom col text-center d-flex align-items-center language`}>
                                    <RdsDropdownList
                                        labelIcon={props.languageIcon}
                                        labelIconWidth='18px'
                                        labelIconHeight='18px'
                                        placeholder={props.languageLabel}
                                        icon={props.languageIcon}
                                        iconFill={false}
                                        iconStroke={false}
                                        isPlaceholder={true}
                                        id={"languageDropdown"}
                                        listItems={props.languageItems}
                                        showIcon={false} 
                                        onClick={onClickHandler}   
                                        tooltip={true}
                                        tooltipTitle={"Select Language"}    
                                        tooltipPlacement="bottom"
                                        isCode={true}
                                    ></RdsDropdownList>
                                    <div className="d-block d-none fs-8 text-center">Language</div>
                                </div>   
                            )}

                            <div className="position-relative px-2 px-md-3 d-block d-lg-none col text-center profile-off">
                                {props.ShowProfileSection ? (<RdsOffcanvas
                                    className="pb-0 m-auto"
                                    placement="end"
                                    offcanvaswidth={307}
                                    offId="Profile1"
                                    offcanvasbutton={
                                        <div
                                            className="d-flex align-items-center justify-content-center cursorpointer">
                                            <img
                                                className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                                                src={profilePic}
                                            ></img>


                                        </div>
                                    }
                                    backDrop={true}
                                    scrolling={false}
                                    preventEscapeKey={false}
                                    canvasTitle={""}
                                >
                                    <RdsCompProfile
                                        navtabItems={navtabItems}
                                        profilePic={profilePic}
                                        userName={props.profileTitle}
                                        userEmail={props.profileEmail}
                                        userRole={props.tenantName}
                                        onProfileLink={profileLinkListHandler}
                                        onLogout={props.onLogout}
                                        isImpersonation={props.isImpersonation}
                                        backToMyAccount={props.backToMyAccount}
                                        showUserName={true}
                                    ></RdsCompProfile>
                                </RdsOffcanvas>) : (<div className="d-flex align-content-center nowrap cursor-pointer px-3">
                                    <div className="fs-7 ">
                                        <img className="pe-1 " style={{ height: "16px", width: "18px" }} src={props.ProfileReplaceIconPath} /> Download Update
                                    </div>
                                </div>)}

                                <div className="d-block d-none fs-8 text-center">Profile</div>
                            </div>
                            <div className="px-2 px-md-3 d-none d-lg-block">
                                {props.ShowProfileSection ? (<RdsOffcanvas
                                    className="pb-0"
                                    placement="end"
                                    offcanvaswidth={307}
                                    offId="Profile"
                                    offcanvasbutton={
                                        <div
                                            className="d-flex align-items-center cursorpointer">
                                            <img
                                                className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                                                src={profilePic}
                                            ></img>
                                            <div className="ms-2 fs-6">
                                                {props.showUserName ? (
                                                    <div className="text-nowrap">Hi, {props.profileTitle === "null" ? '' : props.profileTitle} </div>
                                                ) : (
                                                    <div className="text-nowrap">Hi, {props.tenantName  === "null" ? '' : props.tenantName}</div>
                                                )}

                                                <div className="text-nowrap text-muted">
                                                    {props.profileEmail === "null" ? '' : props.profileEmail }
                                                </div>
                                            </div>
                                            <span className="ms-3">
                                                <RdsIcon
                                                    name="chevron_down"
                                                    height="11px"
                                                    width="11px"
                                                    fill={false}
                                                    stroke={true}
                                                ></RdsIcon>
                                            </span>
                                        </div>
                                    }
                                    backDrop={true}
                                    scrolling={false}
                                    preventEscapeKey={false}
                                    canvasTitle={""}
                                >
                                    <RdsCompProfile
                                        navtabItems={navtabItems}
                                        profilePic={profilePic}
                                        userName={props.profileTitle}
                                        userEmail={props.profileEmail}
                                        userRole={props.tenantName}
                                        onLogout={props.onLogout}
                                        isImpersonation={props.isImpersonation}
                                        backToMyAccount={props.backToMyAccount}
                                        onProfileLink={profileLinkListHandler}
                                        showUserName={true}
                                    ></RdsCompProfile>
                                </RdsOffcanvas>) : (<div className="d-flex align-content-center nowrap cursor-pointer">
                                    <div className="fs-7 ">
                                        <img className="pe-1 " style={{ height: "16px", width: "18px" }} src={props.ProfileReplaceIconPath} /> Download Update
                                    </div>
                                </div>)}

                            </div>
                        </div>) : null}
                </nav>
            )

            }

        </div >
    );
};


export default RdsCompTopNavigation;