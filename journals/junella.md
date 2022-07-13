## July 12, 2022

Today, I worked on:

- Incorporated a form to the main page for the user to input their origin location, destination, departure and return dates.
- Worked on mapping out how the frontend interacts with the backend with excalidraw.
- Getting the user's inputs in the form passed to another page where we plan to show data from our api calls.

Had a group discussion about api keys, storing them in .env, and how to implement them without exposing the actual api keys in files that are pushed to git. Also had a brief discussion of what data we want out of the apis. For example, for the currency api, we likely just need the amount for the destination.

I struggled with understanding how I can route to another page and pass along the user inputs in the trip form after hitting submit. After some research, I found that I can pass that input data and route the user to a new page using a hook called, useNavigate(). To access the data in the new page, I learned to use a hook called, useSearchParams().

## July 11, 2022

Today, I worked on:

- Getting a basic home page to render on the browser.

Also pair programmed with the team to get starting files set up. This includes docker-compose and docker dev files for each microservice.

While setting up the docker-compose file, we learned as a team how to set up the ports. Initially, we had port numbers mirroring each other on either side of the colon. By doing it this way, we were unable to get responses from our microservices to render on the browser. With the assitance of our SEIRS, we learned that the right side of the port declaration should point to port 8000, which is how we connect to our docker containers.
