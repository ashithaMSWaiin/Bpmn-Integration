import React from 'react';
import ReactDOM, { render } from 'react-dom';
import RdsMap from '../src/rds-map/rds-map';

it('It should mount', () => {
  const div = document.createElement('div');
  const mapList = [{ country: "IN", value: 1 }]; // Pass an array of objects with country and value properties
  const color = (value: number, maxValue: number, minValue: number) => {
    return value > 0.5 * (maxValue - minValue) ? "red" : "green";
  };
  render(<RdsMap mapList={mapList} color={color} />, div); // Pass a function to color
  ReactDOM.unmountComponentAtNode(div);
});