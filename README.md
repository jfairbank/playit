# playit

Use the Play/Pause key on your keyboard to control audio players on websites. (Currently only working for [Songza](http://songza.com) and [Pandora](http://pandora.com).)

## Installation

    $ npm install -g playit

## run

Playit works via a WebSocket connection from the audio website and a server running on your machine. To start the server run:

    $ playit start

This will start a WebSocket server and an HTTP server on ports 3000 and 8080, respectively. You can change the ports via `-p` and `--httpPort`:

    $ playit start -p 3001 --httpPort=8888

## Run Client

After starting the server, client code will be copied to your clipboard. Open devtools, paste, and hit enter. Now your Play/Pause key should control the Play/Pause button(s) on the website. If you accidentally copy over the contents in your clipboard, you can run `$ playit client` in another terminal window. **NOTE:** You MUST run `$ playit start` to generate the client code for the first time, or `$ playit client` won't work!

## Remote Control

After starting the server, open `http://<your host>:8080` in a browser. The Play/Pause button on the webpage should remotely control playback as well. This is ideal if you want to control your music from a mobile device.
