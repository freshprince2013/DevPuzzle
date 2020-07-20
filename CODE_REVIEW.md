Task 1: Code fixes and review
=============================

[I] App Issues:
---------------

1. Customized page titles and meta tags for SEO techniques is missing.
2. The "OkReads" brand is a non-linkable static text. It must be hyperlinked and redirect the user to the homepage.
3. Correct the unit test cases to reflect the expected results. While executing each test case, the test script pre-populates initial state with default set of values. The test result must reflect the expected values based on what the initial state is.

Are there other improvements you would make to the app? What are they and why?

1. Breadcrumb trail to track navigation between pages is missing. I would add breadcrumb trail (from source to destination) above the search field to help users track navigation between pages.
2. I would add advanced search filter capability to help users enhance their search experience. Some of these filters include: "Sorted by published date (newest to oldest, oldest to newest)", "Sorted by author in alphabetical order (asc to desc, desc to asc)", "Search Limit (Top 10, 25, 50, 100, all)" and "search by author".
3. Infinite scrolling is missing. I would add infinite scrolling to enhance search experience as well.

[II] Accessibility:
-------------------

a. Automated Scan
As per the automated scan by Lighthouse on DevTools, here were the identified issues:

- Buttons do not have an accessible name
The "search" button from the book search component does not have an accessible name. This prevents the screen readers and other assistive technologies from informing users about what the button does, instead simply announce it as "button".

- Background and foreground colors do not have a sufficient contrast ratio
The low contrast ratio of background and foreground colors for the empty text in the book-search component will negatively affect the reading experience for certain demographic of users who are challenged with low vision.

b. Manual scan
After checking for accessibility issues manually, here were the identified issues:

- Add anchor tag attributes (like href, title, tabindex and aria-label) to the "search example" element found in the search results content panel when empty for enhanced accessibility of the element.
- The focus indicator while tabbing through DOM elements were not strikingly noticable. Either drawing an outline around the element or increasing the contrast ratio between navigation states (blur vs focus) will help.
- The "Reading List" and "Want to Read" button groups do not have an accessible name. Adding the aria-label attribute to these button groups should help.
- Custom controls like button groups should have aria roles assigned to them. Please ensure that the "Reading List", "Search", "Want to Read" and "Remove from Reading List" button groups have aria roles assigned to them.  

Fixes should be available to review in the pull request!

