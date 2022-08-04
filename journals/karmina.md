# August 3
Today I updated the travel details page, with the help of my team I redesigned the page to fit our esthetic. I also updated the color of the buttons to fit the page better as well and began the process of adding comments to the project. I also added a hover text feature for the edit/save buttons. 
# August 2
Today I updated the fontawesome icons to have color, before they were just grey buttons. I also updated the background color of the travel detail page and added some css styling to the tables. My next goals are to add a rounded border to the tables, implement a hover function that displays edit/save etc when you hover over a button and lastly I want to update the main header to add the user's name. 

# August 1
Today I was able to get the edit/save function working for the packing list name. I am now trying to update the add buttons for the suggested items so that they are more appealing. I'm looking at icons on Font Awesome and will try to implement an icon soon. 

# July 28
Today I worked on implementing the edit/save feature for the packing list name. I got my code to briefly work but it throws some errors, after working with one of the SEIRs I have some docs to look at to try and work issues out. 

# July 27
Today I added titles to our items list and created a dynamic title for the packing list to update with the country the user is flying too. Tomorrow I'll get working on trying to implement an edit feature to the name of the packing list so the user can change it to whatever they want rather than just the default "Packing List for {destination_country}. 

# July 26
Today with the help of SEIRs I was able to implement the "add" button with the functionality of moving one item in a list to another list and removing the added item from the original list. I'll touch base with my team later on to figure out what the next steps are but I am very happy I got this feature to work and am excited for whats left. 

# July 25
Today with help from my team I got the tables for general items and suggested items to render correctly. It now renders the items created in admin. Although the styling of the table is still a bit wonky and uneven I am mainly focusing on the functionality and will come back to the design. 

I now have to figure out how to implement an "add" button to the items lists so that the selected item(s) can be moved to the packing list. 

# July 22
Today there was not alot of coding since we had lectures and mandatory fun time. My team and I did start the process of designing the look of the site but over the weekend I will focus on trying to create a table for the packing list items.  

# July 21
Today I completed one of the front end files but am having issues with another. I can't get it to render what I want it to. My team and I pair programmed to try and trouble shoot but we had no luck. We'll work with the SEIRs for some assistance. 

# July 20
Today I started to work on the front end for out Packing Lists. I'm struggling with fetching the data from our views and then rendering it on our detail page. I'll keep researching and hopefully with trial and error the front end will be completed tomorrow. 

# July 19
Today I helped complete views.py, I worked alongside Josiah to complete it. After having some trouble I was able to complete
a couple functions with delete, get, put and post methods. Now we will begin helping Junella with the front end since she has been working on it all on her own while we completed the back end. I'm nervous to start the front end as I don't feel too confident in Javascript and React but my team has been super great and helpful so I know we'll figure it out together. 

# July 18
Today my team and I pair programmed for a while to create a view for our model. It was really helpful to see how my teammates worked through problems and see their thought process in action. I also made some other updates to the views.py, I updated the encoders to include the name of Foreign Key encoders and added the "id" property that was missing. I'm excited to come back tomorrow and finish the views.py, I still have some kinks to work out but I hope they can be fixed tomorrow. 

# July 15
Today I fixed the CI/CD issue that was causing my tests to fail when I pushed my code to the repo. I also completed the packed-lists models and admin.py files. I need to work on doing the views which I know I will struggle with. I think I have the encoders done but I will continue researching this weekend to prep for the upcoming week and come ready with questions.  

# July 14 
Today I was able to fix my second unit test that kept failing, turns out I just needed to update the assertion to compare the type of the output and compare that rather than just the output itself. Makes sense because the goal of my unit test was to only 
test the type of value returned from the API call not the call itself since currency is constantly changing I can't hard code an amount. I also updated my apis.md file to keep it updated with what the API is returning for Junella who is working on the front end. Later today and tomorrow I'll begin working on the packing lists service. 

# July 13 
Today I was able to get my API function running to return only the "result" data from the API call with the help of my team. I didn't realize before that I already had the return value that I wanted but I just didn't know how to turn it into a callable function. 

I started working on unit testing for my functions and got 1 of them to work. I'm having issues with the second unit test because it wont accurately compare the result which is a float to the test result in my test. On my end I see that they are both floats so I would assume the assertion that both items equalled would be valid but I guess not. I'll keep researching how to fix that and touch base with a SEIR if I cant figure it out. 

# July 12
Today our team reviewed our prior days work and talked about what we needed to do. I was able to test my currency exchange rate API to confirm it worked but now I need to create a function that only returns the from, to, amount, result and date. I am having trouble creating a function to complete this task but I will continue to research Fast APIs and react to resolve this. 

# July 11
Today our team set up docker by creating microservices for each API we need to use and the src code. With the help of SEIRS we were able to get the ports up and running. 