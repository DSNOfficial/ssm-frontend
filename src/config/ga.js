// utils/ga.js
import ReactGA from 'react-ga4';

const measurementId = 'G-XXXXXXXXXX'; // replace with your real ID

export const initGA = () => {
  ReactGA.initialize(measurementId);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};
