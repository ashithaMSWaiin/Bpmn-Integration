import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompShoppingCart, { RdsCompShoppingCartProp } from "../src/rds-comp-shopping-cart/rds-comp-shopping-cart";

describe("RdsCompShoppingCart", () => {
    const mockProps: RdsCompShoppingCartProp = {
        cart: {},
        role: "user",
        itemList: [
            {
                image: "image-url",
                description: "Item description",
                quantity: 1,
                price: 10,
            },
            // Add more items if needed
        ],
    };

    it("renders shopping cart items", () => {
        render(<RdsCompShoppingCart {...mockProps} />);
    
        const itemElements = screen.getAllByTestId("shopping-cart-item");
        expect(itemElements).toHaveLength(mockProps.itemList.length);
    });
});
