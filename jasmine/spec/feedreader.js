/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    let feedContents = [];
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('urls are not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(null);
                expect(feed.url).not.toBe('');
            });
        });

        it('names are not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(null);
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function () {
        const menuButton = $('.menu-icon-link');
        it('is hidden when the page loads', function () {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        it('display is toggled when the menu icon is clicked', function () {
            /* isHidden variable makes sure that this test is not dependant
             * on the previous test, or in other words: it makes sure we do
             * not assume the menu is hidden when we start this test
             */
            let isHidden = document.body.classList.contains('menu-hidden');
            menuButton.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(!isHidden);
            menuButton.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(isHidden);
        });
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                feedContents.push(document.querySelector('.feed').firstElementChild.href);
                done();
            });
        });

        it('are created with LoadFeed', function (done) {
            expect(document.querySelector('.feed').childElementCount).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function () {
        beforeEach(function (done) {
            loadFeed(1, function () {
                feedContents.push(document.querySelector('.feed').firstElementChild.href);
                done();
            });
        });

        it('changes the feed content', function (done) {
            expect(feedContents[0]).not.toBe(feedContents[1]);
            done();
        });
    });
}());
