## July 11, 2022

Today, I worked on:

- Getting a basic home page to render on the browser.

Also pair programmed with the team to get starting files set up. This includes docker-compose and docker dev files for each microservice.

While setting up the docker-compose file, we learned as a team how to set up the ports. Initially, we had port numbers mirroring each other on either side of the colon. By doing it this way, we were unable to get responses from our microservices to render on the browser. With the assitance of our SEIRS, we learned that the right side of the port declaration should point to port 8000, which is how we connect to our docker containers.
