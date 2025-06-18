import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  configurationService,
  isgrantedpolicies,
} from "../../../../bpmn-integration-react-core/src/index";
import { useAppSelector } from "../../../libs/state-management/hooks";

const PrivateRoute_Auth = () => {
  const currLanguage = useAppSelector(
    (state) => state.persistedReducer.host.currentLanguage || "en"
  );
  const data = useAppSelector((state) => state.persistedReducer?.configureStore?.configuration?.auth?.grantedPolicies || {});

  const [permission, setPermission] = useState<boolean>(true);

  useEffect(() => {
debugger;
    let pagekey = "";
    if (location.pathname == "/") {
      pagekey = "home";
    }

    else if (location.pathname == "/dashboard") {
      pagekey = "abp_react_8_1.Dashboard.Host";
    } else if (location.pathname == "/tenant") {
      pagekey = "Saas.Tenants";
    } else if (location.pathname == "/edition") {
      pagekey = "Saas.Editions";
    } else if (location.pathname == "/organization-Unit") {
      pagekey = "AbpIdentity.OrganizationUnits";
    } else if (location.pathname == "/role") {
      pagekey = "AbpIdentity.Roles";
    } else if (location.pathname == "/users") {
      pagekey = "AbpIdentity.Users";
    } else if (location.pathname == "/security-logs") {
      pagekey = "AbpIdentity.SecurityLogs";
    } else if (location.pathname == "/applications") {
      pagekey = "OpenIddictPro.Application";
    } else if (location.pathname == "/scope") {
      pagekey = "OpenIddictPro.Scope";
    } else if (location.pathname == "/language") {
      pagekey = "LanguageManagement.Languages";
    } else if (location.pathname == "/language-text") {
      pagekey = "LanguageManagement.LanguageTexts";
    } else if (location.pathname == "/text-template") {
      pagekey = "TextTemplateManagement.TextTemplates";
    } else if (location.pathname == "/audit-logs") {
      pagekey = "AuditLogging.AuditLogs";
    } else if (location.pathname == "/settings") {
      pagekey = "AbpIdentity.SettingManagement";
    } else if (location.pathname == "/blogger") {
      pagekey = "Blogging.Blog";
    } else if (location.pathname == "/forms") {
      pagekey = "Forms.Form";
    } else if (location.pathname == "/payment-plans") {
      pagekey = "Payment.Plans";
    } else if (location.pathname == "/payment-requests") {
      pagekey = "Payment.PaymentRequests";
    } else if (location.pathname == "/blogs") {
      pagekey = "CmsKit.Blogs";
    } else if (location.pathname == "/blog-post") {
      pagekey = "CmsKit.BlogPosts";
    } else if (location.pathname == "/comments") {
      pagekey = "CmsKit.Comments";
    } else if (location.pathname == "/global-resources") {
      pagekey = "CmsKit.GlobalResources";
    } else if (location.pathname == "/menus") {
      pagekey = "CmsKit.Menus";
    } else if (location.pathname == "/news-letters") {
      pagekey = "CmsKit.Newsletter";
    } else if (location.pathname == "/pages") {
      pagekey = "CmsKit.Pages";
    } else if (location.pathname == "/polls") {
      pagekey = "CmsKit.Poll";
    } else if (location.pathname == "/tags") {
      pagekey = "CmsKit.Tags";
    } else if (location.pathname == "/url-forwarding") {
      pagekey = "CmsKit.UrlShorting";
    } else if (location.pathname == "/chats") {
      pagekey = "Chat.SettingManagement";
    } else if (location.pathname == "/claim-types") {
      pagekey = "AbpIdentity.ClaimTypes";
    } else if (location.pathname == "/forms-view" || "/forms-preview") {
      pagekey = "Forms.Form";
    } else if (location.pathname == "/file-management") {
      pagekey = "FileManagement.DirectoryDescriptor";
    } else if (location.pathname == "/processmodeler") {
      debugger;
 pagekey = "Bpmn-integration.ProcessModeler";
 } else if (location.pathname == "/modeler") {
 pagekey = "Bpmn-integration.Modeler";
 } else if (location.pathname == "/colormodeler") {
 pagekey = "Bpmn-integration.ColorModeler";
 } else if (location.pathname == "/commentmodeler") {
 pagekey = "Bpmn-integration.CommentModeler";
 } else if (location.pathname == "/transactionboundarymodeler") {
 pagekey = "Bpmn-integration.TransactionBoundaryModeler";
 } else if (location.pathname == "/propertypanelmodeler") {
 pagekey = "Bpmn-integration.PropertyPanelModeler";
 } else if (location.pathname == "/propertypanelextensionmodeler") {
 pagekey = "Bpmn-integration.PropertyPanelExtensionModeler";
 } else if (location.pathname == "/overlaymodeler") {
 pagekey = "Bpmn-integration.OverlayModeler";
 } else if (location.pathname == "/bpmnmodeler") {
 pagekey = "Bpmn-integration.BpmnModeler";
 } else if (location.pathname == "/minimapmodeler") {
 pagekey = "Bpmn-integration.Minimapmodeler";
 } else if (location.pathname == "/translatebpmnmodeler") {
 pagekey = "Bpmn-integration.TranslateBpmnModeler";
 } else if (location.pathname == "/examplebpmnmodeler") {
 pagekey = "Bpmn-integration.ExampleBpmnModeler";
 } else if (location.pathname == "/dynamicexamplebpmnmodeler") {
 pagekey = "Bpmn-integration.DynamicExampleBpmnModeler";
 } else if (location.pathname == "/bpmnexamplemodeler") {
 pagekey = "Bpmn-integration.BpmnExampleModeler";
 } else {
 pagekey = "extraCASE"; 
 setPermission(false); 
}

    const callConfigurationService = async () => {
      try {
        debugger;
        const res = await configurationService(currLanguage);
        const isGranted = isgrantedpolicies(`${pagekey}`, data);
        setPermission(isGranted);
      } catch (error) {
        // handle any errors here
      }
    }

    callConfigurationService();
  }, [currLanguage, location.pathname]);

  return <Outlet /> ;

  // return permission ? <Outlet /> : location.pathname == '/processmodeler'?<Outlet />:<Navigate to="/pagenotfound" replace />;
};
export default PrivateRoute_Auth;


