import React from "react";

import { render, cleanup,fireEvent,waitForElement } from "@testing-library/react";
// import { fireEvent } from "@testing-library/react";

import Appointment from "../Appointment/index.js";

// import waitForElement from '@testing-library/react';

afterEach(cleanup);
it("renders without crashing", () => {
  render(<Appointment />);
});
