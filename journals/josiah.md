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

The group and I talked about building unit tests for our APIs.

Working with PostgreSQL and Psycopg was a bit of a challenge today. I had an interesting issue where I tried to make a query looking for a specific row from the locations table using a WHERE clause as follows: """...WHERE country LIKE '%%s%';""", (country_variable). I was unable to escape the like clause to inject the value from country_variable. I found another way to make it work and was really happy about it until I realized that the query I was making was not the information I needed in the first place. At least I learned a lot from the docs for PostgreSQL and Psycopg. Next time, I will also plan ahead more.

## July 14, 2022

Today, I worked on:
* Structuring packing list models in exaclidraw
* Updating unit tests for locations and weather
* Creating fake weather api endpoint to save weather tokens while in development
* Researching oauth for react

The group and I discussed modifying the ghi structure so that when a user submits the form, they are presented with the graphs AND can build the packing list on the same page. We also discussed CI/CD variables stored in Gitlab to allow for CI testing.

Today was a tricky because there are two large challenges that lie ahead. Building the Django microservice for packing lists AND implementing oauth. The tricky thing is that I do not know in what sequence to do it. Also, authentication is still a big mystery to me and learning about it is daunting. I looked into a promise based feature for React called Axios that can integrate authentication, but have not learned more yet. After thinking it over, I will likely take the next few days to dive into authentication while the rest of the team work on the front end and Django project.

## July 15, 2022

Today, I worked on:
* Creating a logo for Packed on Canva
* Further authentication research
* Mapping packing list models on excalidraw
* Creating scratchpad directory for packing list suggestion ideas

The group and I discussed the relationships between the models for the packing list project. There was some confusion on the difference between the Condition and Category models but we came to a suitable solution.

Today was a bit of a grind because I am not an expert in logo design. I kept going to websites to find something I like. When I finally found something, they tried to make me pay for it. After a few rounds of that, I finally found something that will work temporarily. On a brighter note, brainstorming a few creative ideas for packing list items was fun! Finally, I learned about token authentication via JWTs stored in localstorage vs cookies. 
