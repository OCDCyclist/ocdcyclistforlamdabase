const { pick } = require("../src/utils/pick");

describe("pick basic tests", () => {
  test("pick exists and can be called", () => {
    expect(typeof pick).toBe("function");
  });
  test("pick returns an empty object if called with no arguements", () => {
    const actual = pick();
    expect(typeof actual).toBe("object");
    expect(Object.keys(actual).length).toBe(0);
  });

  test("pick returns an empty object if called with a non object as the first arguement", () => {
    const actual = pick(123);
    expect(typeof actual).toBe("object");
    expect(Object.keys(actual).length).toBe(0);
  });

  test("pick returns an empty object if called with a non array second arguement for arrayOfNamesToKeep", () => {
    const actual = pick({}, 123);
    expect(typeof actual).toBe("object");
    expect(Object.keys(actual).length).toBe(0);
  });
});

describe("pick functional tests for a well formed arguments", () => {
  test("pick only returns the single name to keep", () => {
    const actual = pick({ name: "keep me", distance: "exclude me" }, ['name']);
    expect(typeof actual).toBe("object");
    expect( "name" in actual).toBe(true);
    expect( "distance" in actual).toBe(false);
  });

  test("pick returns two properties to keep", () => {
    const actual = pick({ name: "keep me", distance: "exclude me", notme: 42 }, ['name', 'distance']);
    expect(typeof actual).toBe("object");
    expect( "name" in actual).toBe(true);
    expect( "distance" in actual).toBe(true);
    expect( "notme" in actual).toBe(false);
  });
});

describe("pick functional tests for negative cases", () => {
    test('pick returns an empty object if the second argument arrayOfNamesToKeep has no matches.', () => {
        const actual = pick({ name: "Jonathan", distance: 432.42, speed: 42 }, ['a', 'b']);
        expect(typeof actual).toBe("object");
        expect(Object.keys(actual).length).toBe(0);
    });
});
