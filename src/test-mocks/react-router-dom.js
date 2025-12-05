const React = require('react');

function NavLink({ children, to = '#', className, ...props }) {
  return React.createElement('a', { href: to, className, ...props }, children);
}

function Link({ children, to = '#', className, ...props }) {
  return React.createElement('a', { href: to, className, ...props }, children);
}

function BrowserRouter({ children }) {
  return React.createElement('div', null, children);
}

module.exports = {
  __esModule: true,
  NavLink,
  Link,
  BrowserRouter,
  MemoryRouter: BrowserRouter,
  default: {
    NavLink,
    Link,
    BrowserRouter,
  },
};
