const module1 = {
  options: [],
  header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
  dataos: [
    { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
    { name: 'Windows', value: 'Win', version: 'NT' },
    { name: 'iPhone', value: 'iPhone', version: 'OS' },
    { name: 'iPad', value: 'iPad', version: 'OS' },
    { name: 'Kindle', value: 'Silk', version: 'Silk' },
    { name: 'Android', value: 'Android', version: 'Android' },
    { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
    { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
    { name: 'Macintosh', value: 'Mac', version: 'OS X' },
    { name: 'Linux', value: 'Linux', version: 'rv' },
    { name: 'Palm', value: 'Palm', version: 'PalmOS' },
  ],
  databrowser: [
    { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
    { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
    { name: 'Safari', value: 'Safari', version: 'Version' },
    { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
    { name: 'Opera', value: 'Opera', version: 'Opera' },
    { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
    { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' },
  ],
  init: function() {
    const agent = this.header.join(' '),
      os = this.matchItem(agent, this.dataos),
      browser = this.matchItem(agent, this.databrowser);

    return { os: os, browser: browser };
  },
  matchItem: function(string, data) {
    let i = 0,
      j = 0,
      html = '',
      regex,
      regexv,
      match,
      matches,
      version;

    for (i = 0; i < data.length; i += 1) {
      regex = new RegExp(data[i].value, 'i');
      match = regex.test(string);
      if (match) {
        regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
        matches = string.match(regexv);
        version = '';
        if (matches) {
          if (matches[1]) {
            matches = matches[1];
          }
        }
        if (matches) {
          matches = matches.split(/[._]+/);
          for (j = 0; j < matches.length; j += 1) {
            if (j === 0) {
              version += matches[j] + '.';
            } else {
              version += matches[j];
            }
          }
        } else {
          version = '0';
        }
        return {
          name: data[i].name,
          version: parseFloat(version),
        };
      }
    }
    return { name: 'unknown', version: 0 };
  },
};

export const getClientInfo = () => {
  return module1.init();
};

export class Browser {
  static isSafari() {
    return getClientInfo().browser.name === 'Safari';
  }

  static getBrowser() {
    // Opera 8.0+
    let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    let isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    let isSafari =
      /constructor/i.test(window.HTMLElement) ||
      (function(p) {
        return p.toString() === '[object SafariRemoteNotification]';
      })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    // Internet Explorer 6-11
    let isIE = /*@cc_on!@*/ false || !!document.documentMode;

    // Edge 20+
    let isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 79
    let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // Edge (based on chromium) detection
    let isEdgeChromium = isChrome && navigator.userAgent.indexOf('Edg') != -1;

    // Blink engine detection
    let isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isOpera) {
      return 'Opera';
    }

    if (isFirefox) {
      return 'Firefox';
    }

    if (isSafari) {
      return 'Safari';
    }

    if (isIE) {
      return 'IE';
    }

    if (isEdge) {
      return 'Edge';
    }

    if (isChrome) {
      return 'Chrome';
    }

    if (isBlink) {
      return 'Blink';
    }

    return 'Unknown';
  }

  static getLanguage () {
    return  window.navigator.userLanguage || window.navigator.language;
  }
}
