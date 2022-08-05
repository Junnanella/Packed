import { render, screen } from "@testing-library/react";
import App from "./App";
import { MockAuthProvider } from "./context/AuthContext";

test("renders a logo that mentions 'packed'", () => {
  // expect(button).toBeInTheDocument();
  render(<App authProvider={MockAuthProvider} />);

  const logo = screen.getByTestId("logo");
  // expect(logoText).toBeInTheDocument();

  expect(logo.textContent).toEqual(expect.stringMatching(/packed/i));
});

test("renders a button CTA", () => {
  render(<App authProvider={MockAuthProvider} />);

  const cta = screen.getByTestId("cta");
  // expect(logoText).toBeInTheDocument();

  expect(cta).toBeInTheDocument();
});
