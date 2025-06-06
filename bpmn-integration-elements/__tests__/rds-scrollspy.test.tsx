import React from "react";
import { render, fireEvent, getByText, getByTestId } from "@testing-library/react";
import { RdsScrollspy } from "../src";
import "@testing-library/jest-dom";
jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

describe("RdsScrollspy", () => {
    const testData =
    {
        id:'1',
        title:'test',
        header:'First',
        content:'cont'
    }
    test("renders six navigation links", () => {
        render( <RdsScrollspy data={[testData]} />)
    });

});
