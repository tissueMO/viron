import React from 'react';
import { Provider as StateProvider } from './src/state';
import './src/styles/global.css';

// Specify a react component which wraps gatsby root component. No unmounting happens.
// IMPORTANT: Editing gatsby-ssr file is required.
// @see: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapRootElement
export const wrapRootElement = ({ element }) => {
  return (
      <StateProvider>
      <div id="rootwrapper">
      {element}
    </div>
    </StateProvider>
  );
};
