
# The Physical 100 Encyclopedia

Your one-stop-shop for everything about the South Korean reality competition series on Netflix — Physical 100.

This is the client for the web app, which provides a user interface for interacting with data about the contestants and challenges in the show.

## Overview

The web app is an immersion into the world of all things Physical 100. Users can reference all contestants and challenges in the show. Users can also edit articles about any contestant or challenge, encouraging a culture of open source knowledge.

## Features

- **View All Contestants**: Browse a list of all contestants, with options to sort alphabetically or by career category

- **View Contestant Details**: Access detailed information about each contestant, including their stats and an article with additional information about them

- **Edit Contestant Information**: Update a contestant's name and description directly from their details page

- **View All Challenges**: Browse a list of all challenges, with options to sort by name or type (team/solo)

- **Edit Challenge Information**: Update a challenge's title and description directly from their details page

- **View Contestant Stats**: View individual stats on contestant detail pages or a stats overview page

- **Responsive Design**: Enjoy a seamless, thoughtful experience on all screen sizes
## Tech Stack

**Client:** React, Axios

**Server:** Express, Knex, MySQL
## Prerequisites

Before you begin, ensure you have set up the server by following the instructions here:

https://github.com/jasfoong/physical-100-encyclopedia-server

## Installation

Follow these steps to get the client up and running:

**Clone the repository and enter the project directory**
  ```
  git clone https://github.com/jasfoong/physical-100-encyclopedia-client.git

  cd physical-100-client
  ```

**Install dependencies**
  ```
    npm install
  ```

**Set up environment variables**

Create a `.env` file in the root of the project:
  ```
    touch .env
  ```

Open the `.env` file and add your environment variables:
  ```
    REACT_APP_SERVER_URL=http://localhost:your_server_port
  ```

**Start the client**
  ```
    npm start
  ```

**Access the application**

Once the client is running, you can access the application at `http://localhost:3000`

## Screenshots

What to expect when you've successfully set up the client and server.

### Home Page
![](/src/assets/screenshots/home.png)

### Contestant Details Page in sidebar on desktop 
![](/src/assets/screenshots/contestant-details-sidebar.png)

### Edit Contestant Page
![](/src/assets/screenshots/edit-contestant.png)

### Stats Overview Page
![](/src/assets/screenshots/stats.png)


# Next Steps
Thank you in advance for the feedback on my first React project. 

In future iterations, I will be further developing the site with contestant and challenge data as new seasons of the show are released. 
I also hope to release a public poll where visitors to my site can vote on contestants' stats.