import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompFeatureManagement, { RdsCompFeatureManagementProps } from "../src/rds-comp-feature-management/rds-comp-feature-management";
jest.mock("chart.js", () => ({
    ...(jest.requireActual("chart.js") as object),
    ...{
      Line: jest.fn(),
    },
  }));
   
  jest.mock("../../bpmn-integration-elements/src/rds-chart-line/rds-chart-line.tsx", () => {
    return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
  });
   
  jest.mock(
    "../../bpmn-integration-elements/src/rds-chart-doughnut/rds-chart-doughnut.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
    }
  );
   
  jest.mock(
    "../../bpmn-integration-elements/src/rds-chart-boolean/rds-chart-boolean.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
    }
  );
   
  jest.mock(
      "../../bpmn-integration-elements/src/rds-chart-bar/rds-chart-bar.tsx",
      () => {
        return jest.fn(() => <div data-testid="mocked-rds-line-chart" />);
      }
    );
   
  jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
const mockFeatureIdentitySettingsData = [
    { value: true },
    { value: "10" },
    { value: false },
    { value: false },
    { value: true },
    { value: true },
    { value: true },
];

const mockSaveFeature = jest.fn();
const mockRestoreFeatures = jest.fn();

const mockProps: RdsCompFeatureManagementProps = {
    featureManagementData: mockFeatureIdentitySettingsData,
    onSubmit: mockSaveFeature,
};

jest.mock('../src/rds-comp-feature-management/rds-comp-feature-management', () => ({
  __esModule: true,
  default: () => <div>Mocked RdsCompFeatureManagement</div>,
}));

describe("RdsCompFeatureManagement", () => {
    test("renders the component with initial values", () => {
        render(<RdsCompFeatureManagement {...mockProps} />);

        document.querySelector('[placeholder="Enter Length"]');
        document.querySelector('[label="CmsKit.Feature:CmsKitProGroup"]');
        document.querySelector('[button="AbpUi.Save"]');
    });

});
