import { render, screen } from "@testing-library/react";
import App from "./App";
import { MockAuthProvider } from "./context/AuthContext";

// checks to make sure link to homepage on the navbar, with id "logo"
// and innerHTML of "packed" exists
test("renders a logo that mentions 'packed'", () => {
  render(<App authProvider={MockAuthProvider} />);

  const logo = screen.getByTestId("logo");

  expect(logo.textContent).toEqual(expect.stringMatching(/packed/i));
});

// checks to make sure there CTA button with id "cta" exists in application
// to avoid deletion of the submit button on TripForm / MainPage
test("renders a button CTA", () => {
  render(<App authProvider={MockAuthProvider} />);

  const cta = screen.getByTestId("cta");
  // expect(logoText).toBeInTheDocument();

  expect(cta).toBeInTheDocument();
});
