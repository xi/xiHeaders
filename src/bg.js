/* global browser */

var glob = function(s, pattern) {
    var regex = pattern.replace(/\./g, '\\.').replace(/\*/g, '.*');
    regex = new RegExp(`^${regex}$`);
    return regex.test(s);
};

var clearHeader = function(headers, name) {
    for (let i = 0; i < headers.length; i++) {
        if (headers[i].name.toLowerCase() === name.toLowerCase()) {
            headers.splice(i, 1);
            i--;
        }
    }
};

browser.webRequest.onBeforeSendHeaders.addListener(async details => {
    var data = await browser.storage.local.get('rules');

    for (const rule of data.rules) {
        if (glob(details.url, rule.pattern)) {
            if (rule.action !== 'add') {
                clearHeader(details.requestHeaders, rule.header);
            }
            if (rule.action !== 'remove') {
                details.requestHeaders.push({
                    name: rule.header,
                    value: rule.value,
                });
            }
        }
    }

    return {requestHeaders: details.requestHeaders};
}, {
    urls: ['<all_urls>'],
    types: ['main_frame'],
}, ['blocking', 'requestHeaders']);

browser.browserAction.onClicked.addListener(() => {
    browser.runtime.openOptionsPage();
});
