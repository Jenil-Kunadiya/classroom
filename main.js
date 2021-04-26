const installLink = 'https://classroom.google.com/u/0/h';

// https://stackoverflow.com/a/13348618
const isChrome = () => {
  const isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf('OPR') > -1,
    isIEedge = winNav.userAgent.indexOf('Edge') > -1;

    return isChromium !== null && isChromium !== undefined && vendorName === 'Google Inc.' && isOpera == false && isIEedge == false;
};

const closeInstall = () => {
  document.body.classList.remove('Body--installing');
};

const installExtension = () => {
  if(isChrome() && chrome && chrome.webstore && chrome.webstore.install) {
    document.body.classList.add('Body--installing');
    chrome.webstore.install(installLink, () => {
      ga('send', 'event', 'Extension', 'install', 'Installed successfully');
      closeInstall();
    }, () => {
      ga('send', 'event', 'Extension', 'installCancel', 'Install popup cancelled');
      closeInstall();
    });
  } else {
    window.open(installLink);
  }
};

const installExtensionSignup = () => {
  document.querySelector('.Create-install').classList.remove('Create-install--error');
  if(isChrome() && chrome && chrome.webstore && chrome.webstore.install) {
    chrome.webstore.install(installLink, () => {
      ga('send', 'event', 'Extension', 'install', 'Installed successfully');
    }, () => {
      ga('send', 'event', 'Extension', 'installCancel', 'Install popup cancelled');
      document.querySelector('.Create-install').classList.add('Create-install--error');
    });
  } else {
    window.open(installLink);
  }
};

window.installExtension = installExtension;
window.installExtensionSignup = installExtensionSignup;
window.closeInstall = closeInstall;
