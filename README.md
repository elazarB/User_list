# Users List

Project description: The project presents a list of customers with basic details.


## User list Frontend

### Table of Contents:
Installation
Practice
Technologies in use
Donates
License


### Installation:
Clone the repository to your local machine using "git clone https://github.com/elazarB/User_list/tree/main/Users_list.git"
Navigate to the project directory: cd ort_task_front
Install dependencies by running: npm install

### Practice:
Enter in the terminal: "npm start" to view the project in development mode
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Enter in the terminal: "npm build" Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### Technologies used:
React - JavaScript library for building user interfaces.
Ant Design
React Leaflet - for location and map.
Axios





## User list Backend.


### Table of Contents
 
Prerequisites
installation
practice


To run a local copy of this project, follow these steps.

### Prerequisites:
.NET SDK (version 6.0 or higher)

### installation:
1. Layer the buffer:
"git clone https://github.com/elazarB/User_list/tree/main/Users_list.git"

2. Navigate to the project directory:
"cd ortTask"

2. Build the project:
dotnet activation

### practice:
To import the data, make a "GET" request to the address "http://localhost:5142/api/clients"

To import a single piece of data, make a "GET" request to the address "http://localhost:5142/api/clients/:_id"

To import data according to a certain parameter, contact the address with a "GET" request
  "http://localhost:5142/api/clients/searchBy?PARAMETER=TEXT"

To import data according to a free search, contact the address with a "GET" request
  ("http://localhost:5142/api/clients/search?s=TEXT")

To add a data, you must contact the address ("http://localhost:5142/api/clients") in a "POST" request

To delete data, send a "DELETE" request to the address (http://localhost:5142/api/clients/:id)
