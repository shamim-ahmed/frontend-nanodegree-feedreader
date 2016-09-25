# Project Overview

This project includes a webpage that displays news feeds from a specific set of sources. The webpage also includes a set of Jasmine tests that run every time
the page is loaded.

## Getting started
- Clone the project repository by executing the following command:

  ```
  git clone https://github.com/shamim-ahmed/frontend-nanodegree-feedreader.git
  ```

  Alternatively, download the [archive](https://github.com/shamim-ahmed/frontend-nanodegree-feedreader/archive/master.zip) and extract it.
- Go to the directory containing project files.
- Open index.html in your browser.

## Basic Functionality
- The webpage displays a list of news items.
- A menu on the right-hand side (hidden by default) allows the user to choose a feed source.
- The user can click on the menu icon at the top of the page to make the menu appear or disappear.
- The test results are shown at the bottom of the page.

## Test cases
Test cases are included to validate the following scenarios:
- There is a global variable named 'allFeeds', which contains details about feed sources.
- Each feed source has a specified URL.
- Each feed source has a specified name.
- The menu is hidden by default.
- The user can click on the menu icon to make the menu appear or disappear.
- When the page loads, it contains at least one news entry.
- When a different source is selected, different news entries are displayed on the page.
