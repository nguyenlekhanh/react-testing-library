import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import axios from "axios";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John", email: "John@test.com" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button input should be rendered", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button input should be disabled", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeDisabled();
});

test("loading should be renderd", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).not.toHaveTextContent(/please wait/i);
});

test("error message should not be visible", () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  expect(usernameInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("button input should not be disabled", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });

  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).not.toBeDisabled();
});

test("loading should be renderd", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });

  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  const buttonInputEl = screen.getByRole("button");
  fireEvent.click(buttonInputEl);
  expect(buttonInputEl).toHaveTextContent(/please wait/i);
});

test("loading should not be renderd after fetching", async () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });

  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  const buttonInputEl = screen.getByRole("button");
  fireEvent.click(buttonInputEl);
  await waitFor(() =>
    expect(buttonInputEl).not.toHaveTextContent(/please wait/i)
  );
});

test("user should be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  //screen.getByText("John"); not a async function so need to use findByText
  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});
