const multiply = require("../src/math");

describe("multiply function", () => {
  test("multiplies two positive numbers", () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test("handles zero", () => {
    expect(multiply(5, 0)).toBe(0);
  });

  test("handles negative numbers", () => {
    expect(multiply(-2, 3)).toBe(-6);
  });
});