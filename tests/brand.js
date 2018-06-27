const loginAdmin = require('./login-admin');
const db = require('../util/db');

module.exports = {
  beforeEach: async (browser, done) => {
    await db('poctest_vehiclemanager_brand').del();
    done();
  },

  afterEach: (browser, done) => {
    done();
  },

  after: (browser, done) => {
    done();
    process.exit(0);
  },

  'Can opening a list of brands' : browser => {

    loginAdmin(browser);

    browser
      .click('#nav > li:nth-child(12) > a > span')
      .pause(1000)
      .click('#nav > li:nth-child(12) > ul > li > a > span')
      .pause(2000)
      .assert.containsText('div.content-header h3', 'Brands')
      .end();
  },

  'Create a brand' : browser => {

    const brandName = 'new brand';

    loginAdmin(browser);

    browser
      .click('#nav > li:nth-child(12) > a > span')
      .pause(1000)
      .click('#nav > li:nth-child(12) > ul > li > a > span')
      .pause(2000)
      .click('button.scalable.add')
      .pause(1000)
      .setValue('input[name="name"]', 'new brand')
      .click('button.scalable.save')
      .pause(2000);

    browser
      .useXpath()
      .expect.element(`//*[contains(text(),'${brandName}')]`).to.be.present;


    browser
      .useXpath()
      .expect.element(`//*[contains(text(),'Brand saved')]`).to.be.present;

      browser.end();
  },

  'Update a brand' : async browser => {
    const brandName = 'new brand';
    const updatedBrandName = 'updated brand';

    await db('poctest_vehiclemanager_brand').insert({ name: brandName });

    loginAdmin(browser);

    browser
      .click('#nav > li:nth-child(12) > a > span')
      .pause(1000)
      .click('#nav > li:nth-child(12) > ul > li > a > span')
      .pause(2000)
      .useXpath()
      .click(`//*[contains(text(),'${brandName}')]`)
      .useCss()
      .pause(2000)
      .clearValue('input[name="name"]')
      .setValue('input[name="name"]', updatedBrandName)
      .click('button.scalable.save')
      .pause(2000);

    browser
      .useXpath()
      .expect.element(`//*[contains(text(),'${updatedBrandName}')]`).to.be.present;


    browser
      .useXpath()
      .expect.element(`//*[contains(text(),'Brand saved')]`).to.be.present;

    browser.end();
  },

  'Delete a brand' : async browser => {

    loginAdmin(browser);

    const brandName = 'new brand';
    await db('poctest_vehiclemanager_brand').insert({ name: brandName });

    browser
      .useCss()
      .click('#nav > li:nth-child(12) > a > span')
      .pause(1000)
      .click('#nav > li:nth-child(12) > ul > li > a > span')
      .pause(2000)
      .useXpath()
      .click(`//*[contains(text(),'${brandName}')]`)
      .useCss()
      .click('button.scalable.delete')
      .acceptAlert()
      .pause(2000);

    browser
      .useXpath()
      .expect.element(`//*[contains(text(),'${brandName}')]`).to.not.be.present;

    browser
     .pause(4000)
     .expect.element(`//*[contains(text(),'The brand has been deleted.')]`).to.be.present;

     browser.end();
  },
};
