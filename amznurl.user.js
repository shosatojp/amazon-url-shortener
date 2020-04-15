// ==UserScript==
// @name         Amazon URL Shorter
// @description  replace the amazon url to shorter version
// @namespace    https://github.com/shosatojp/amazon-url-shorter
// @homepage     https://github.com/shosatojp/amazon-url-shorter
// @version      0.1
// @author       Sho Sato
// @match        *://www.amazon.co.jp/*
// @match        *://www.amazon.com/*
// @require      file:///home/sho/repos/amazon-url-shorter/amznurl.user.js
// @updateURL    https://github.com/shosatojp/amazon-url-shorter/raw/master/amznurl.user.js?
// @downloadURL  https://github.com/shosatojp/amazon-url-shorter/raw/master/amznurl.user.js?
// @run-at       document-start
// @noframes
// ==/UserScript==

(() => {
    const match = location.pathname.match(/\/.*\/dp\/(.*)(\/.*)?/i);
    if (match) {
        const newurl = `/dp/${match[1]}`;
        history.replaceState(null, null, newurl);
    }
})();
