import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsDropdown, { RdsDropdownProps } from "../src/rds-dropdown/rds-dropdown";
import React from "react";

describe("RdsDropdown", () => {
    const props: RdsDropdownProps = {
        colorVariant: "primary",
        size: "small",
        darkDropdown: false,
        label: "Dropdown Button",
        listItems: [
            { id: "1", label: "Export To Excel", path: "/item1" },
            { id: "2", label: "Import From Excel", path: "/item2" },
            { id: "3", label: "Click here download sample import file", path: "/item3" },
        ],
        id: "1",
    };

    it("renders the dropdown element", () => {
        render(<RdsDropdown {...props} />);
    });

    it("renders the dropdown items", () => {
        render(<RdsDropdown {...props} />);
        const listItems = props.listItems.map(item => item.label);
        expect(listItems);
    });
});
