# technews-reactnative

Technews is a react-native version of my original technews app. 

Technews is a work-in-progress app that lists tech related articles from different sources powered by [News API](https://newsapi.org/). Technews allows you to bookmark articles for future reading.

## Getting started
### API Keys
You need to obtain an API key from [News API](https://newsapi.org/).

After obtaining the API key. Create a file called `tokens.js` inside `/src` directory and place your API key there and name it `NEWS_API_KEY` like this:
```
export const NEWS_API_KEY = "insert_your_api_key_here";
```

After placing the NEWS_API_KEY, go to your command line and run this.
```
$ npm install
```

And, you're all set!

##
### Built with
* [Redux](https://redux.js.orgr) - Redux is a predictable state container for JavaScript apps.
* [React Native Elements](https://react-native-training.github.io/react-native-elements/) - Currently, for button icons.
* [React Navigation](https://reactnavigation.org/) - Routing and navigation for React Native apps.
* [React Native Custom Tabs](https://github.com/droibit/react-native-custom-tabs) - Chrome Custom Tabs for React Native.

### Todo
* Bookmarks screen
* Bookmark functionality
* Pagination

### Inspiration
To learn new tools in developing mobile apps, as well as to learn new programming language.

## Contribution
As a rookie React Native development. If you find code that makes you cringe, help me improve my code by opening issues or creating a pull requests by forking the app.
