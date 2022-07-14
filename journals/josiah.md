## July 11, 2022

Today, I worked on:
* Creating Dockerfile.dev modules for Weather, Currency, and Flights APIs.
* Creating docker-compose.yml incorporating the above as well as React
* Getting the weather api up and running

The group and I discussed whether we wanted to use one microservice per API or whether we should combine them all into one. We went with the former in order to make the webapp as modular as possible. Thankfully, Docker makes this easy!

I recalled from the second module of the bootcamp that our API kees must be kept absolutely secret. I got a chance to dig around stack overflow and Docker docs to figure out how to accomplish this. If you add an .env module to the same directory as the docker-compose module, you can add environment variables which can be declared in the docker-compose using the syntax VARIABLE_NAME: ${VARIABLE_FROM_ENV}


## July 12, 2022

Today, I worked on:
* Updating the return format of the weather api
* Creating two unittests to check the functionality of the weather api

The group and I talked about .env and passing environmental variables via the docker-compose, as mentioned in yesterday's journal.

A learning process for me today was building unittests. Bypassing the actual api call was a bit tricky but with the help of docs I was able to complete it. Using test driven development involves writing more lines of code but I expect it will save incredible amounts of hassle down the road, especially when working with code I did not write.


## July 13, 2022

Today, I worked on:
* Building a fourth FastAPI microservice called locations to be used by the front end form.
* Implementing basic Continuous Integration testing on the weather and locations APIs to run unittests.

Working with PostgreSQL and Psycopg was a bit of a challenge today. I had an interesting issue where I tried to make a query looking for a specific row from the locations table using a WHERE clause as follows: """...WHERE country LIKE '%%s%';""", (country_variable). I was unable to escape the like clause to inject the value from country_variable. I found another way to make it work and was really happy about it until I realized that the query I was making was not the information I needed in the first place. At least I learned a lot from the docs for PostgreSQL and Psycopg. Next time, I will also plan ahead more.
