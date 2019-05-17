# ChatSS
> A live chat app made without everyone's favourite language: JS.

## Why?
A challenge for [devcord](https://challenge.devcord.com). No JS or form submissions allowed.

## Why does it look so bad?
 - I'm trash at designing things quickly.
 - In true Gabe fashion, I put it together last minute.

# How?
Good questions. This monstrosity was inspired from an article I read
about [a keylogger built entirely in CSS](https://github.com/maxchehab/CSS-Keylogging).
I initially was going to make it using the method shared there, but decided
to take the route I did. What is that you might ask? The hack employed in
this hellish being is fonts. For each character, I've set a custom font that
looks for a font file on the server. The server logs this, and eventually
smushes it all together to make your message. Since the font isn't loaded
multiple times, the server doesn't notice when you type a character twice.
Fun isn't it?

# How do I look at the monster that you've created?
Clone this repo, install the dependencies with `yarn` or `npm i`, and then
run `yarn start` or `npm run start`. For you lazy people I've included a
docker image that you can run with `docker-compose up`.

Make sure you use two different browsers (or at least browser profiles) as
it uses cookies to differentiate between users.

# Can you make a flowchart of the process?
No, but I can do something hopefully similar.

When you click in a text box, the `:focus` selector sets a background image
pointing to an API endpoint that tells either the name queue or the
message queue to begin. Each character typed loads a font which tells the
endpoint the character typed, and it gets added to the queue. When you click
send, you are linked to the endpoint with a query string telling
the queue you are finished. When the queue receives the `'done'` message, it
trims everything before `'begin'` from the queue, and concatenates all of the
characters together, clears the queue, and sends it to the database to either be put in the name
field or added to the message queue. Take a look at `./src/database.db` while sending messages to
see how the database stores everything.

When you're viewing the messages, you're looking at an `<iframe>` of a list of
messages with a header set to refresh the page every 5 seconds. It looks like
garbage but it works.
