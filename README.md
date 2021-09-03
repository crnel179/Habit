# Hubeats Habit Tracker

## Project Description 

A website that allows a user to login and track their personal habits! 

A user can add various personalised habits and track them. If they track these habits daily, and mark them as completed, they can start a streak!

Streaks can be viewed on the habit, but also via our calender page which will give a more visualised idea of the streak length!

## Installation & Usage

### Installation

- Clone this repo
- Open it in VSCode

### Usage

Once cloned, you can replicate the following actions within the terminal and recieve different outcomes: 

#### bash _scripts/startDev.sh

- starts client, api & db services
- runs db migrations
- seeds db for development
- serves client on localhost:8080
- serves api on localhost:3000

#### bash _scripts/startTest.sh

- starts api & db services
- runs db migrations
- attaches to api container and triggers full test run
- no ports mapped to local host

#### bash _scripts/teardown.sh

- stop all running services
- removes containers
- removes volumes

## Technologies

[![Visual Studio Code](https://img.shields.io/badge/--007ACC?logo=visual%20studio%20code&logoColor=ffffff)](https://code.visualstudio.com/)

- HTML, CSS and JavaScript
- Node.js
- MongoDB
- Docker

## Wins & Challenges

### Wins

### Challenges

- Connecting a mock database to the model and controller test suites 

