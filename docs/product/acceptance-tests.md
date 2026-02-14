# Acceptance Tests

## AT-1 Health is visible
Given the user opens the home page
When the app loads
Then the user sees "Task Organizer"
And the health payload is displayed
And there is a loading state while fetching
And errors are shown clearly if the API is down

## AT-2 User can sign up with email/password
Given the user is logged out
When the user submits a valid email and password on the sign-up form
Then the account is created
And the user is signed in
And the UI shows an authenticated state

## AT-3 User can sign in with email/password
Given an account exists for the submitted email
When the user submits correct email/password on the sign-in form
Then the user is signed in
And the UI shows an authenticated state

## AT-4 Invalid credentials are handled clearly
Given the user is logged out
When the user submits an unknown email or wrong password
Then sign-in is rejected with an error message
And no authenticated session is created

## AT-5 Session survives page reload
Given the user is signed in
When the user refreshes the page
Then the user remains signed in
And the UI still shows an authenticated state

## AT-6 User can sign out
Given the user is signed in
When the user clicks sign out
Then the session is revoked
And the UI returns to logged-out state
