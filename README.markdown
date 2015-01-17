Force.com REST API CORS Demo
============================

This minimal sample shows how JavaScript outside the Force.com platform can access the Force.com REST API.

Instructions
------------

Create a connected app in your Spring '15 org with callback URL `https://your-app.herokuapp.com/oauth/_callback` and `api` scope.

Deploy the demo code to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

In your Spring '15 org, go to **Setup | Security Controls | CORS** and add `https://your-app.herokuapp.com` as a Whitelisted Origin.

Go to `https://your-app.herokuapp.com/`, authorize the app to access your Spring '15 org, and try uploading a file!