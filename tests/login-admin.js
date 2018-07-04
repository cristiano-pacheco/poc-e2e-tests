module.exports = browser => {
  browser
    .url('http://local.drogasil.com.br/admin')
    .maximizeWindow()
    .useCss()
    .waitForElementVisible('body')
    .setValue('#username', 'suporte')
    .setValue('#login', 'smart_pass')
    .click('input[type="submit"]')
    .pause(2000);
}
