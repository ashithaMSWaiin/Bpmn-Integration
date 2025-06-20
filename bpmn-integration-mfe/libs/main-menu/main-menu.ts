import Children from "react";
const MainMenu = [
  {
    key: "Home",
    label: "Home",
    icon: "home",
     path: "/",
     permission: "Home.Home",
    subTitle: "subtitle here",
    iconPath: "./assets/lottie-files/outlined/dual-color/dashboard.json",
    width: "30px",
    height: "30px",
  },
  {
    key: "0",
    label: "Dashboard",
    icon: "dashboard-new",
    path: "/dashboard",
    subTitle: "Statistics and reports",
    permission: (localStorage.getItem("isImpersonation") === "true" ? "abp_react_8_1.Dashboard.Tenant" : "abp_react_8_1.Dashboard.Host"),
    iconPath: "./assets/lottie-files/outlined/dual-color/dashboard-new.json",
    width: "30px",
    height: "30px",
  },
  {
    key: "2",
    label: "Saas.Menu:Saas",
    icon: "saas",
    iconPath: "./assets/lottie-files/outlined/dual-color/saas.json",
    width: "30px",
    height: "30px",
    children: [
      {
        key: "2-0",
        label: "Saas.Tenants",
        icon: "tenant",
        path: "/tenant",
        subTitle: "Manage your tenants",
        permission: "Saas.Tenants",
      },
      {
        key: "2-1",
        label: "Saas.Editions",
        icon: "editions",
        path: "/edition",
        subTitle: "Manage editions and features of the application",
        permission: "Saas.Editions",
      },
    ],
  },
  {
    key: "3",
    label: "AbpUiNavigation.Menu:Administration",
    icon: "administrationlotti",
    iconPath: "./assets/lottie-files/outlined/dual-color/administration.json",
    /* iconPath: "administrationlottie",*/
    width: "30px",
    height: "30px",
    children: [
      {
        key: "3-0",
        label: "AbpIdentity.Menu:IdentityManagement",
        icon: "manage_linked",
        children: [
          {
            key: "3-0-0",
            label: "AbpIdentity.OrganizationUnits",
            icon: "organization",
            path: "/organization-Unit",
            subTitle: "Use organization units to organize users and entities",
            permission: "AbpIdentity.OrganizationUnits",
          },
          {
            key: "3-0-1",
            label: "AbpIdentity.Roles",
            icon: "roles",
            path: "/role",
            subTitle: "Use roles to group permissions",
            permission: "AbpIdentity.Roles",
          },
          {
            key: "3-0-2",
            label: "AbpIdentity.Users",
            icon: "users",
            path: "/users",
            subTitle: "Manage users and permissions",
            permission: "AbpIdentity.Users",
          },
          {
            key: "3-0-3",
            label: "AbpIdentity.ClaimTypes",
            icon: "clipboard_data",
            path: "/claim-types",
            subTitle: "Manage users and permissions",
            permission: "AbpIdentity.ClaimTypes",
          },
          {
            key: "3-0-4",
            label: "AbpIdentity.SecurityLogs",
            icon: "shield_check",
            path: "/security-logs",
            subTitle: "Manage users and permissions",
            permission: "AbpIdentity.SecurityLogs",
          },
        ],
      },
      {
        key: "3-1",
        label: "AbpOpenIddict.Menu:OpenIddict",
        icon: "profile_picture",
        children: [
          {
            key: "3-1-0",
            label: "AbpOpenIddict.Applications",
            icon: "app_window",
            path: "/applications",
            subTitle: "Use organization units to organize users and entities",
            permission: "OpenIddictPro.Application",
          },
          {
            key: "3-1-1",
            label: "AbpOpenIddict.Scopes",
            icon: "scope",
            path: "/scope",
            subTitle: "Use organization units to organize users and entities",
            permission: "OpenIddictPro.Scope",
          },
        ],
      },
      {
        key: "3-2",
        label: "LanguageManagement.Menu:Languages",
        icon: "languages",
        children: [
          {
            key: "3-2-0",
            label: "LanguageManagement.Languages",
            icon: "languages",
            path: "/language",
            subTitle: "Manage user interface languages",
            permission: "LanguageManagement.Languages",
          },
          {
            key: "3-2-1",
            label: "LanguageManagement.LanguageTexts",
            icon: "language",
            path: "/language-text",
            subTitle: "Manage user interface languages",
            permission: "LanguageManagement.LanguageTexts",
          },
        ],
      },
      {
        key: "3-3",
        label: "TextTemplateManagement.Menu:TextTemplates",
        icon: "text_template",
        path: "/text-template",
        subTitle: "Manage user interface languages",
        permission: "TextTemplateManagement.TextTemplates",
      },
      {
        key: "3-4",
        label: "AbpAuditLogging.Menu:AuditLogging",
        icon: "audit_logs",
        path: "/audit-logs",
        subTitle: "",
        permission: "AuditLogging.AuditLogs",
      },
      {
        key: "3-5",
        label: "AbpSettingManagement.Settings",
        icon: "setting",
        path: "/settings",
        subTitle: "Show and change application settings",
        permission: "AbpAccount.SettingManagement",
      },
      {
        key: "3-6",
        label: "Blogging.Menu:BlogManagement",
        icon: "Blog",
        children: [
          {
            key: "3-6-0",
            label: "Blogging.Blogs",
            icon: "blog",
            path: "/blogger",
            subTitle: "Blogs, Posts, Articles",
            permission: "Blogging.Blog",
          },
        ],
      },
    ],
  },
  {
    key: "4",
    label: "FileManagement.Menu:FileManagement",
    icon: "file_management",
    path: "/file-management",
    subTitle: "Manages the details of the files and folders respectively",
    permission: "FileManagement.DirectoryDescriptor",
    iconPath: "./assets/lottie-files/outlined/dual-color/file-management.json",
    width: "30px",
    height: "30px",
  },
  {
    key: "5",
    label: "Forms.Menu:Forms",
    icon: "forms",
    path: "/forms",
    subTitle: "Forms",
    permission: "Forms.Form",
    iconPath: "./assets/lottie-files/outlined/dual-color/forms.json",
    width: "30px",
    height: "30px",
  },
  {
    key: "6",
    label: "Payment.Menu:PaymentManagement",
    icon: "payment",
    iconPath: "./assets/lottie-files/outlined/dual-color/card-payment.json",
    width: "30px",
    height: "30px",
    children: [
      {
        key: "6-0-0",
        label: "Payment.Menu:Plans",
        icon: "subscription",
        path: "/payment-plans",
        subTitle: "Payment Plans",
        permission: "Payment.Plans",
      },
      {
        key: "6-0-1",
        label: "Payment.Menu:PaymentRequests",
        icon: "daily_sales",
        path: "/payment-requests",
        subTitle: "Payment Requests",
        permission: "Payment.PaymentRequests",
      },
    ],
  },
  {
    key: "7",
    label: "CmsKit.Menu:CMS",
    icon: "cms",
    iconPath: "./assets/lottie-files/outlined/dual-color/cms.json",
    width: "30px",
    height: "30px",
    children: [
      {
        key: "7-0-0",
        label: "CmsKit.Blogs",
        icon: "blog",
        path: "/blogs",
        subTitle: "Manage your blogs",
        permission: "CmsKit.Blogs",
      },
      {
        key: "7-0-1",
        label: "CmsKit.BlogPosts",
        icon: "file_data",
        path: "/blog-post",
        subTitle: "subtitle here",
        permission: "CmsKit.BlogPosts",
      },
      {
        key: "7-0-2",
        label: "CmsKit.Comments",
        icon: "chat",
        path: "/comments",
        subTitle: "Comments",
        permission: "CmsKit.Comments",
      },
      {
        key: "7-0-3",
        label: "CmsKit.GlobalResources",
        icon: "globe",
        path: "/global-resources",
        subTitle: "Global Resources",
        permission: "CmsKit.GlobalResources",
      },
      {
        key: "7-0-4",
        label: "CmsKit.Menus",
        icon: "gear",
        path: "/menus",
        subTitle: "menus",
        permission: "CmsKit.Menus",
      },
      {
        key: "7-0-5",
        label: "CmsKit.Newsletters",
        icon: "file",
        path: "/news-letters",
        subTitle: "Newsletters",
        permission: "CmsKit.Newsletter",
      },
      {
        key: "7-0-6",
        label: "CmsKit.Pages",
        icon: "pages",
        path: "/pages",
        subTitle: "subtitle here",
        permission: "CmsKit.Pages",
      },
      {
        key: "7-0-7",
        label: "CmsKit.Polls",
        icon: "card_data",
        path: "/polls",
        subTitle: "Blogs, Posts, Articles",
        permission: "CmsKit.Poll",
      },
      {
        key: "7-0-8",
        label: "CmsKit.Tags",
        icon: "tag",
        path: "/tags",
        subTitle: "tags",
        permission: "CmsKit.Tags",
      },
      {
        key: "7-0-9",
        label: "CmsKit.UrlForwarding",
        icon: "share",
        path: "/url-forwarding",
        subTitle: "Blogs, Posts, Articles",
        permission: "CmsKit.UrlShorting",
      },
    ],
  },
{
                                key: "8",
                                label: "ProcessModeler",
                                icon: "icons",
                                path: "/processmodeler",
                                permission: "",
                                subTitle: "subtitle here"
                            },
{
                                key: "9",
                                label: "Modeler",
                                icon: "icons",
                                path: "/modeler",
                                permission: "Bpmn-integration.Modeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "10",
                                label: "ColorModeler",
                                icon: "icons",
                                path: "/colormodeler",
                                permission: "Bpmn-integration.ColorModeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "11",
                                label: "CommentModeler",
                                icon: "icons",
                                path: "/commentmodeler",
                                permission: "Bpmn-integration.CommentModeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "12",
                                label: "TransactionBoundaryModeler",
                                icon: "icons",
                                path: "/transactionboundarymodeler",
                                permission: "Bpmn-integration.TransactionBoundaryModeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "13",
                                label: "PropertyPanelModeler",
                                icon: "icons",
                                path: "/propertypanelmodeler",
                                permission: "Bpmn-integration.PropertyPanelModeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "14",
                                label: "PropertyPanelExtensionModeler",
                                icon: "icons",
                                path: "/propertypanelextensionmodeler",
                                permission: "Bpmn-integration.PropertyPanelExtensionModeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "15",
                                label: "OverlayModeler",
                                icon: "icons",
                                path: "/overlaymodeler",
                                permission: "Bpmn-integration.OverlayModeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "16",
                                label: "BpmnModeler",
                                icon: "icons",
                                path: "/bpmnmodeler",
                                permission: "Bpmn-integration.BpmnModeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "17",
                                label: "Minimapmodeler",
                                icon: "icons",
                                path: "/minimapmodeler",
                                permission: "Bpmn-integration.Minimapmodeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "18",
                                label: "TranslateBpmnModeler",
                                icon: "icons",
                                path: "/translatebpmnmodeler",
                                permission: "Bpmn-integration.TranslateBpmnModeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "19",
                                label: "ExampleBpmnModeler",
                                icon: "icons",
                                path: "/examplebpmnmodeler",
                                permission: "Bpmn-integration.ExampleBpmnModeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "20",
                                label: "DynamicExampleBpmnModeler",
                                icon: "icons",
                                path: "/dynamicexamplebpmnmodeler",
                                permission: "Bpmn-integration.DynamicExampleBpmnModeler",
                                subTitle: "subtitle here"
                            },
{
                                key: "21",
                                label: "BpmnExampleModeler",
                                icon: "icons",
                                path: "/bpmnexamplemodeler",
                                permission: "Bpmn-integration.BpmnExampleModeler",
                                subTitle: "subtitle here"
                            }













,
];

export default MainMenu;
