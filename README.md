# AmazonSort
Allows users to sort Amazon search results based on number of reviews. Also allows users to specify a minimum rating and minimum number of reviews.

# Download
https://chrome.google.com/webstore/detail/sort-by-number-of-reviews/jndomeiadhmldeoocgolbeoonlifhinh?hl=en

# Defects
1. popup.js reuses a lot of code.
2. sort() is overly complex, can be simplified with the use of querySelector().
3. program runs on an interval instead of detecting DOM changes.
