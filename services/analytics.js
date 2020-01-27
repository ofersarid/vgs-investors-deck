import ReactGA from 'react-ga';
import camelCase from 'lodash/camelCase';

const isDev = () => {
  return Boolean(window.location.host.match(/^localhost/));
};

const init = () => {
  console.log('GA init');
  ReactGA.initialize('UA-156693068-1');
};

// const logPageView = () => {
//   console.log(`Logging pageview for ${window.location.pathname}`);
//   ReactGA.set({ page: window.location.pathname });
//   ReactGA.pageview(window.location.pathname);
// };
//
// const logEvent = (category = '', action = '', ) => {
//   if (category && action) {
//     ReactGA.event({
//       category,
//       action
//     });
//   }
// };

const setViewer = (viewer) => {
  if (viewer) {
    console.log(`Setting viewer: ${viewer}`);
    ReactGA.set({ userId: camelCase(viewer) });
  }
};

const viewedPage = (viewer) => {
  if (viewer) {
    console.log(`Logging viewer: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'impression',
      label: 'viewed page',
    });
  }
};

const pauseEpisode = (viewer) => {
  if (viewer) {
    console.log(`Logging pause episode by: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'click',
      label: 'pause episode',
    });
  }
};

const playEpisode = (viewer) => {
  if (viewer) {
    console.log(`Logging play episode by: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'click',
      label: 'play episode',
    });
  }
};

const contactUs = (viewer) => {
  if (viewer) {
    console.log(`Logging contact us by: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'click',
      label: 'contact us',
    });
  }
};

const send = (viewer) => {
  if (viewer) {
    console.log(`Logging send by: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'click',
      label: 'send',
    });
  }
};

// const logException = (description = '', fatal = false) => {
//   if (description) {
//     ReactGA.exception({
//       description,
//       fatal
//     });
//   }
// };

export default {
  init,
  setViewer,
  viewedPage,
  pauseEpisode,
  playEpisode,
  contactUs,
  send,
};
