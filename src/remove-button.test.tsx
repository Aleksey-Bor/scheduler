import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RemoveButton } from "./RemoveButton";

describe("RemoveButton", () => {
  it("renders correctly and calls the remover function on button click", () => {
    const remover = jest.fn();
    const { getByLabelText } = render(
      <RemoveButton remover={remover} elemId="test-id" />
    );

    const button = getByLabelText("delete");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(remover).toHaveBeenCalledWith("test-id");
  });
});
