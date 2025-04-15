require('@testing-library/jest-dom');

// Mock antd Modal component since it uses ResizeObserver which isn't available in jsdom
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// Mock the fetch API
global.fetch = jest.fn();

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});