import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RdsCompAppShell from "./rds-comp-app-shell";
import RdsCompAppShellItem from "./rds-comp-app-shell-item";
import { BrowserRouter, HashRouter } from "react-router-dom";
import RdsCompSideNavigation from "../../../bpmn-integration-components/src/rds-comp-side-navigation";
import RdsCompTopNavigation from "../../../bpmn-integration-components/src/rds-comp-top-navigation/rds-comp-top-navigation";

const meta: Meta = {
  title: "Application Shells",
  component: RdsCompAppShell,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RdsCompAppShell>;

export default meta;
type Story = StoryObj<typeof RdsCompAppShell>;

export const Classic: Story = {
  args: {
    displayType: "Classic",
    children: (
      <>
        <RdsCompAppShellItem title={""}>
          <div className="row">
            <RdsCompTopNavigation
              brandLogo="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png"
              brandName="Raaghu Design System"
              languageItems={[
                {
                  icon: "us",
                  iconHeight: "20px",
                  iconWidth: "20px",
                  label: "EN(US)",
                  val: "en",
                },
                {
                  icon: "in",
                  iconHeight: "20px",
                  iconWidth: "20px",
                  label: "English(IND)",
                  val: "en",
                },
                {
                  icon: "us",
                  iconHeight: "20px",
                  iconWidth: "20px",
                  label: "French",
                  val: "fr",
                },
              ]}
              logo="https://anzstageui.raaghu.io/assets/raaghu_icon.png"
              navbarSubTitle="Statistics and reports"
              navbarTitle="Dashboard"
              notifications={[
                {
                  selected: false,
                  state: 1,
                  status: "success",
                  time: "a month ago",
                  title: "Tenant added",
                  urlTitle: "hello",
                  userNotificationId: 0,
                },
                {
                  selected: false,
                  state: 1,
                  status: "error",
                  time: "a month ago",
                  title: "Tenant deleted",
                  urlTitle: "hello",
                  userNotificationId: 1,
                },
                {
                  selected: false,
                  state: 1,
                  status: "warn",
                  time: "a month ago",
                  title: "Tenant added  warn",
                  urlTitle: "hello",
                  userNotificationId: 2,
                },
                {
                  selected: false,
                  state: 1,
                  status: "info",
                  time: "a month ago",
                  title: "Tenant deleted info",
                  urlTitle: "hello",
                  userNotificationId: 3,
                },
              ]}
              profileTitle="John Doe"
              profileEmail="john.doe@raaghu.io"
              profileName="John Doe"
              
              themeItems={[
                {
                  icon: "sun",
                  iconHeight: "20px",
                  iconWidth: "20px",
                  label: "Light",
                  val: "light",
                },
                {
                  icon: "moon",
                  iconHeight: "20px",
                  iconWidth: "20px",
                  label: "Dark",
                  val: "dark",
                },
              ]} toggleItems={[]} elementList={[]} componentsList={[]} languageLabel={""} themeLabel={""} onForgotPassword={function (isForgotPasswordClicked?: boolean | undefined): void {
                throw new Error("Function not implemented.");
              }} onProfileLinkTopNav={function (id: string, navigateTo?: string | undefined, label?: string | undefined): void {
                throw new Error("Function not implemented.");
              }} />
          </div>
          <div className="row">
            <div className="d-flex">
              <div>
                <BrowserRouter>
                  <RdsCompSideNavigation
                    sideNavItems={[
                      {
                        icon: "home",
                        key: "0",
                        label: "Dashboard",
                        path: "/dashboard",
                      },
                      {
                        icon: "demo_ui",
                        key: "1",
                        label: "UI Components",
                        path: "/demo-ui",
                      },
                      {
                        icon: "icons",
                        key: "2",
                        label: "Icons",
                        path: "/icons",
                      },
                      {
                        children: [
                          {
                            icon: "tenant",
                            key: "3-0",
                            label: "Tenants",
                            path: "/tenant",
                          },
                          {
                            icon: "editions",
                            key: "3-1",
                            label: "Editions",
                            path: "/edition",
                          },
                          {
                            children: [
                              {
                                icon: "organization",
                                key: "3-2-0",
                                label: "Organization Units",
                                path: "/organization-unit",
                              },
                              {
                                icon: "roles",
                                key: "3-2-1",
                                label: "Roles",
                                path: "/role",
                              },
                              {
                                icon: "users",
                                key: "3-2-2",
                                label: "Users",
                                path: "/user",
                              },
                              {
                                icon: "languages",
                                key: "3-2-3",
                                label: "Language",
                                path: "/language",
                              },
                              {
                                icon: "audit_logs",
                                key: "3-2-4",
                                label: "Audit Logs",
                                path: "/audit-logs",
                              },
                              {
                                icon: "webhook_subscription",
                                key: "3-2-5",
                                label: "Webhook Subscriptions",
                                path: "/webhook-subscription",
                              },
                              {
                                icon: "maintenance",
                                key: "3-2-6",
                                label: "Maintenance",
                                path: "/maintainance",
                              },
                              {
                                icon: "visual_settings",
                                key: "3-2-7",
                                label: "Visual Settings",
                                path: "/visual-setting",
                              },
                              {
                                icon: "setting",
                                key: "3-2-8",
                                label: "Settings",
                                path: "/settings",
                              },
                            ],
                            icon: "administration",
                            key: "3-2",
                            label: "Administration",
                          },
                        ],
                        icon: "pages",
                        key: "3",
                        label: "Pages",
                      },
                    ]}
                  />
                </BrowserRouter>
              </div>
              <div className="align-items-center bg-body-secondary d-flex justify-content-center w-100 m-3">
                <h2>Add Layout Here</h2>
              </div>
            </div>
          </div>
        </RdsCompAppShellItem>
      </>
    ),
  },
} satisfies Story;
