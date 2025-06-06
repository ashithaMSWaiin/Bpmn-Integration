import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import Roles from "./Roles";
import { RdsButton, RdsInput, RdsOffcanvas, RdsSearch } from "../../../../../bpmn-integration-elements/src";
import { RdsCompAlertPopup, RdsCompClaims, RdsCompDatatable, RdsCompPermissionTree } from "../../../rds-components";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key: string) => key,
    }),
    initReactI18next: { // add this line
      type: "3rdParty",
      init: () => {},
    },
  }));
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

global.location = {
    pathname: "../../../../libs/proxy/core",
  } as any;
  
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  }));
  jest.mock("../../../../../bpmn-integration-components/src/index.ts", () => ({
    ...jest.requireActual("../../../../../bpmn-integration-components/src/index.ts"),
  }));
  jest.mock("../../../../../bpmn-integration-elements/src/index.ts", () => ({
    ...jest.requireActual("../../../../../bpmn-integration-elements/src/index.ts"),
  }));
  jest.mock("../../../../libs/state-management/index.ts", () => ({
    store: {
      getState: jest.fn().mockReturnValue({
        persistedReducer: {
          configureStore: {
            configuration: {
              auth: {
                grantedPolicies: {},
              },
            },
          },
        },
      }),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    },
  }));
  
  // Mock the rds-elements and rds-components
  jest.mock("../../../../../bpmn-integration-elements/src", () => ({
    RdsButton: jest.fn(),
    RdsOffcanvas: jest.fn(),
    RdsAlert: jest.fn(),
    RdsSearch: jest.fn(),
    RdsModal: jest.fn(),
    RdsLabel : jest.fn(),
    RdsInput : jest.fn(),
    RdsIcon : jest.fn(),
    RdsCheckbox : jest.fn(),
    RdsSelectList : jest.fn(),
    RdsBadge : jest.fn(),
    RdsFabMenu : jest.fn(),
    RdsNavtabs : jest.fn(),
  })); 
  
  jest.mock("../../../../../bpmn-integration-components/src", () => ({
    RdsCompApiScopeBasicResource: jest.fn(),
    RdsCompDatatable: jest.fn(),
    RdsCompAlertPopup: jest.fn(),
    RdsOffcanvas:jest.fn(),
    RdsCompForgotPassword: jest.fn(),
    RdsCompFormsEmail: jest.fn(),
    RdsCompIconList: jest.fn(),
    RdsCompNewLanguage: jest.fn(),
    RdsCompWebsiteLog: jest.fn(),
    RdsCompCache: jest.fn(),
    RdsCompPermissionTree: jest.fn(),
    RdsCompClaims: jest.fn(),
    RdsCompRoles: jest.fn(),
  }));
  
  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
  }));

  jest.mock('../../../../libs/state-management/authoritydelegation/authoritydelegation-slice.ts', () => ({
    getUserDelegationDelegatedUsers: jest.fn(),
    getUserDelegationMyDelegatedUsers: jest.fn(),
    getUserDelegationActiveDelegations: jest.fn(),
    getUserDelegationUserLookup: jest.fn(),
    postUserDelegationDelegateNewUser: jest.fn(),
    postUserDelegationDeleteDelegation: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/linkedaccounts/linkedaccounts-slice.ts', () => ({
    getLinkUserRequest: jest.fn(),
    postLinkUserGenerateLinkTokenRequest: jest.fn(),
    postLinkUserVerifyLinkTokenRequest: jest.fn(),
    postLinkUserGenerateLinkLoginTokenRequest: jest.fn(),
    postLinkUserVerifyLinkLoginTokenRequest: jest.fn(),
    postLinkUserUnlinkRequest: jest.fn(),
  }));

  jest.mock('../../../../libs/state-management/tag-admin/tag-admin-slice.ts', () => ({
    postTagsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getTagsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    deleteTagsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/file-descriptors/file-descriptors-slice.ts', () => ({
    getFileDescriptorRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    postFileDescriptorRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    deleteFileDescriptorRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getFileDescriptor1Request: jest.fn().mockImplementation(() => Promise.resolve({})),
    postFileDescriptorUploadRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    postFileDescriptorMoveRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    postFileDescriptorPreUploadInfoRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getFileDescriptorContentRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getFileDescriptorDownloadTokenRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getFileDescriptorDownloadRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/directory-descriptors/directory-descriptors-slice.ts', () => ({
    getDirectoryDescriptorRequest: jest.fn(),
    postDirectoryDescriptorRequest: jest.fn(),
    deleteDirectoryDescriptorRequest: jest.fn(),
    getDirectoryDescriptorSubDirectoriesRequest: jest.fn(),
    postDirectoryDescriptor1Request: jest.fn(),
    getDirectoryDescriptor1Request: jest.fn(),
    postDirectoryDescriptorMoveRequest: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/audit-logs/audit-logs-slice.ts', () => ({
    getAuditLogsRequest: jest.fn(),
    getAuditLogs1Request: jest.fn(),
    getAuditLogsStatisticsErrorRateRequest: jest.fn(),
    getAuditLogsStatisticsAverageExecutionDurationPerDayRequest: jest.fn(),
    getAuditLogsEntityChangesRequest: jest.fn(),
    getAuditLogsEntityChangesWithUsernameRequest: jest.fn(),
    getAuditLogsEntityChangeWithUsernameRequest: jest.fn(),
    getAuditLogsEntityChanges1Request: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/language-texts/language-texts-slice.ts', () => ({
    getLanguageTextsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getLanguageTexts1Request: jest.fn().mockImplementation(() => Promise.resolve({})),
    putLanguageTextsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    putLanguageTextsRestoreRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/poll-admin/poll-admin-slice.ts', () => ({
    getPollRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    postPollRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getPoll1Request: jest.fn().mockImplementation(() => Promise.resolve({})),
    putPollRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    deletePollRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getPollWidgetsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getPollResultRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/plan-admin/plan-admin-slice.ts', () => ({
    postPlansRequest: jest.fn(),
    deletePlansRequest: jest.fn(),
    getPlansRequest: jest.fn(),
    postPlansExternalPlansRequest: jest.fn(),
    getPlansExternalPlansRequest: jest.fn(),
    deletePlansExternalPlansRequest: jest.fn(),
    putPlansExternalPlansRequest: jest.fn(),
    getPlans1Request: jest.fn(),
    putPlansRequest: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/role/role-slice.ts', () => ({
    getRolesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    putRolesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    deleteRolesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    postRolesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getRoles1Request: jest.fn().mockImplementation(() => Promise.resolve({})),
    getRolesAllRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    putRolesClaimsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getRolesClaimsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getRolesAllClaimTypesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/organization-unit/organization-unit-slice.ts',() => ({
    putOrganizationUnitsRolesRequest :jest.fn(),
    getOrganizationUnitsRolesRequest :jest.fn(),
    putOrganizationUnitsMembersRequest :jest.fn(),
    getOrganizationUnitsMembersRequest:jest.fn()
  }));
  jest.mock('../../../../libs/state-management/permissions/permissions-slice.ts', () => ({
    getPermissionsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    putPermissionsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    putOrganizationUnitsRolesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/applications/applications-slice.ts', () => ({
    getApplicationsRequest: jest.fn(),
    putApplicationsRequest: jest.fn(),
    getApplications1Request: jest.fn(),
    postApplicationsRequest: jest.fn(),
    deleteApplicationsRequest: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/features/features-slice.ts', () => ({
    getFeaturesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    putFeaturesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    deleteFeaturesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/edition/edition-slice.ts', () => ({
    fetchEditionData: jest.fn(),
    deleteEditionData: jest.fn(),
    addEditionData: jest.fn(),
    editEditionData: jest.fn(),
    fetchFeaturesEdition: jest.fn(),
    saveFeaturesEdition: jest.fn(),
    restoreToDefaultFeaturesEdition: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/languages/languages-slice.ts', () => ({
    LanguagesService: {
      getLanguagesAll: jest.fn(),
      getLanguages: jest.fn(),
      postLanguages: jest.fn(),
      getLanguages1: jest.fn(),
      putLanguages: jest.fn(),
      deleteLanguages: jest.fn(),
      putLanguagesSetAsDefault: jest.fn(),
      getLanguagesResources: jest.fn(),
      getLanguagesCultureList: jest.fn(),
      getLanguagesFlagList: jest.fn(),
    },
  }));
  jest.mock('../../../../libs/state-management/register/register-slice.ts', () => ({
    registerData: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/blog-post/blog-post-slice.ts', () => ({
    getAllBlogPost: jest.fn().mockImplementation(() => Promise.resolve([])),
    getBlogsBlogPosts1: jest.fn().mockImplementation(() => Promise.resolve({})),
    addBlogPostData: jest.fn().mockImplementation(() => Promise.resolve([])),
    postBlogsPostsCreateAndSendToReview: jest.fn().mockImplementation(() => Promise.resolve([])),
    postBlogPostsPublish: jest.fn().mockImplementation(() => Promise.resolve({})),
    postBlogPostsDraft: jest.fn().mockImplementation(() => Promise.resolve({})),
    deleteBlogPosts: jest.fn().mockImplementation(() => Promise.resolve({})),
    editBlogPostData: jest.fn().mockImplementation(() => Promise.resolve([])),
  }));
  jest.mock('../../../../libs/state-management/pages/pages-slice.ts', () => ({
    fetchPagesData: jest.fn().mockImplementation(() => Promise.resolve({})),
    postPagesData: jest.fn().mockImplementation(() => Promise.resolve({})),
    deletePageData: jest.fn().mockImplementation(() => Promise.resolve({})),
    editPageData: jest.fn().mockImplementation(() => Promise.resolve({})),
    fetchEditPagesData: jest.fn().mockImplementation(() => Promise.resolve({})),
    isHomePageChangeData: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/forgot-password/forgotpassword-slice.ts', () => ({
    shouldSendPasswordResetCode: jest.fn().mockImplementation(() => Promise.resolve({})),
    forgotPasswordReducer: jest.fn().mockImplementation(() => Promise.resolve({})),
    forgotPasswordActions: {
      getProfilePicture: jest.fn().mockImplementation(() => Promise.resolve({})),
    },
  }));
  jest.mock('../../../../libs/state-management/claim-type/claim-type-slice.ts', () => ({
    getClaimTypesRequest: jest.fn(),
    postClaimTypesRequest: jest.fn(),
    putClaimTypesRequest: jest.fn(),
    deleteClaimTypesRequest: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/security-logs/security-logs-slice.ts', () => ({
    fetchSecurityLogs: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/user/user-slice.ts', () => ({
    getUserRequest: jest.fn(),
    getUser1Request: jest.fn(),
    getUserStatisticsErrorRateRequest: jest.fn(),
    getUserStatisticsAverageExecutionDurationPerDayRequest: jest.fn(),
    getUserEntityChangesRequest: jest.fn(),
    getUserEntityChangesWithUsernameRequest: jest.fn(),
    getUserEntityChangeWithUsernameRequest: jest.fn(),
    getUserEntityChanges1Request: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/language-text/language-text-slice.ts', () => ({
    fetchLanguagesText: jest.fn().mockImplementation(() => Promise.resolve({})),
    fetchResources: jest.fn().mockImplementation(() => Promise.resolve({})),
    putLanguages: jest.fn().mockImplementation(() => Promise.resolve({})),
    restore: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/settings/settings-slice.ts', () => ({
    actions: {
      updateSettings: jest.fn(),
      resetSettings: jest.fn(),
    },
    reducer: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/tenant/tenant-slice.ts', () => ({
    postTenantsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    getTenants1Request: jest.fn().mockImplementation(() => Promise.resolve({})),
    getTenantsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    putTenantsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
    deleteTenantsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/chats/chats-slice.ts', () => ({
    FetchConversation: jest.fn(),
    postConversationSendMessage: jest.fn(),
    ReadConversationData: jest.fn(),
    FetchContacts: jest.fn(),
    enterSendChat: jest.fn(),
    default: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/file-management/file-management-slice.ts', () => ({
    fetchSubDirectory: jest.fn(),
    fetchDirectoryDescriptor: jest.fn(),
    saveDirectoryDescriptor: jest.fn(),
    fetchEditDirectory: jest.fn(),
    updateDirectoryDescriptor: jest.fn(),
    deleteDirectoryDescriptor: jest.fn(),
    moveDirectoryDescriptor: jest.fn(),
    fetchFileDescriptorId: jest.fn(),
    updateFileDescriptor: jest.fn(),
    DeleteFileDescriptor: jest.fn(),
    fetchFileDescriptor: jest.fn(),
    uploadFileDescriptor: jest.fn(),
    moveFileDescriptor: jest.fn(),
    infoFileDescriptor: jest.fn(),
    fetchFileContentDescriptor: jest.fn(),
    fetchFileTokenDescriptor: jest.fn(),
    fetchFileDownloadDescriptor: jest.fn(),
    default: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/host/host-slice.ts', () => ({
    callLoginAction: jest.fn().mockImplementation(() => Promise.resolve({})),
    changeLanguageAction: jest.fn().mockImplementation(() => Promise.resolve({})),
    invalidCredentialAction: jest.fn().mockImplementation(() => Promise.resolve({})),
    setlogoImgAction: jest.fn().mockImplementation(() => Promise.resolve({})),
    setPicSideNav: jest.fn().mockImplementation(() => Promise.resolve({})),
    getProfilePictureHost: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/my-account/my-account-slice.ts', () => ({
    fetchMyProfile: jest.fn(),
    saveMyProfile: jest.fn(),
    getProfilePicture: jest.fn(),
    sendEmailVerifyProfile: jest.fn(),
    changepasswordProfile: jest.fn(),
    setProfilePicture: jest.fn(),
    setTwoFactorEnabled: jest.fn(),
    default: jest.fn(),
  }));
  jest.mock('../../../../libs/state-management/forms/forms-slice.ts', () => {
    return {
      getForm: jest.fn(),
      postForm: jest.fn(),
      putForm: jest.fn(),
      deleteForm: jest.fn(),
      getForm1: jest.fn(),
      postForm1: jest.fn(),
      putForm1: jest.fn(),
      deleteForm1: jest.fn(),
      default: jest.fn(),
    };
  });
  jest.mock('../../../../libs/state-management/polls/polls-slice.ts', () => ({
    fetchPolls: jest.fn().mockImplementation(() => Promise.resolve({})),
    SavePolls: jest.fn().mockImplementation(() => Promise.resolve({})),
    deletePolls: jest.fn().mockImplementation(() => Promise.resolve({})),
    Widgets: jest.fn().mockImplementation(() => Promise.resolve({})),
    getPollDataById: jest.fn().mockImplementation(() => Promise.resolve({})),
    resultData: jest.fn().mockImplementation(() => Promise.resolve({})),
    UpdatePollsData: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/newsletters/newsletters-slice.ts', () => ({
    NewsletterRecordAdminService: {
        getNewsletter: jest.fn(),
        getNewsletterCsvDetail: jest.fn(),
        getNewsletterPreferences: jest.fn(),
        getNewsletterExportCsv: jest.fn(),
        getNewsletter1: jest.fn(),
    }
  }));
  jest.mock('../../../../libs/state-management/menus/menus-slice.ts', () => ({
    MenusState: {
      loading: false,
      menus: [],
      pages: { items: [], totalCount: null },
      error: '',
    },
    getAllMenuItems: jest.fn().mockImplementation(() => Promise.resolve({})),
    getMenuItem: jest.fn().mockImplementation(() => Promise.resolve({})),
    editMenuItem: jest.fn().mockImplementation(() => Promise.resolve({})),
    postMenuItems: jest.fn().mockImplementation(() => Promise.resolve({})),
    deleteMenuItem: jest.fn().mockImplementation(() => Promise.resolve({})),
    fetchPages: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  jest.mock('../../../../libs/state-management/Blogs/blogs-slice.ts', () => ({
    fetchBlogsData: jest.fn().mockImplementation(() => Promise.resolve({})),
    deleteBlogsData: jest.fn().mockImplementation(() => Promise.resolve({})),
    addBlogsData: jest.fn().mockImplementation(() => Promise.resolve({})),
    editBlogsData: jest.fn().mockImplementation(() => Promise.resolve({})),
    fetchFeaturesBlogs: jest.fn().mockImplementation(() => Promise.resolve({})),
    putBlogsFeatures: jest.fn().mockImplementation(() => Promise.resolve({})),
  }));
  // Mock localStorage in your test setup
  const localStorageMock: Storage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    length: 0, // Add length property
    key: jest.fn(), // Add key method
  };
  
  global.localStorage = localStorageMock;
  describe("Roles Page", () => {
it("renders Roles page correctly", () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <Roles />
        </Provider>
    );
    document.querySelector('[placeholder="Search"]');
    document.querySelector('[button="AbpIdentity.NewRole"]');
    document.querySelector('[placeholder="Enter Role Name"]');
    document.querySelector('[title="Edit Role"]');
  });

it("Check roles page functionality", () => {
  const handleSearchChange = jest.fn();
  const handlerNewRole = jest.fn();
  const handlerActions = jest.fn();
  const paginationHandler = jest.fn();
  const tableHeader = { title: "Role Name", dataIndex: "roleName", key: "roleName" };
  const setVal = jest.fn();
  const handlerAddRole = jest.fn();
  const handlerEditRole = jest.fn();
  const handleEditedPermissions = jest.fn();
  const permissionListData = {
    name: "AbpIdentity.Roles",
    displayName: "AbpIdentity.Roles",
    children: [
      {
        name: "AbpIdentity.Roles.Create",
        displayName: "AbpIdentity.Roles.Create",
      }
    ],
  };
  const handlerPermission = jest.fn();
  const claimDataHandler = jest.fn();
  const handlerClaim = jest.fn();
  const handlerDeleteConfirm = jest.fn();
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  const roles = render(
      <Provider store={store}>
          <Roles />
          <RdsSearch placeholder="Search" onChange={handleSearchChange} size={"small"}/>
          <RdsButton label="AbpIdentity.NewRole" onClick={handlerNewRole}/>
          <RdsCompDatatable tableHeaders={[{ ...tableHeader, displayName: "Role Name", datatype: "string" }]} tableData={[]} pagination={false} onActionSelection={handlerActions} onPaginationHandler={paginationHandler}/>
          <RdsOffcanvas placement="top" backDrop={true} scrolling={true} offId="newRole" canvasTitle="AbpIdentity.NewRole" onClose={handlerNewRole}/>
          <RdsInput label="AbpIdentity.NewRole" placeholder="Enter Role Name" onChange={(e: any) => setVal(e.target.value)}/>
          <RdsButton label="AbpUi.Cancel" onClick={handlerNewRole} databsdismiss="offcanvas"/>
          <RdsButton label="AbpUi.Save" onClick={handlerAddRole}/>
          <RdsOffcanvas placement={"top"} backDrop={false} scrolling={false} offId={"role-edit-off"} canvasTitle={"Edit Role"} />
          <RdsInput label="AbpIdentity.RoleName" onChange={(e: any) => setVal(e.target.value)}/>
          <RdsButton label="AbpUi.Save" onClick={handlerEditRole}/>
          <RdsOffcanvas placement={"top"} backDrop={false} scrolling={false} offId={"role-permissions-off"} canvasTitle={"Permission"} />
          <RdsCompPermissionTree permissions={[permissionListData]} editedPermissions={handleEditedPermissions}/>
          <RdsButton label="AbpUi.Save" onClick={handlerPermission}/>
          <RdsOffcanvas placement={"top"} backDrop={false} scrolling={false} offId={"role-claims-off"} canvasTitle={"Claims"} />
          <RdsCompClaims getEditClaimData={claimDataHandler}/>
          <RdsButton label="AbpUi.Save" onClick={handlerClaim}/>
          <RdsCompAlertPopup alertID={"role-delete-off"} onSuccess={handlerDeleteConfirm}/>
      </Provider>
  );
  expect(roles).toMatchSnapshot();
});

afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls between tests
    // Reset localStorage to a new object
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn(),
    };
  });
  })