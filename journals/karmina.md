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