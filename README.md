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
We need to add those reducers to our application's state and bind them to React. Let's import the createStore function from Redux and the Provider component from React-Redux into our `index.js` file.
``` JavaScript
import { createStore } from 'redux'
import { Provider } from 'react-redux';
```
And we'll need access to the reducer we just created so let's import that as well.
``` JavaScript
import commentReducer from '../reducers/commentReducer'
```
As the name implies, `createStore` will allow us to create a store which will be our application's state and `Provider` will give us a binding for that state in our React components.

Let's start by creating a store. Because we currently only have one reducer we'll just use that one. We will usually have more than one reducer and will combine them. We'll refactor later to see what that would look like, but again let's stick to the most simple implementation.
``` JavaScript
const store = createStore(commentReducer)
```
And we need to wrap our top level component in a `Provider` and pass in the store as a prop.
``` JavaScript
class CommentIndex extends Component {
  render() {
    return (
      <Provider store={store}>
        <CommentsContainer />  
      </Provider>
    )
  }
}
```
The top of our component tree now has access to the redux application state, so let's use it!

In `CommentsContainer` we need to add a function called `mapStateToProps`, this is expected by `react-redux`. Because our only piece of state is the commentsReducer we'll set the value comments to that.

``` JavaScript
function mapStateToProps(state) {
  return {
    comments: state
  }
}
```
Now we need to import the `connect` function from `react-redux` in our `CommentsContainer`. 
``` JavaScript
import { connect } from 'react-redux';
```
And change the way we're exporting our component to use the `connect` function
``` JavaScript
export default connect(mapStateToProps)(CommentsContainer);
```

Voila! If we inspect the props on our `CommentsContainer` we can see the value passed in from our reducer as the `comments` prop.

And if we just change the prop passed in to our `Comments` component to use the comments from props rather that the component state we're displaying comments using Redux!
``` JavaScript
<Comments comments={this.props.comments} deleteComment={deleteComment.bind(this)} />
```
### Release 3: Creating Our First Action
Right now we have a reducer that is returning a particular piece of state 
and this is happening every time Redux looks through our reducers. But we need to tell Redux to update that state only when we want. We'll do this by creating an action.

Let's create an `/actions` folder in our `/javascript` directory and in that foler create an `index.js` file.

In our `actions/index.js` we can create our first action. 

Let's start by cerating a const called FETCH_COMMENTS. This will be our action's type. We're setting it to a const here so it's only defined in one place and we can import it where we need to use it.
``` JavaScript
export const FETCH_COMMENTS = "FETCH_COMMENTS"
```
Now we can create our action. This will be a function named `fetchComments` and it will return an object that has two keys, a type and a payload. 

The value for type will be FETCH_COMMENTS and this is how Redux will know which action to dispatch. We will tell it the type and it will look for a match as it flows through the reducers.

The payload will be the static comment that previously lived in our reducer. When we're done our index.js file will look like this.

``` JavaScript
export const FETCH_COMMENTS = "FETCH_COMMENTS"

export function fetchComments() {
  return {
    type: FETCH_COMMENTS,
    payload: [{id: 1, author: "me!", body: "from the reducer"}]
  }
}
```
Our action is set up which is awesome, but our reducer still always returns it's piece of state every time. Let's tie these together.

We'll start by importing FETCH_COMMENTS from our `/actions/index.js` file.
``` JavaScript
import { FETCH_COMMENTS } from '../actions/index'
```
Our reducer has a second argument of action and that's what we're going to use. We'll add a switch statement that checks the action type and returns it's payload when there's a match. In this case it will be the static comment we created.
``` JavaScript
export default ( state = [], action) => {
  switch(action.type){
    case FETCH_COMMENTS:
    return action.payload
  }
  return state
}
```
Ok our reducer is all set up to only return state when a particular action is dispatched, but now our page doesn't work. That's because we've only created the action and aren't dispatching it anywhere! Let's get to release 4 to see how we can do that.
### Release 4: Dispatching an action
Let's dispatch that action from our `CommentsContainer` component.

### Release 5: Making The commentReducer Dynamic
We're loading our comments from Redux and that's awesome but not super useful when the reducer is just returning a static value. Let's get set up to get the comments from the database.

Luckily we already have a client set up so just a few changes will get us rolling!


