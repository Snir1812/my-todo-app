// Minimal mock for static asset imports in tests.
// Vitest/JSDOM will receive this module instead of a file URL.

// default export is the (mock) URL string
const mockUrl = "/__mocks__/file-mock";
export default mockUrl;

// named export for compatibility with some SVG loader setups
export const ReactComponent = () => null;
