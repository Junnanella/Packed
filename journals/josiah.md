## July 11, 2022

Today, I worked on:
* creating Dockerfile.dev modules for Weather, Currency, and Flights APIs.
* creating docker-compose.yml incorporating the above as well as React
* getting the weather api up and running

The group and I discussed whether we wanted to use one microservice per API or whether we should combine them all into one. We went with the former in order to make the webapp as modular as possible. Thankfully, Docker makes this easy!

I recalled from the second module of the bootcamp that our API kees must be kept absolutely secret. I got a chance to dig around stack overflow and Docker docs to figure out how to accomplish this. If you add an .env module to the same directory as the docker-compose module, you can add environment variables which can be declared in the docker-compose using the syntax VARIABLE_NAME: ${VARIABLE_FROM_ENV}


## July 12, 2022

Today I worked on:
* updating the return format of the weather api
* creating two unittests to check the functionality of the weather api

The group and I talked about .env and passing environmental variables via the docker-compose, as mentioned in yesterday's journal.

A learning process for me today was building unittests. Bypassing the actual api call was a bit tricky but with the help of docs I was able to complete it. Using test driven development involves writing more lines of code but I expect it will save incredible amounts of hassle down the road, especially when working with code I did not write.