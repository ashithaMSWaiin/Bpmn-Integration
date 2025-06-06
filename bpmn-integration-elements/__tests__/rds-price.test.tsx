import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsPrice, { RdsPriceProps } from "../src/rds-price/rds-price";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsPrice", () => {
    const props = {
        mrp: 15,
        currentPrice: 12,
    };

    it("renders properly", () => {
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={false}
            />
        );
    });

    it("renders properly when discount id false", () => {
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={false}
            />
        );
        const discountElement = screen.queryByText(/[\d]+% off/);
        expect(discountElement).not.toBeInTheDocument();
    });
    it('renders price on left when type is not priceOnRight', () => {
        render(<RdsPrice type="priceOnLeft" currentPrice={100} mrp={200} withDiscount={false} />);
    
        expect(screen.getByTestId('price-on-left')).toBeInTheDocument();
        expect(screen.getByText('$100')).toBeInTheDocument();
        expect(screen.getByText('$200')).toBeInTheDocument();
      });
    
      it('renders price on right when type is priceOnRight', () => {
        render(<RdsPrice type="priceOnRight" currentPrice={100} mrp={200} withDiscount={false} />);
    
        expect(screen.getByTestId('price-on-right')).toBeInTheDocument();
        expect(screen.getByText('$100')).toBeInTheDocument();
        expect(screen.getByText('$200')).toBeInTheDocument();
      });

    it("renders when discount is true", () => {
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
            />
        );
        const discount = Math.round(
            ((props.mrp - props.currentPrice) * 100) / props.mrp
        );
        const discountElement = screen.getByText(`${discount}% off`);
        expect(discountElement).toBeInTheDocument();
    });

    it("renders with priceOnLeft props", () => {
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
                type="priceOnLeft"
            />
        );
        const priceOnLeftElement = screen.getByTestId("price-on-left");
        expect(priceOnLeftElement).toBeInTheDocument();
    });

    it("renders with priceOnRight props", () => {
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
                type="priceOnRight"
            />
        );
        const priceOnLeftElement = screen.getByTestId("price-on-right");
        expect(priceOnLeftElement).toBeInTheDocument();
    });

    it("renders icons properly", ()=>{
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
            />
        );
        const iconsElements = screen.getAllByRole("img");
        iconsElements.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
    });
});
