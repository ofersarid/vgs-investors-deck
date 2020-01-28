import ReactGA from 'react-ga';
import camelCase from 'lodash/camelCase';

const isDev = () => {
  return Boolean(window.location.host.match(/^localhost/));
};

const init = () => {
  console.log('GA init');
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  ReactGA.initialize('UA-156693068-1', {
    debug: true,
    titleCase: false,
    gaOptions: {
      userId: id
    }
  });
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
    console.log(`Setting ${isDev() ? 'test' : 'investor'} viewer: ${viewer}`);
    ReactGA.set({ userId: camelCase(viewer) });
  }
};

const viewedPage = (viewer) => {
  if (viewer) {
    console.log(`Logging viewer: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'viewed page',
    });
  }
};

const pauseEpisode = (viewer, episode) => {
  if (viewer) {
    console.log(`Logging pause episode ${episode} by ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'pause episode',
      label: episode,
    });
  }
};

const playEpisode = (viewer, episode) => {
  if (viewer) {
    console.log(`Logging play episode by: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'play episode',
      label: episode,
    });
  }
};

const contactUs = (viewer) => {
  if (viewer) {
    console.log(`Logging contact us by: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'clicked contact us',
    });
  }
};

const send = (viewer) => {
  if (viewer) {
    console.log(`Logging send by: ${viewer}`);
    ReactGA.event({
      category: isDev() ? 'test' : 'investor',
      action: 'clicked on send',
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
