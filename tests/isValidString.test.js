const { isValidString } = require("../src/utils/isValidString");

describe("isValidString basic tests", () => {
  test("isValidString exists and can be called", () => {
    expect(typeof isValidString).toBe("function");
  });
  test("isValidString returns false when called with no parameters", () => {
    expect( isValidString()).toBe(false);
  });

  test("isValidString returns false when called with a none string argument", () => {
    expect(isValidString(123)).toBe(false);
    expect(isValidString([])).toBe(false);
    expect(isValidString({})).toBe(false);
    expect(isValidString(new Date())).toBe(false);
    expect(isValidString(new Set())).toBe(false);
  });
});

describe("isValidString functional tests for a well formed arguments", () => {
  test("isValidString returns false for a valid string argument", () => {
    expect(isValidString('a')).toBe(true);
    expect(isValidString('ab')).toBe(true);
    expect(isValidString('a ')).toBe(true);
    expect(isValidString('ab ')).toBe(true);
    expect(isValidString(' a ')).toBe(true);
    expect(isValidString(' ab ')).toBe(true);
  });

  test("isValidString returns false for an empty string", () => {
    expect(isValidString('')).toBe(false);
  });
  test("isValidString returns false for an string filled only with blanks", () => {
    expect(isValidString(' ')).toBe(false);
    expect(isValidString('     ')).toBe(false);
  });
});
