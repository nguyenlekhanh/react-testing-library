import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders 3 list items", () => {
  render(<App />);
  //some of element has a default role li (role=listitem)
  const listItems = screen.getAllByRole("listitem");
  //expect(listItems).toHaveLength(3);
  //expect(listItems.length).toBe(3);
  expect(listItems.length).toEqual(3);
});

test("renders title", () => {
  render(<App />);
  const title = screen.getByTestId("mytestid");
  expect(title).toBeInTheDocument();
});

test("sum should be 6", () => {
  render(<App />);
  const sum = screen.getAllByTitle("sum");
  expect(sum.textContent).toBeInTheDocument("6");
});
