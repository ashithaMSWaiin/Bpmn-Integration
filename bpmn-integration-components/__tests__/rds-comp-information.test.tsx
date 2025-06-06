import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompInformation, { RdsCompInformationProps } from "../src/rds-comp-information/rds-comp-information";

describe("RdsCompInformation", () => {
    const inputTypeList = ["Option 1", "Option 2"];
    const informationItemInitial = {
        propertyName: "Initial Property",
        displayName: "Initial Display",
        inputValue: "Initial Input",
    };

    const mockOnPropertyChange = jest.fn();
    const mockOnDisplayChange = jest.fn();

    const defaultProps: RdsCompInformationProps = {
        inputTypeList,
        informationItemInitial,
        reset: false,
    };

    it("renders the component with initial values", () => {
        render(<RdsCompInformation {...defaultProps} />);

        expect(screen.getByText("Property Name")).toBeInTheDocument();
        expect(screen.getByText("Display Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Property Name"));
        expect(screen.getByPlaceholderText("Enter Display Name"));
    });
});
