# Sprint 8 Project
We are automating tests on the urban routes application to increase speed and efficiency

We will be using VSCode (text editor),Github (cloud-based data storing system), Chrome DevTools, and WebDriverIO (automation test framework for Node.js)

To run the tests you will need to navigate into the project folder, run the command 'npm install' this will ensure you have node, and then open a terminal. once in the terminal enter the command 'npm run wdio' to run the tests.

Before testing you will need to start up a server and give your tests easy access to the url. Go to 'wdio.conf.js' and paste your server url in the baseUrl section (you make have to remove the comment marks to make it active). Be weary after some time your server will shut down and you will need to start a fresh one.

For the first task we are asked to write separate tests that will ensure that you can properly order a ride on the application the list is as follows: Set the address, select the supportive plan, filling in the phone number, add a credit card, write a message for the driver, order and blanket and handkerchiefs, order 2 buckets of ice cream, and ensure the car search modal appears. There is also an optional 'wait for the driver's info to appear. you will need to open a separate tab with the urban routes app so you can use DevTools to see what elements you are trying to access and then also write functions to add data and click buttons on the application as necessary. It is a lot of guess and check if you don't know what exact elements you are trying to select. I would also suggest you disable the '-headless' tags in your 'wdio.conf.js' file as well so you can see where your test are reaching issues before the error report appears in your terminal. 

in the Second task you'll write your own readme.md about the project