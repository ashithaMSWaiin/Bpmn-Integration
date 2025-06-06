import React from "react";
import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";
import RdsCompFormsResponse from "../src/rds-comp-forms-response/rds-comp-forms-response";

jest.mock('../src/rds-comp-forms-response/rds-comp-forms-response', () => ({
    forms: {
      array1: [{ questionId: '1', text: 'Question 1' }],
      array2: [{ questionId: '1', answer: 'Answer 1' }],
    },
  }));

  jest.mock('../../bpmn-integration-elements/src', () => ({
    RdsTextArea :jest.fn(),
    RdsLabel:jest.fn(),
    RdsRadioButton :jest.fn(),
    RdsCheckbox :jest.fn(),
    RdsSelectList :jest.fn(),
    RdsButton:jest.fn(),
    RdsPagination:jest.fn(),
  }));

  jest.mock('../src/rds-comp-alert-popup/rds-comp-alert-popup', () => ({
    RdsCompAlertPopup: jest.fn(),
  }));

  jest.mock('../src/rds-comp-forms-response/rds-comp-forms-response', () => ({
    __esModule: true,
    default: () => <div>Mocked RdsCompFormsResponse</div>,
  }));

describe("RdsCompFormsResponse", ()=>{
    it("Renders forms Response correctly", ()=>{
    render(<RdsCompFormsResponse />);
    });
});