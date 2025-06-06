import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsAppDetail, { RdsAppDetailProps } from "../src/rds-app-detail/rds-app-detail";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));


describe("RdsAppDetail", () => {
    const appDetailsItem: RdsAppDetailProps["appDetailsItem"] = {
        title: "Zapier",
            subtitle: "Build custom automation and intefrations with app",
            icon: "zapier",
            route: "/home",
            selected: true,
            iconHeight: "30px",
            iconWidth: "30px",
            iconFill: true,
            iconColor: "warning",
            iconStroke: true,
            routeLabel: "View integration"
    };

    it("renders the component with the given props", () => {
        render(
            <RdsAppDetail appDetailsItem={appDetailsItem} />
        );
    });

    it("renders the component with the icon", () => {
        render(
            <RdsAppDetail appDetailsItem={appDetailsItem} />
        );
        const iconElement = screen.getByRole("img");
        expect(iconElement).toBeInTheDocument();
    });
});
