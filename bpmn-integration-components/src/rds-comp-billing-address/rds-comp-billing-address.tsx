import React, { useState } from "react";
import { RdsInput, RdsButton, RdsSelectList } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompBillingAddressProps {
    countryList: { option: string, value: any }[];
    IndianStateList: { option: string, value: any }[];
    BillingAddressDetails(arg: RdsCompBillingAddressDetails): any;
}

export interface RdsCompBillingAddressDetails {
    FirstName: string;
    LastName: string;
    Company: string;
    Phone: string;
    Address: string;
    City: string;
    Country: string;
    StateProvince: string;
    PostalCode: string;
}

const RdsCompBillingAddress = (props: RdsCompBillingAddressProps) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pin, setPin] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const onbackHandler = (e: any) => {
    };

    const onSubmitHandler = (e: any) => {
        //Preventing default on submit
        e.preventDefault();

        //Checking Validations before submit
        firstNameValidation(firstName);
        lastNameValidation(lastName);
        phoneValidationHandler(phone);
        addressValidation(address);
        cityValidation(city);
        countryValidation(country);
        stateProvinceValidation(state);
        postalCodeValidation(pin);

        //Submiting values if all validated
        if (
            firstNameErrorMessage === "" &&
            lastNameErrorMessage === "" &&
            phoneErrorMessage === "" &&
            addressErrorMessage === "" &&
            cityErrorMessage === "" &&
            countryErrorMessage === "" &&
            stateProvinceErrorMessage === "" &&
            postalCodeErrorMessage
        ) {
            const BillingAddressDetails: RdsCompBillingAddressDetails = {
                FirstName: firstName,
                LastName: lastName,
                Company: company,
                Phone: phone,
                Address: address,
                City: city,
                Country: country,
                StateProvince: state,
                PostalCode: pin,
            };
        }
    };

    //Regarding Validations messages
    const [firstNameErrorMessage, setFirstNameErrorMessage] =
        useState<string>("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState<string>("");
    {
        /* No validations required on Company*/
    }
    const [phoneErrorMessage, setPhoneErrorMessage] = useState<string>("");
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>("");
    const [cityErrorMessage, setCityErrorMessage] = useState<string>("");
    const [postalCodeErrorMessage, setPostalCodeErrorMessage] =
        useState<string>("");
    const [countryErrorMessage, setCountryErrorMessage] = useState<string>("");
    const [stateProvinceErrorMessage, setProvinceStateErrorMessage] =
        useState<string>("");

    //Validation functions
    const firstNameValidation = (firstName: string) => {
        firstName === ""
            ? setFirstNameErrorMessage("First Name is required")
            : setFirstNameErrorMessage("");
    };
    const lastNameValidation = (lastName: string) => {
        lastName === ""
            ? setLastNameErrorMessage("Last Name is required")
            : setLastNameErrorMessage("");
    };
    const phoneValidationHandler = (phone: any) => {
        if (phone.trim() === "") setPhoneErrorMessage("Phone is required");
        else if (phone.trim() != phone)
            setPhoneErrorMessage("Enter valid phone number");
        else if (isNaN(phone)) setPhoneErrorMessage("Enter valid phone number");
        else if (phone.includes("e"))
            setPhoneErrorMessage("Enter valid phone number");
        else setPhoneErrorMessage("");
    };
    const addressValidation = (address: string) => {
        address === ""
            ? setAddressErrorMessage("Address is required")
            : setAddressErrorMessage("");
    };
    const cityValidation = (city: string) => {
        city === ""
            ? setCityErrorMessage("City is required")
            : setCityErrorMessage("");
    };
    const countryValidation = (country: string) => {
        country === "Select Country"
            ? setCountryErrorMessage("Country is required")
            : setCountryErrorMessage("");
    };
    const stateProvinceValidation = (state: string) => {
        state === "Select Country"
            ? setProvinceStateErrorMessage("State/Province is required")
            : setProvinceStateErrorMessage("");
    };
    const postalCodeValidation = (postalCode: string) => {
        postalCode === ""
            ? setPostalCodeErrorMessage("Postal code is required")
            : setPostalCodeErrorMessage("");
        // Postal code need not be ,numeric-only' in some countries
    };
    const { t } = useTranslation();
    return (
        <>
            <div className="contact-information">
                <h3 className="pb-2">Billing Address</h3>
                <form id="billingAddressForm" onSubmit={onSubmitHandler}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="First Name"
                                size="medium"
                                inputType="text"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value); }}
                                required
                                onBlur={(e) => firstNameValidation(e.target.value)}
                                dataTestId="f-name"
                            />
                            {firstNameErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{firstNameErrorMessage}</span>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="Last Name"
                                size="medium"
                                inputType="text"
                                name="lastName"
                                placeholder="Enter Last Name"
                                required={true}
                                onBlur={(e) => lastNameValidation(e.target.value)}
                                dataTestId="last-name"
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value); }}
                            />
                            {lastNameErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{lastNameErrorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="Company"
                                size="medium"
                                name="company"
                                id="txtCompany"
                                placeholder="Enter Company"
                                dataTestId="company"
                                value={company}
                                onChange={(e) => { setCompany(e.target.value); }}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="Phone"
                                size="medium"
                                name="phone"
                                id="txtPhone"
                                placeholder="Enter phone"
                                required={true}
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value); }}
                                onBlur={(e) => phoneValidationHandler(e.target.value)}
                                dataTestId="phone"
                            />
                            {phoneErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{phoneErrorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsInput
                                label="Address"
                                size="medium"
                                name="address"
                                id="txtAddress"
                                required={true}
                                onBlur={(e) => addressValidation(e.target.value)}
                                dataTestId="address"
                                value={address}
                                onChange={(e) => { setAddress(e.target.value); }}
                            />
                            {addressErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{addressErrorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="City"
                                size="medium"
                                name="city"
                                id="txtCompany"
                                placeholder="Enter City"
                                required={true}
                                onBlur={(e) => cityValidation(e.target.value)}
                                dataTestId="city"
                                value={city}
                                onChange={(e) => { setCity(e.target.value); }}
                            />
                            {cityErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{cityErrorMessage}</span>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <RdsSelectList
                                id="seleCou"
                                label="Select Country"
                                placeholder="Select Country"
                                selectItems={props.countryList}
                                selectedValue="Select Country"
                                dataTestId="select-country"
                                onChange={(item: any) => { setCountry(item.value); }}
                            />
                            {countryErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{countryErrorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <RdsSelectList
                                id="seleSta"
                                label="Select State/Province"
                                placeholder="Select State/Province"
                                selectItems={props.IndianStateList}
                                selectedValue="Select State/Province"
                                dataTestId="select-state"
                                onChange={(item: any) => { setState(item.value); }}
                            />
                            {stateProvinceErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">
                                        {stateProvinceErrorMessage}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="Postal Code"
                                name="postalCode"
                                id="txtPostalCode"
                                placeholder="Enter Postal code"
                                required={true}
                                onBlur={(e) => postalCodeValidation(e.target.value)}
                                dataTestId="postal-code"
                                value={pin}
                                onChange={(e) => { setPin(e.target.value); }}
                            />
                            {postalCodeErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{postalCodeErrorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="pt-4 row">
                        <div className="col-md-6 mb-3">
                            <RdsButton
                                block={true}
                                size="medium"
                                isOutline={true}
                                colorVariant="primary"
                                label={t("Back") || ""}
                                tooltipTitle={""}
                                type={"button"}
                                onClick={onbackHandler}
                                dataTestId="back"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <RdsButton
                                block={true}
                                size="medium"
                                colorVariant="primary"
                                label={t("Continue") || ""}
                                tooltipTitle={""}
                                type={"submit"}
                                dataTestId="continue"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompBillingAddress;
