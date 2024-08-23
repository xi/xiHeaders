/* global browser */

var form = document.querySelector('form');
var textarea = document.querySelector('textarea');

browser.storage.local.get('rules').then(data => {
    var rules = data.rules || {};
    textarea.value = JSON.stringify(rules, null, 2);
});

textarea.addEventListener('change', () => {
    try {
        JSON.parse(textarea.value);
        textarea.setCustomValidity('');
    } catch (e) {
        textarea.setCustomValidity(e);
        textarea.reportValidity();
    }
});

form.addEventListener('submit', async event => {
    event.preventDefault();
    var rules = JSON.parse(textarea.value);
    await browser.storage.local.set({'rules': rules});
    location.reload();
});
