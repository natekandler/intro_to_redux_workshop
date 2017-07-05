# SD React With Rails Workshop

## Learning Competencies

* Redux
* React Redux Library
* Actions
* Reducers

## Summary
If we look back at the last two workshops one thing they both had in common was if we wanted to update the state of a parent component from a child component, we would have to define a function in the parent, bind the context, and pass it through as props. This works and in many cases is a fine solution to this problem. However as an application becomes more complex, passing functions through several layers of components and keeping track of their contexts can become problematic.

The way Redux helps is by keeping track of our entire application's state in one state tree called the store. When we want to update a piece of state, we will dispatch an action. That action will flow through all of our reducers until it finds one that is responsible for the piece of state we are looking to update. The reducer will update that piece of state in the way specified by the dispatched action and return it. That probably seems like a lot, but it will make sense as we begin to write some code. 

An important note, the application state provided by Redux is totally separate from our component's state, so we need to make sure to not confuse one with the other. Also, sometimes we only need to use the component's state and this is fine as well. Every state change does not need to flow through Redux.

## Releases

### Release 0
We'll need to start by adding a couple of libraries. From our root directory let's run the following commands.
* `yarn add redux --save`
* `yarn add react-redux --save`
* `yarn add redux-promise --save`
The first item is self explanatory, this adds the Redux library to our project. The second, React-Redux provides bindings for React that we will be able to use in our components. The third Redux-Promise is middleware that we will use when making our database calls. We'll get into that a little more later.

These libraries are now listed as dependencies in our package.json and yarn.lock files.

Now that we have our libraries in place, let's write our first reducer!
### Release 1: Creating Our Reducers
On page load we're currently making a database call and updating our Comment Container's state with all of our comments. Let's update that so we're getting our comments from Redux. 

The first thing we need to do is set up a reducer. A reducer sounds fancy, but it's just a function that returns a piece of the application's state.

Let's start by creating a `/reducers` folder in our `/javascript` directory.

We want to create a `commentReducer.js` file in the `/reducers` folder and in that file add a function that returns our comments.

The reducer function is going to take two arguments, state and an action. We'll get to the action in a bit. State will be the application's state we're concerned with in this reducer.

 We'll give it a default value for the first time it's called and for now we'll just return a static comment to make sure everything is wired up correctly.

``` JavaScript
export default ( state = [], action) => {
  return [{id: 1, author: "me!", body: "from the reducer"}]
}
```
Cool, our reducer is there but it's not doing anything. Let's integrate it with React.

### Release 2: Creating A Store And Binding It To Our Components
We need to add those reducers to our application's state and bind them to React. We need to import two things in our CommentContainer. Let's import the createStore function from Redux and the Provider function from React-Redux.
``` JavaScript
import { createStore } from 'redux'
import { Provider } from 'react-redux';
```
As the name implies, `createStore` will allow us to create a store which will be our application's state and `Provider` will give us a binding for that state in our React components.

Let's add them in our comment container.

### Release 3: Filling in the Comments Reducer

