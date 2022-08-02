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

Anyone who is new to travel or going somewhere they may not have visited someplace before.

## Functionality

- A user will input a origin city. destination city, country and optionally travel dates. When the form is submitted, the user is presented with 3 pieces of info:

1. the average temp for their specified dates in that location. If they did not specify dates, a bar chart shows the average temp per month. \\
2. the current exchange rate from the USD to destination currency

- below the three pieces of above info, there is a button to create a packing list. The packing list page has suggestions which contain things like the right power adapter for that country, phone charger, passport holder and other basic essentials. The user can incorporate suggestions, add their own items and save the packing list if they have an account (next bullet point)
- User authentication system. Someone with an account can view upcoming trips and packing lists. Account holders can also reference packing lists from past trips.

- Reference the getting-started.md module to correctly populate your database and spin up the docker containers.