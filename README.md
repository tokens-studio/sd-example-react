# Building on tokens using StyleDictionary with React

A simple example of using multi file tokens exported via [tokens.studio](https://tokens.studio/) or [penpot](https://penpot.app/).

To test simply run

``` sh
npm install
npm run dev
```

Tokens will be built using [StyleDictionary](https://styledictionary.com/) from the [tokens directory](./tokens).

The vite watcher will automatically rebuild tokens and inject them in the the react app.

Built tokens will be stored in `./dist/tokens`
