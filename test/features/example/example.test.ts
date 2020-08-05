import Example from "../../../src/features/example/example";

test('gets three', () => {
    expect(Example.getThree()).toBe(3);
});

test('I will fail', () => {
    expect(2).toBe(3);
});
