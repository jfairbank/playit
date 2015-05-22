# playit

Use Play/Pause button on keyboard to control audio players on websites. (Currently only working for [Songza](http://songza.com).)

## Install

    $ npm install -g babel webpack
    $ npm install

## Server

WebSocket server statically set to use port 3000 for now.

    $ babel-node server.js

## Client

    $ webpack client.js bundle.js
    $ pbcopy < bundle.js

Open devtools, paste, and hit enter. Now your Play/Pause key should control Songza's Play/Pause button.
