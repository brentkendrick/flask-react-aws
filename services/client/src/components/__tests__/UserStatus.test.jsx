import React from "react";
import { cleanup, waitFor } from "@testing-library/react";
import axios from "axios";

import UserStatus from "../UserStatus";

afterEach(cleanup);

jest.mock("axios");

const props = {
  isAuthenticated: () => {
    return true;
  },
};

it("renders properly when authenticated", async () => {
  axios.mockImplementation(() =>
    Promise.resolve({
      data: { email: "test@test.com", id: 1, username: "test" },
    })
  );

  const { container, findByTestId } = renderWithRouter(
    <UserStatus {...props} />
  );
  await waitFor(() => {
    expect(axios).toHaveBeenCalledTimes(1);
  });
  expect((await findByTestId("user-email")).innerHTML).toBe("test@test.com");
  expect((await findByTestId("user-username")).innerHTML).toBe("test");
});

it("renders", async () => {
  axios.mockImplementation(() =>
    Promise.resolve({
      data: { email: "test@test.com", id: 1, username: "test" },
    })
  );

  const { asFragment } = renderWithRouter(<UserStatus {...props} />);
  await waitFor(() => {
    expect(axios).toHaveBeenCalled();
  });
  expect(asFragment()).toMatchSnapshot();
});
