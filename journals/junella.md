## July 18, 2022

Today, I worked on:

- Researching bootstrap documentation to learn how to layout the frontend components on the browser page as per our wireframe design.
- Started working on components for our packing list application.

As a team, we group programmed writing views. We were able to set up the GET and POST views together for the categories model of our packinglist Django application.

Since I've been more focused on the frontend of our application, it was great to group program a portion of the backend and work through errors together. One of which had to do with CORS and CSRF tokens. We were initially hitting erros and not able to get our POST request to return data, but we were able to fix this by removing a middleware that we had installed for the csrf tokens.

## July 15, 2022

Today, I worked on:

- Connecting to the currency api from the frontend and rendering the data as designed.
- Getting a mock flight data chart to render on the frontend.
- Reorganizing frontend component files and creating new ones for components that still need to be built out.
- Updating ghi docs with current design for the travel data outputs, that is now in combination with the create a packing list components.

I also pair programmed with a teammate to retructure the response that the frontend receives from the currency api. It was initially returning a string that included what could be thought of as a key value. After some trial and error, we decided to take a substring of that output, staring after ":" and goes all the way to the end of the string. So the final result looks like we are just receiving the value.

## July 14, 2022

Today, I worked on:

- Getting a dynamic chart to render on the browser that includes data fetched from the weather API.
- Redesigning page that user gets sent to after submitting trip form.

Once again, the chart implementation was a challenge. For a while I could not get fetched data to render on the chart. It would only work with hard coded data. But based on examples in docs, it seemed like it SHOULD work. After giving my brain some time to rest, I realized that I was using the useState hook for the data that I was rendering on the chart, but never reset it. So the initial state were blank lists, then once the fetching was complete, the data was not reset, so it never rendered. The solution was just to remove the useState hook for the data. This works because I'm already keeping track of state that get plugged into that data variable earlier in the code. In short, the lesson is not to blindly mimic what you see in docs, really try to take it line by line and understand what's happening and in what order.

## July 13, 2022

Today, I worked on:

- Researching how to implement a data chart with bootstrap & react. We plan to use this for displaying 12 months of average temperatures and average flight costs.
- Getting a mock line chart to render on the browser.

As a team, we discussed updates for each of our project areas. We also group programmed to unblock calls to the currency api.

Implementing a chart was a lot more difficult than I had anticipated. The example docs I initially looked at did not have all the information that I needed in order to properly run the example code that I pasted over into our application for testing. Had to do a lot of digging to find several extra imports needed in order to get the test line chart to properly render on the browser.

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
