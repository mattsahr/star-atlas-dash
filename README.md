# Star Atlas Dashboard

This is a svelte.js app that lists all the ships in the [Star Atlas](https://staratlas.com) game.

[Demo App](https://mattsahr.github.io/star-atlas-dash/)

It borrows or outright copies the features of these excellent dashboards.

[Star Atlas Club](https://explorer.staratlas.club/ships/staking)  
[Aephia](https://aephia.com/star-atlas-ships/)

This project uses public API endpoints to fetch price data and ship info.  Specifically, these URLS:

### [Dexlab API](https://docs.dexlab.space/api-documentation/rest-api)
These are all very easy to use.  They're generally restricted to the last 24 hours of data.

```
https://open-api.dexlab.space/v1/prices/:address/last
https://open-api.dexlab.space/v1/prices/:address/closing-price
https://open-api.dexlab.space/v1/trades/:address/24h
```

### [Star Atlas Endpoints](https://github.com/staratlasmeta)

Star Atlas doesn't have great tools (yet), or at least I couldn't find them.  From their [play.staratlas](https://plya.staratlas.com) I borrowed the `nfts` endpoint for a json list of all ships.  And I borrowed the websocket endpoint to get bids, asks and price history.

```
https://galaxy.staratlas.com/nfts
ws = new WebSocket('wss://serum-vial.staratlas.cloud/v1/ws');
```

### Open Question

Is the Star Atlas websocket API truly open?  I mean, yes, it is, you can access it.  But it's not described or explained on any helpful developer support page.  So I don't know if it will continue to be available.  If it goes away or goes private, this dashboard will be prety much dead.

## Deploy on your Page

Svelte apps are pretty friendly for dropping into an existing web page.  

You can drop the contents of the `/docs/` folder somewhere on your site.  There's an `index.html` file in there, but you can see it's pretty minimal.  You can include the relevant files on a page of your choice -- two style files, a google font, and a JS script.  Then on your target page you need a div called "star-atlas-dashboard".

```
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap" rel="stylesheet">

    <link rel='stylesheet' href='global.css'>
    <link rel='stylesheet' href='star-atlas-dash/bundle.css'>

    <script defer src='star-atlas-dash/bundle.js'></script>

</head>
<body>
    <div id="star-atlas-dashboard" data-height-offset="0"></div>
</body>
```

Dropping that code into an existing page should allow the app to load.

### Global stuff -- CSS

There is some amount of global CSS in `/public/global.css`  The project uses a library called 'tippy.js' for tooltips.  It's styles are in there.  Everything else in global CSS is scoped under a `.svelte-app-main` class.

Like normal CSS, you can override the in-app styles with more specifically targeted rules.  In general, if you add `.svelte-app-main` to the front of a css rule, you can control the app styles.  Example:

```
.svelte-app-main header > .ticker-frame {
    top: 70px;
    overflow: hidden;
    background: #140A45;
    border-color: rgb(50, 10, 110);
}
```

In the `index.html` file, The field `data-height-offset` can be set to tell the app how to calculate the height of the table.  The table wants to use all the available height, but won't scroll off the bottom of the page, unless the page is rather small (nested scrollers are annoying).  So if you add a header to the top of the page, you can tell the app how much height it takes, with `data-height-offset`.

```
<div id="star-atlas-dashboard" data-height-offset="100"></div>
```

### Global stuff -- JS

The project sometimes loads https://s3.tradingview.com/tv.js which mounts a global JS function at `window.TradingView`.

## Build and Develop

This project is **almost** a generic default svelte app.  The notes below are just standard svelte getting-started notes.  But they all still apply.

Install the dependencies...

```bash
git clone https://github.com/mattsahr/star-atlas-dash
cd star-atlas-dash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```

# TODO LIST

- The individual ship page could use more trade data, like the APR rates.
- The individual ship page could show the rest of the metadata, like height x width x length.
- The JSON data has lots of images available for every ship, so a gallery viewer would be nice.
- The rest of the Star Atlas stuff, like access passes and land claims, could be available in a more general table view