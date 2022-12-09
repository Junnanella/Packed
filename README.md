# packed

A webapp to help you plan and and pack for your next trip.
Visit the deployed site [here](https://packed-module-3.gitlab.io/packed/)! (note: This is deployed on heroku's free servers so it may take a few moments to load)

## Design

Reference the documentation listed below for an in-depth look at the design of Packed.

- [API design](docs/apis.md)
- [Data models](docs/data-model.md)
- [GHI](docs/ghi.md)
- [External API Integrations](docs/integrations.md)
- Tech stack: Django, React, Python, JavaScript, PostgreSQL, FastAPI, Docker, Django REST framework, SimpleJWT auth

## Intended market

Packed is for any traveler who wants a simple and intuitive place to keep track of items they plan to bring on their next adventure. For casual or frequent travelers to save all their previous packing lists in one place.

## Functionality

Users input an origin city and country, destination city and country, as well as travel dates. They are presented with the following:

- An empty packing list, which they can fill out with their own inputs and/or add catered item suggestions based on the anticipated weather of their destination and items on their previous lists. There are also suggestions for general items needed for any trip, like phone charger or passport.
- Expected temperatures of their desitination for the duration of their trip are provided from an external API.
- The current currency exchange rate between the origin country and destination country is provided from an external API call. The user can also change the input amount for the origin rate and get live updates with the amount in the destination's currency.

This web application uses JWTs stored in local storage to handle user authentication. Account holders can visit their saved packing lists and navigate to the detail page for each of them to view, print or make further updates.

## Getting Started

You are welcome to spin up the project locally. After forking and cloning the repo, reference the [getting-started.md](getting-started.md) module to populate your database.
