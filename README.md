# Meanconnect

This project was created to give people a head start making a Steem based applications.

This build starter kit is using [Mdbootstrap Angular 6](https://mdbootstrap.com/material-design-for-bootstrap/?utm_ref_id=34523)

We highly recommend using pro it come with many prebuilt component which makes development much easier.

### This applications includes:
* Login / landing page
* Homepage
* Admin page to add users
* Tos
* Privacy policy
* Discord integration

### Coming soon!
* Blog
* User profile
* Wallet
* and much more!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0-rc.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Starting app:

INSTALL PM2

Run `npm i pm2`

Run `pm2 start server/index.js` Api Start

Run `pm2 start /usr/bin/ng -- serve` Non production run method

## How to change the discord settings:

Find and open file client/index.html

Scroll down till you see

<code>
  <script src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" async defer>
      new Crate({
        server: '460880985924435968',
        channel: '460880985924435971',
        shard: 'https://cl1.widgetbot.io'
      })
    </script>
</code>

Go into user settings

Go to appearance tab

Scroll down till you see developer mode and click it

Go to your channel right click the upsidedown cheveron

You will see copy id replace that with server id

Next you will need to right click your channel you want and replace that as well

Don't forget to turn off developermode
