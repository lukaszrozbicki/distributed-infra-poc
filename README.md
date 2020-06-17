# BE-FE cross domain API and iframe communication PoC

This is very simple proof-of-concept project to demonstrate communication between BE and FE.

Backend app is served on `http://localhost:3001` an exposes two endpoints: 
* `/api` - returns JSON array 
* `/iframe` - returns HTML page that's embedded via `iframe` in FE app

Frontend app is served on `http://localhost:3000`. It fetches the data from the BE app and displays some content in
`iframe` element. This embedded content may execute some script that communicates back to the main, parent frontend app.
So it can reacts on the message and do something (displaying the callback message in this case).

The main case here is that BE and FE are hosted under different addresses. Here the main difference is just a port but
in real life it would be different hosts, domains, machines.

The requirement here is to have some security ;)
So backend app is able to send the data only to the specific hosts and, in similar way, frontend app can only display
content from specific host (it's for the `iframe` thing, mostly).

## Config

To achieve basic communication security and restriction when it comes to data origns and targets, proper headers are used.
For backend two things must be set up:
* CORS - `Allow-Control-Access-Origin` header must be set with a value of our FE app host
* CSP - `Content-Security-Policy` header must be set with FE host as a `frame-ancestor` and with `sandbox allow-scripts`
to treat iframes as sandboxes that are allowed to run scripts.

For frontend, proper HTML `meta` tag must be set, to point specific host which app is allowed to display content from:
```html
<meta http-equiv="Content-Security-Policy" content="frame-src http://localhost:3001">
```

Also, please remember about proper usage of `postMessage` method in browser. Mind the `targetOrigin` param :)

## Test
To simulate the infrastructure just run
```
./setup.sh
./simulate-infra.sh
```

You can play with `.env` files for each of the layer (BE or FE) to see, how mismatched hosts affects the runtime of the app.
