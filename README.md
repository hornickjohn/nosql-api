# NoSQL API

## Table of Contents
  
* [Description](#description)
* [Usage](#usage)
* [Questions](#questions)

## Description

This project provides full back-end functionality for a RESTful API storing users, thoughts, friends of users, and reactions to thoughts. Uses MongoDB and mongoose/express in node.

## Usage

To run the server locally, clone the repo, install dependences with "npm i", and initialize with "npm start". 

API routes are as follows:

<ul>
    <li>/api/users</li>
    <ul>
        <li>
            GET: fetch all users
        </li>
        <li>
            POST: add a new user (include following fields in header)
        </li>
        <ul>
            <li>
                username: string
            </li>
            <li>
                email: string
            </li>
        </ul>
    </ul>
    <li>/api/users/:id</li>
    <ul>
        <li>
            GET: fetch a single user
        </li>
        <li>
            PUT: update a user, include email and/or username in header
        </li>
        <li>
            DELETE: remove a user
        </li>
    </ul>
    <li>/api/users/:id/friends/:friendId</li>
    <ul>
        <li>
            POST: add another user's id as a friend of given user
        </li>
        <li>
            DELETE: remove friend from user
        </li>
    </ul>
    <li>/api/thoughts</li>
    <ul>
        <li>
            GET: fetch all thoughts
        </li>
        <li>
            POST: add a new thought (include following fields in header)
        </li>
        <ul>
            <li>
                thoughtText: string
            </li>
            <li>
                username: string
            </li>
            <li>
                userId: string
            </li>
        </ul>
    </ul>
    <li>/api/thoughts/:id</li>
    <ul>
        <li>
            GET: fetch a single thought
        </li>
        <li>
            PUT: update thought, include new thoughtText and/or username in header
        </li>
        <li>
            DELETE: remove a thought
        </li>
    </ul>
    <li>/api/thoughts/:id/reactions</li>
    <ul>
        <li>
            POST: add a new reaction (include following fields in header)
        </li>
        <ul>
            <li>
                reactionBody: string (max 280 characters)
            </li>
            <li>
                username: string
            </li>
        </ul>
    </ul>
    <li>/api/thoughts/:id/reactions/:reactionId</li>
    <ul>
        <li>
            DELETE: removes a reaction
        </li>
    </ul>
</ul>

## Resources

[Walkthrough video showing functionality of API routes.](https://drive.google.com/file/d/1JPyKDmXlCiDGCJ152Kh3IP7Avr3ERp1S/view)

## Questions

Contact with questions/comments:
* GitHub: [hornickjohn](https://github.com/hornickjohn)
* Email: jhornick@live.com
    
