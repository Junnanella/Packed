## August 01, 2022

Today, I worked on:

- Continuing to build out the packing lists page. Today I made use of react-bootstrap to have each list render out on a card. Each card also has one of five images for a background.
- Turning each card into a clickable element, that then navigates to the corresponding packing list detail page, where the user can edit/update that particular packing list.
- Updating the navbar styling and limited the visibility of the "my packing lists" link to users that are logged in.

I tried different ways to intergrate bootstrap cards on the packing lists page and ended up using react-bootstrap because it layed a better foundation for the layout of the cards than with the standard bootstrap.
I also gained more of an understanding on using the useNavigate hook. I had used it earlier on in the project to navigate from the trip form page to the after submit page, but by only using it once before, it took some time to understand it enough to use it in a slightly different way. Which was within the packing lists page, to navigate to the specific packing list detail page after the user clicks on the card. The struggle was in that I was so used to having an id number be at the tail end of a url path to get to a specific instance, but with the useNavigate hook, we did not need to have the id in the path. Josiah was a big help, as he had used this specific for another component to send the user to the packing list detail page after creating the packing list.

## August 01, 2022

Today, I worked on:

- Updating the ghi markdown file to include updates to the layout and data provided to the user on the after submit page.
- Building a page for the logged in user to view their saved packing lists.

It took some time understand how to pass a user's token to the backend in order to authenticate the user to be able to view their packing lists. In order to get this to work, I analyzed Josiah's code in other files to see how he used AuthContext and did some googling. Near the end of class day, I noted that the implementation was still a work in progress and that I wanted to take some more time on it before asking for help. After a nap, I was better able to understand the code and able to get the logged in user's packing lists to render on the browser. Tomorrow, I plan to work on the styling of the packing lists page because right now it's not aesthetically appealing.

## July 28, 2022

Today, I worked on:

- Continued working on the weather component and refactoring the backend code to take in the user inputs. It was a challenge to understand how to account for if the user's departure date is in the latter months, like December(12), and then the return date is March(03), but after testing out some code on replit to see if I could get the output I wanted, which was a list like [12, 1, 2, 3], I inserted that logic into our application's code and got it to work.
- Getting the output to return actual month names, like "January" or "April" instead of the date strings, "2023-04-14". Took some research into datetime and testing code again on replit before inserting that logic into our application's code.

At the beginning of project time, Josiah and I discussed how the original weather api backend code worked and what sort of changes may need to be done to get the new output that we want. This sort of discussion was definitely helpful, as I feel that it helped move the thought process along faster than if I tried to sit alone to figure all of it out. So it's a great reminder of the importance of colloboration and bouncing ideas off of each other.

## July 27, 2022

Today, I worked on:

- Updating navbar to include logo
- Continued working on the weather component to render weather icons and temp. It currently works with hardcoded data on the fake api endpoint, so now trying to refactor the code for the real api endpoint to take in the user input dates and output data accordingly. As this code was originally written by Josiah, it's taking quite some time to wrap my head around how it originally worked. Will touch base with him tomorrow to get a better understanding so that I have a better chance at refactoring it with our new intentions.

## July 26, 2022

Today, I worked on:

- Making updates to the UI for the currency exchange rate component. It now allows the user to input how much money of their origin currency they intend to bring, and updates the total of the destination currency that equals to.
- Making updates to the UI for the weather data to be more user friendly. I removed the chart and we will now aim to render an icon and focused weather data based on the user's input dates on the homepage form.

## July 25, 2022

Today, I worked on:

- Collaborating with William on the mockups for the main page design. We searched for images we may want to use and ran those ideas with Karmina and Josiah. We all William's idea of incorporating vintage travel posters to the main page, but we still need to work out how to lay those out, without overwhelming the page and overshadowing the form we would like our users to fill out.
- I also worked more on the layout of the travel detail page, to try to get more definition between the three columns.

## July 22, 2022

Today, I worked on:

- Putting together a mockup of a possible final design for the main page of the application that includes a background-image, our form, the name of the application, a blurb, and a new button so the user has an option to go straight to creating their packing list.

As a team, we discussed what actions still need to be taken in order for our application to be complete. We still have to finalize the functionality of our packing list feature and work on our ui design. We plan to split up on Monday into two teams, taking on each of those main tasks.

## July 21, 2022

Today, I worked on:

- Writing some code to catch if I hit the limit for API calls and send back useful message, because without it, I was getting unhelpful messages in the console.
- Updating group scratchpad to add suggested items.
- Researching logos and inserting a custom favicon.

As a team, we also worked on group programming the packing list components. We were struggling with getting the conditional items and general items to load. We were able to console log the response that included those items, but for some reason, weren't able to assign them to the state variables. After some solo tinkering, I was able to get the items to render on the browser by restructuring the data shape from our views.py reponse. I plan to walk through it with the group tomorrow to explain my solution.

## July 20, 2022

Today, I worked on:

- Getting the locations database filled locally.
- Tapping into the locations database to fill in the select countries options on the main page form.
- Updating the ghi markdown file.

As a team, we discussed the design of the packing list components in more detail through live sharing of our excalidraw. The team also tried to trouble shooting the Flights API together.

I struggled a bit starting out the day with trying to access the postgres database to be able to create a table for the locations, because it feels like forever since I had done so. But with the help of google and Josiah, I was able to get things going.

## July 19, 2022

Today, I worked on:

- Updating the layout of the travel detail page.
- Updating travel form to incorporate a dropdown select menu for the origin and destination country.
- Passing country names and currency codes from select inputs on the travel form to be used in the api calls.

Near end of day, the team huddled together to discuss portions of the frontend that still need to be built out. We also briefly discussed ways to go about handling the components for the packinglist frontend portion. We will reconvene tomorrow morning to further that discussion.

Today, I really struggled with pulling data from the locations api as per the user's selectionon the travel form and passing country codes to the currency api and country names to the weather api. Took a lot of trial and error, but finally got it working. As it's a bit late in the night, I will have to review my code again in the morning, with fresh eyes, to better understand how I even resolved it.

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
