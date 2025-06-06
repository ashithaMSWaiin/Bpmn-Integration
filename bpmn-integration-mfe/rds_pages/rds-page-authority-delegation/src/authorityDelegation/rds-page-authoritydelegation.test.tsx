import React from "react";
import "@testing-library/jest-dom";
import {render } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../../../libs/state-management";
import configureMockStore from "redux-mock-store";
import { RdsButton, RdsDatePicker, RdsLabel, RdsNavtabs, RdsOffcanvas, RdsSearch } from "../../../rds-elements";
import AuthorityDelegation from "./AuthorityDelegation";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";

global.location = {
  pathname: "../../../../libs/proxy/core",
} as any;

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));
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
  RdsNavtabs: jest.fn(),
  RdsDatePicker: jest.fn(),
  RdsLabel: jest.fn(),
}));

jest.mock("../../../../../bpmn-integration-components/src", () => ({
  RdsCompApiScopeBasicResource: jest.fn(),
  RdsCompDatatable: jest.fn(),
  RdsCompAlertPopup: jest.fn(),
  RdsOffcanvas: jest.fn(),
  RdsCompApplicationBasic: jest.fn(),
  RdsCompApplicationWorkflows: jest.fn(),
  RdsCompPermissionTree: jest.fn(),
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

jest.mock('../../../../libs/state-management/directory-descriptors/directory-descriptors-slice.ts', () => ({
  getDirectoryDescriptorRequest: jest.fn(),
  postDirectoryDescriptorRequest: jest.fn(),
  deleteDirectoryDescriptorRequest: jest.fn(),
  getDirectoryDescriptorSubDirectoriesRequest: jest.fn(),
  postDirectoryDescriptor1Request: jest.fn(),
  getDirectoryDescriptor1Request: jest.fn(),
  postDirectoryDescriptorMoveRequest: jest.fn(),
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

jest.mock('../../../../libs/state-management/applications/applications-slice.ts', () => ({
  getApplicationsRequest: jest.fn(),
  putApplicationsRequest: jest.fn(),
  getApplications1Request: jest.fn(),
  postApplicationsRequest: jest.fn(),
  deleteApplicationsRequest: jest.fn(),
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

jest.mock('../../../../libs/state-management/security-logs/security-logs-slice.ts', () => ({
  fetchSecurityLogs: jest.fn(),
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

jest.mock('../../../../libs/state-management/settings/settings-slice.ts', () => ({
  actions: {
    updateSettings: jest.fn(),
    resetSettings: jest.fn(),
  },
  reducer: jest.fn(),
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
jest.mock('../../../../libs/state-management/newsletters/newsletters-slice.ts', () => ({
  NewsletterRecordAdminService: {
      getNewsletter: jest.fn(),
      getNewsletterCsvDetail: jest.fn(),
      getNewsletterPreferences: jest.fn(),
      getNewsletterExportCsv: jest.fn(),
      getNewsletter1: jest.fn(),
  }
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
jest.mock('../../../../libs/state-management/organization-tree/organization-tree-slice.ts', () => {
  return {
    __esModule: true, 
    default: 'mockedDefaultExport',
    actionCreator1: jest.fn(),
    actionCreator2: jest.fn(),
  };
});
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
jest.mock('../../../../libs/state-management/features/features-slice.ts', () => ({
  getFeaturesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  putFeaturesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  deleteFeaturesRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
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
jest.mock('../../../../libs/state-management/language-text/language-text-slice.ts', () => ({
  fetchLanguagesText: jest.fn().mockImplementation(() => Promise.resolve({})),
  fetchResources: jest.fn().mockImplementation(() => Promise.resolve({})),
  putLanguages: jest.fn().mockImplementation(() => Promise.resolve({})),
  restore: jest.fn().mockImplementation(() => Promise.resolve({})),
}));
jest.mock('../../../../libs/state-management/tenant/tenant-slice.ts', () => ({
  postTenantsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  getTenants1Request: jest.fn().mockImplementation(() => Promise.resolve({})),
  getTenantsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  putTenantsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
  deleteTenantsRequest: jest.fn().mockImplementation(() => Promise.resolve({})),
}));
jest.mock('../../../../libs/state-management/host/host-slice.ts', () => ({
  callLoginAction: jest.fn().mockImplementation(() => Promise.resolve({})),
  changeLanguageAction: jest.fn().mockImplementation(() => Promise.resolve({})),
  invalidCredentialAction: jest.fn().mockImplementation(() => Promise.resolve({})),
  setlogoImgAction: jest.fn().mockImplementation(() => Promise.resolve({})),
  setPicSideNav: jest.fn().mockImplementation(() => Promise.resolve({})),
  getProfilePictureHost: jest.fn().mockImplementation(() => Promise.resolve({})),
}));
jest.mock('../../../../libs/state-management/polls/polls-slice.ts', () => ({
  fetchPolls: jest.fn().mockImplementation(() => Promise.resolve({})),
  SavePolls: jest.fn().mockImplementation(() => Promise.resolve({})),
  deletePolls: jest.fn().mockImplementation(() => Promise.resolve({})),
  Widgets: jest.fn().mockImplementation(() => Promise.resolve({})),
  getPollDataById: jest.fn().mockImplementation(() => Promise.resolve({})),
  resultData: jest.fn().mockImplementation(() => Promise.resolve({})),
  UpdatePollsData: jest.fn().mockImplementation(() => Promise.resolve({})),
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

jest.mock('../../../../libs/state-management/personal-data/personal-data-slice.ts', () => ({
  getPersonalData: jest.fn().mockImplementation(() => Promise.resolve({})),
  requestPersonalData: jest.fn().mockImplementation(() => Promise.resolve({})),
  deletePersonalData: jest.fn().mockImplementation(() => Promise.resolve({})),
  downloadTokenPersonalData: jest.fn().mockImplementation(() => Promise.resolve({})),
  RequestsData: jest.fn().mockImplementation(() => Promise.resolve({})),
}));
jest.mock('../../../../libs/state-management/comments/comments-slice.ts', () => ({
  CommentAdminService: {
      getComments: jest.fn().mockImplementation(() => Promise.resolve({})),
      getComments1: jest.fn().mockImplementation(() => Promise.resolve({})),
      deleteComments: jest.fn().mockImplementation(() => Promise.resolve({})),
  }
}));
jest.mock('../../../../libs/state-management/tags/tags-slice.ts', () => ({
TagAdminService: {
    getTags: jest.fn().mockImplementation(() => Promise.resolve({})),
    postTags: jest.fn().mockImplementation(() => Promise.resolve({})),
    getTags1: jest.fn().mockImplementation(() => Promise.resolve({})),
    putTags: jest.fn().mockImplementation(() => Promise.resolve({})),
    deleteTags: jest.fn().mockImplementation(() => Promise.resolve({})),
    getTagsTagDefinitions: jest.fn().mockImplementation(() => Promise.resolve({})),
}
}));

jest.mock('../../../../libs/state-management/global-resources/globalResources-slice.ts', () => ({
GlobalResourcePublicService: {
    getGlobalResourcesStyle: jest.fn().mockImplementation(() => Promise.resolve({})),
    getGlobalResourcesScript: jest.fn().mockImplementation(() => Promise.resolve({})),
},
GlobalResourceAdminService: {
    getGlobalResources: jest.fn().mockImplementation(() => Promise.resolve({})),
    postGlobalResources: jest.fn().mockImplementation(() => Promise.resolve({})),
}
}));
jest.mock('../../../../libs/state-management/Blogs/blogs-slice.ts', () => ({
  fetchBlogsData: jest.fn().mockImplementation(() => Promise.resolve({})),
  deleteBlogsData: jest.fn().mockImplementation(() => Promise.resolve({})),
  addBlogsData: jest.fn().mockImplementation(() => Promise.resolve({})),
  editBlogsData: jest.fn().mockImplementation(() => Promise.resolve({})),
  fetchFeaturesBlogs: jest.fn().mockImplementation(() => Promise.resolve({})),
  putBlogsFeatures: jest.fn().mockImplementation(() => Promise.resolve({})),
}));

const mockStore = configureMockStore();

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

describe("Authority Delegation page", () => {
  it("renders Authority Delegation page correctly", async () => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    render(<Provider store={store}>
      <AuthorityDelegation />
    </Provider>);
    document.querySelector('[placeholder="Search"]');
    document.querySelector('[label="Delegate New User"]');
    document.querySelector('[title="Delegate New User"]');
    document.querySelector('[name="myDelegateUser"]');
    document.querySelector('[name="delegateUser"]');
  });

  it("Check Authority Delegation Page functionality", async () => {
    const pageNavtabsItems = [
      {
        id: "authorityDelegation",
        label: "Authority Delegation",
        order: 1,
        url: "/authoritydelegation",
      },
      {
        id: "permissionTree",
        label: "Permission Tree",
        order: 2,
        url: "/permissiontree",
      },
    ];
    const setActivePageId = jest.fn();
    const mockDispatch = jest.fn();
    const handleCloseOffcanvas = jest.fn();
    const tableHeadersDelegateUsers = {
      id: "delegateUser",
      label: "Delegate User",
      order: 1,
      type: "string",
      width: "20%",
      displayName: "Delegate User",
      key: "delegateUser",
      datatype: "string",
    };
    const filteredDelegateUserTable = [
      {
        delegateUser: "User1",
      },
      {
        delegateUser: "User2",
      },
    ];
    const handlerActions = jest.fn();
    const onDelegateDateRangeSelect = jest.fn();
    const handlerDelegateNewUser = jest.fn();
    const handlerDeleteConfirm = jest.fn();
    const tableHeadersMyDelegateUsers = {
      id: "myDelegateUser",
      label: "My Delegate User",
      order: 1,
      type: "string",
      width: "20%",
      displayName: "My Delegate User",
      key: "myDelegateUser",
      datatype: "string",
    };
    const myDelegateUserTable = [
      {
        myDelegateUser: "User1",
      },
      {
        myDelegateUser: "User2",
      },
    ];
    const handleSearchChange = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
   const authority = render(<Provider store={store}>
      <AuthorityDelegation />
      <RdsNavtabs
        navtabsItems={pageNavtabsItems.map(item => ({
          ...item,
          label: item.label,
          id: item.id
        }))}
        type="tabs"
        activeNavtabOrder={(activeNavTabId) => {setActivePageId(activeNavTabId);}}
      />
      <RdsSearch placeholder={"Search"} size={"small"}  onChange={(e) =>handleSearchChange(e, "delegateUser") }/>
      <RdsButton label="Delegate New User"  onClick={handleCloseOffcanvas}/>
      <RdsCompDatatable tableHeaders={[tableHeadersDelegateUsers]} tableData={[filteredDelegateUserTable]} pagination={false}  onActionSelection={handlerActions}/>
      <RdsOffcanvas placement={"start"} backDrop={false} scrolling={false} offId={"delegateNewUser"} canvasTitle={"Delegate New User"} onClose={handleCloseOffcanvas}  onclick={handleCloseOffcanvas}/>
      <RdsLabel label="AbpAccount.DelegationDateRange"/>
      <RdsDatePicker isDropdownOpen={false} customDate={onDelegateDateRangeSelect}/>
      <RdsButton label="AbpUi.Cancel" onClick={handleCloseOffcanvas}/>
      <RdsButton label="AbpUi.Save"  onClick={handlerDelegateNewUser}/>
      <RdsCompAlertPopup alertID={"authDel-delete-off"} onSuccess={handlerDeleteConfirm}/>
      <RdsSearch placeholder={"Search"} size={""} onChange={(e) =>
                                  handleSearchChange(e, "myDelegateUser")
                                }/>
      <RdsCompDatatable tableHeaders={[tableHeadersMyDelegateUsers]} tableData={[myDelegateUserTable]} pagination={false}/>
    </Provider>);
    expect(authority).toMatchSnapshot();
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
});