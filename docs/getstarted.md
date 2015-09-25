#Get Started
If you have installed axolot ( `npm install -g axolot` ) and have followed the [CLI](./cli.md) instructions you should have all the know how to start.

We have to create a new project and we are going to use the CLI.

```
$ axolot new testproject
$ cd testproject
$ npm install
```

With the above commands we have an empty axolot project and to launch you have to options.

1. `npm start` - This is the default command to start any NodeJS app. This is a good way to start the app in production.
2. `gulp` - Using gulp to start the app it is good for development because it reloads/restart automatically after every js file change. So when you modify something you can just call your API again and not having to worry if it has restarted or not.

Now you are ready to start making your amazing new API.