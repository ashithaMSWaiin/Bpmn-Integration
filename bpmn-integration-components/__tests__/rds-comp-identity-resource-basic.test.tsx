import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompIdentiyResourceBasic from "../src/rds-comp-identiy-resource-basic/rds-comp-identiy-resource-basic";

jest.mock("../__mocks__/bootstrap.ts", () => ({
    Offcanvas: jest.fn(),
}));

describe("RdsCompIdentiyResourceBasic", () => {
    const typeList = [
        {
            id: "1",
            name: "string",
            displayName: "String",
            description: "String",
        },
        {
            id: "2",
            name: "int",
            displayName: "Integer",
            description: "Integer",
        },
    ];
    const infoItem = {
        name: "John",
        displayName: "John Doe",
        description: "Test description",
        enabled: true,
        required: true,
        emphasize: true,
        showInDiscoveryDocument: true,
    };
    it("renders the component", () => {
        render(<RdsCompIdentiyResourceBasic inputTypeList={typeList} informationItemInitial={infoItem} />);
    });

    it("renders input fields", () => {
        render(<RdsCompIdentiyResourceBasic inputTypeList={typeList} informationItemInitial={infoItem} />);
        expect(screen.getAllByPlaceholderText("Enter Property Name"));
        expect(screen.getAllByPlaceholderText("Display Name"));
    });
});
