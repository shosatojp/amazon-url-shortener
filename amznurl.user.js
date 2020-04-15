// ==UserScript==
// @name         Amazon URL shortener
// @description  replace the amazon url to shorter version
// @namespace    https://github.com/shosatojp/amazon-url-shortener
// @homepage     https://github.com/shosatojp/amazon-url-shortener
// @version      0.1
// @author       Sho Sato
// @match        *://www.amazon.co.jp/*
// @match        *://www.amazon.com/*
// @require      file:///home/sho/repos/amazon-url-shortener/amznurl.user.js
// @updateURL    https://github.com/shosatojp/amazon-url-shortener/raw/master/amznurl.user.js?
// @downloadURL  https://github.com/shosatojp/amazon-url-shortener/raw/master/amznurl.user.js?
// @run-at       document-start
// @noframes
// ==/UserScript==

(async () => {
    /**
     * parse pathname and returns [prefix, id]
     */
    async function parse(pathname) {
        const matchgp = pathname.match(/\/(?:.*\/)?(dp|gp\/product|gp\/video\/detail)\/([^/]*)(?:\/.*)?/i);
        if (!matchgp) throw Error();
        return [matchgp[1], matchgp[2]];
    }

    /**
     * get parsed array and return new url pathname
     */
    async function getUrl(parsed) {
        return newurl = '/' + parsed.join('/');
    }

    /**
     * do a test
     */
    async function test(pathname, result) {
        return await parse(pathname).then(parsed => getUrl(parsed)).then(url => {
            if (url !== result) throw Error();
        });
    }


    /**
     * main
     */
    if (typeof location !== 'undefined') {

        // replace url
        parse(location.pathname)
            .then(getUrl)
            .then(pathname => history.replaceState(null, null, pathname))
            .catch(() => 0);

    } else {

        // test
        Promise.all([
            test('/dp/4522429878', '/dp/4522429878'),
            test('/dp/4522429878/hoge', '/dp/4522429878'),
            test('/hoge/dp/4522429878', '/dp/4522429878'),
            test('/gp/video/detail/B01J4DE8YM', '/gp/video/detail/B01J4DE8YM'),
            test('/gp/video/detail/B01J4DE8YM/ref=atv_hm_', '/gp/video/detail/B01J4DE8YM'),
        ])
            .then(() => console.log('OK'))
            .catch(() => console.log('test failed'));

    }
})();
