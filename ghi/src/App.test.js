import { render, screen } from "@testing-library/react";
import App from "./App";
import { MockAuthProvider } from "./context/AuthContext";

test("renders 'packed'", () => {
  render(<App authProvider={MockAuthProvider} />);

  const logoText = screen.getByText(/packed/i);
  expect(logoText).toBeInTheDocument();
});

test("renders 'get to packing' CTA", () => {
  render(<App authProvider={MockAuthProvider} />);

  const cta = screen.getByText(/get to packing/i);
  expect(cta).toBeInTheDocument();
});
