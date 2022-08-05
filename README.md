# packed

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Team

- Junella
- Josiah
- Karmina
- William

A useful webapp for planning and packing for your next trip.

## Intended market

For any traveler who wants to keep track of items they will need to bring or for those who may need help deciding what they need for their next trip. For casual or frequent travelers to save all their previous packing lists in one place.

## Functionality

A user will input an origin city and country, destination city and country, as well as travel dates. When the form is submitted, the user is presented with the following:

- An empty packing list, which they can start filling with their own inputs and/or add suggested items that we provide based on the weather of their destination during the duration of their trip. There are also suggestions for general items needed for any trip, like your phone charger or passport.
- The expected temperatures of their desitination for the duration of their trip.
- The current exchange rate between the origin country and destination country, if they differ. The user can also change the input for the origin rate and get live updates to the amount in the destination's currency.

User authentication system. Someone with an account can view all their saved packing lists and navigate to the detail page for each of them to make further updates or just to reference.

## Getting Started

After forking the repo, reference the [getting-started.md](getting-started.md) module to correctly populate your database and spin up the docker containers.
