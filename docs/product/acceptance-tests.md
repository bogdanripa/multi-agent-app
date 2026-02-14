# Acceptance Tests

## AT-1 Health is visible
Given the user opens the home page
When the app loads
Then the user sees "Task Organizer"
And the health payload is displayed
And there is a loading state while fetching
And errors are shown clearly if the API is down
