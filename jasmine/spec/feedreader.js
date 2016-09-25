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
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This test ensures that the allFeeds variable has been
    * defined and it is not empty.
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* This test loops through each feed in the allFeeds object and
    * ensures that it has a URL defined and the URL is not empty.
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


    /* This test loops through each feed in the allFeeds object and
    * ensures that it has a name defined and the name is not empty.
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


  /* A new test suite named "The menu" */
  describe('The menu', function() {
    /* This test verifies that the menu element is hidden by default.
    * The menu element is hidden when the class attribute of body
    * element contains 'menu-hidden'. Removing this class from the
    * body element makes the menu visible.
    */
    it('is hidden', function() {
      expect($("body.menu-hidden").size()).toBe(1);
    });

    /* This test ensures that the menu changes visibility when the menu
    * icon is clicked. We simply test for the presence of 'menu-hidden'
    * in the class attribute of body element to determine whether the
    * menu is hidden or not.
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
    /* This test ensures that when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * loadFeed() is asynchronous, so this test requires
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('are present', function(done) {
      expect($('.feed .entry').size()).toBeGreaterThan(0);
      done();
    });
  });

  /* Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {
    /* This test ensures that when a new feed is loaded
    * by the loadFeed function, the content actually changes.
    * loadFeed() is asynchronous, so this test requires
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */
    var valueArray = [];

    beforeEach(function(done) {
      // Read the value of all entries after loading from
      // first source has been completed.
      valueArray.push($(".feed .entry").text().trim());

      // Reload the feeds from the second source.
      // Read the value of all entries after loading from
      // second source has been completed.
      loadFeed(1, function() {
        valueArray.push($(".feed .entry").text().trim());
        done();
      });
    });

    it('changes content', function(done) {
      // Compare the entry values from the two sources.
      var firstValue = valueArray[0];
      var secondValue = valueArray[1];

      expect(firstValue).not.toBeNull();
      expect(firstValue.length).toBeGreaterThan(0);
      expect(secondValue).not.toBeNull();
      expect(secondValue.length).toBeGreaterThan(0);
      expect(firstValue).not.toEqual(secondValue);
      done();
    });
  });
}());
