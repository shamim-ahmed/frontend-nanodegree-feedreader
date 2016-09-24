/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  // change the value of the timeout interval for asynchronous tests
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty. Experiment with this before you get started on
    * the rest of this project. What happens when you change
    * allFeeds in app.js to be an empty array and refresh the
    * page?
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Write a test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */
    it('have valid URL', function() {
      var i;
      var feedUrl;

      for (i = 0; i < allFeeds.length; i++) {
        feedUrl = allFeeds[i].url;
        expect(feedUrl).toBeDefined();
        expect(feedUrl.length).not.toBe(0);
      }
    });


    /* : Write a test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */
    it("have valid name", function() {
      var i = 0;
      var feedName;

      for (i = 0; i < allFeeds.length; i++) {
        feedName = allFeeds[i].name;
        expect(feedName).toBeDefined();
        expect(feedName.length).not.toBe(0);
      }
    });
  });


  /* Write a new test suite named "The menu" */
  describe('The menu', function() {
    /* Write a test that ensures the menu element is
    * hidden by default. You'll have to analyze the HTML and
    * the CSS to determine how we're performing the
    * hiding/showing of the menu element.
    */
    it('is hidden', function() {
      expect($("body.menu-hidden").size()).toBe(1);
    });

    /* Write a test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
    it('changes visibility', function() {
      $("body > div.header > a.menu-icon-link").click();
      expect($("body.menu-hidden").size()).toBe(0);
      $("body > div.header > a.menu-icon-link").click();
      expect($("body.menu-hidden").size()).toBe(1);
    });
  });

  /* Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    /* Write a test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * Remember, loadFeed() is asynchronous so this test will require
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('are present', function() {
      expect($('.feed .entry').size()).toBeGreaterThan(0);
    });
  });

  /* Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* Write a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Remember, loadFeed() is asynchronous.
    */
    var value1 = null;
    var value2 = null;
    var callbackFunction = null;

    var firstValueReader = function() {
      value1 = $(".feed .entry:first").text().trim();
      loadFeed(1, secondValueReader);
    };

    var secondValueReader = function() {
      value2 = $(".feed .entry:first").text().trim();

      if (callbackFunction) {
        callbackFunction();
      }
    };

    beforeEach(function(done) {
      callbackFunction = done;
      loadFeed(0, firstValueReader);
    });

    it('changes content', function() {
      expect(value1).not.toBeNull();
      expect(value1.length).toBeGreaterThan(0);
      expect(value2).not.toBeNull();
      expect(value2.length).toBeGreaterThan(0);
      expect(value1).not.toEqual(value2);
    });
  });
}());
