import React from "react";
import { render } from "@testing-library/react";

import { App } from "./App";

describe("<App>", () => {
  it("Renders successfully", () => {
    const { getByText } = render(<App />);

    expect(getByText(/hello world/i)).toHaveTextContent(/hello world/i);
  });
});
