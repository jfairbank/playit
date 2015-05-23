# playit

Use Play/Pause button on keyboard to control audio players on websites. (Currently only working for [Songza](http://songza.com) and [Pandora](http://pandora.com).)

## Installation

    $ git clone git@github.com:jfairbank/playit.git && cd playit
    $ npm install -g babel
    $ npm install

## Client Configuration

Add in your host/ip address in `src/client.js`.

## Server

The websocket server is set to use port 3000 for now. The web server for the remote Play/Pause button is set to use port 8080 for now.

    $ npm run server

## Run Client

After starting the server, copy the contents of `dist/client.js`. Open devtools, paste, and hit enter. Now your Play/Pause key should control the Play/Pause button(s) on the website.

## Remote Control

After starting the server, open `http://<your host>:8080` in a browser. The Play/Pause button should remotely control playback as well.
