<div align="center">
  <img title="logo" src="./assets/logo.png" width="40%" />
  <h1>@pleak/react-perf-monitor</h1>
  <p>Performance monitoring for React and React Native apps with <a href="https://getpleak.io">Pleak</a>.</p>
</div>

# Table of contents

* [Getting Started](#getting-started)
  * [Installation](#installation)
    * [React Native](#react-native)
  * [Initializing](#initializing)
    * [Options](#options)
      * [Required](#required)
        * [`uri`](#uri)
      * [Optional](#optional)
        * [`debug`](#debug)
        * [`publish`](#publish)
        * [`interval`](#interval)
        * [`environment`](#environment)
* [Usage](#usage)

# Getting started

## Installation

```
# With npm
npm install @pleak/react-perf-monitor

# With yarn
yarn add @pleak/react-perf-monitor
```

### React Native

If you're using this package with a React Native app, you must link native dependencies to your project with [react-native-cli](https://www.npmjs.com/package/react-native-cli).

```
react-native link
```

This command will automatically find native dependencies and link them to your project.

## Initializing

We recommend you to initialize the lib in a separate file and then import it when you need it.

```js
import { Pleak } from '@pleak/react-perf-monitor';

const pleak = new Pleak({
  uri: 'YOUR_PLEAK_DSN',
});

export default pleak;
```

### Options

#### **Required**

#### `uri`

Your Pleak DSN, required to publish to Pleak. The structure of your DSN should look like this:

```
https://{publicKey}@{host}/{appId}
```

#### **Optional**

#### `debug`

_Defaults to false_

If true, informations about events and publishing will be logged in console.

#### `publish`

_Defaults to true_

If true, collected events will be published on Pleak.

#### `interval`

_Defaults to 5000_

Events are not published one by one, they are stored and published in batch at an interval in milliseconds defined by this option.

#### `environment`

_Defaults to `process.env.NODE_ENV`_

Define tracked environment of your app in Pleak.

# Usage

Once you installed and initialized the lib you can use it to monitor your React components like so:

```js
import React, { Component } from 'react';
import pleak from '../pleak'; // Import the Pleak instance you defined earlier

class MyComponent extends Component {
  state = { user: null };

  constructor(props) {
    super(props);

    // Capture your component's performance
    pleak.captureComponentPerfs(this, {
      // Optional. Use the excludes option to avoid collecting events on specific methods
      excludes: ['render'],
    });
  }

  componentDidMount() {
    /* Optional.
    This allows you to attach a context to any event triggered by this method */
    pleak.setContext({
      time: Date.now(),
    });

    this.loadData();
  }

  loadData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await res.json();

    /* Optional.
    This allows you to attach a context to all events,
    from the moment when this method is triggered (overwritable) */
    pleak.setGlobalContext({
      user,
    });

    this.setState({
      user,
    });
  };

  render() {
    const { user } = this.state;

    return <div>Hello, {user ? user.name : 'world'}!</div>;
  }
}
```
