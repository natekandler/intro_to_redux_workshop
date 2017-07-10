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
To utilize the action, we'll need to dispatch it from our `CommentsContainer` component to let Redux know when we want that piece of state updated. 
We can start by importing our action from the `/actions/index.js` file.
``` JavaScript
import { fetchComments } from '../actions/index';
```
We're also going to need to import a function from redux.
``` JavaScript
import { bindActionCreators } from 'redux';
```
And create another function at the bottom of our component called mapDispatchToProps. This is also expected by react-redux. It will take dispatch as an argument and will return the `bindActionCreators` function with an object of the actions we want to dispatch and dispatch as the second argument.
// How do I explain what dispatch is here?
``` JavaScript
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchComments}, dispatch)
}
```
And update our export by passing `mapDispatchToProps` as a second argument to `connect`
``` JavaScript
export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
```
Now the `fetchComments` action is available on the components prop and in this case we can just dispatch it when the component mounts.
``` JavaScript
componentDidMount() {
  this.props.fetchComments()
}
```
There we go! When our component mounts, the fetchComments action is dispatched. It's type FETCH_COMMENTS matches our case statement in our reducer and the payload is returned.

However that payload is still our static comment, so let's make it dynamic!
### Release 5: Calling The Database From An Action
Because of the way we have set everything up we only need to make a couple of changes in our action and client to get information from the database.

First let's update our action. Currently our payload is static data so this is where we have to make the change. Let's import our `getComments` function from the client and set that as the value for our payload.

``` JavaScript 
import { getComments } from '../client/CommentClient'

export function fetchComments() {
  return {
    type: FETCH_COMMENTS,
    payload: getComments()
  }
}
```
Cool! One more issue, we've added the redux-promise middleware to help with async calls in our actions. As the name suggests, it's expecting to receive a promise. We just need to update our client and remove the second `.then` call where we're setting state. The `return response.json()` line will parse our readStream into a promise that redux-promise can use
``` JavaScript
export function getComments() {
  return fetch('/comments.json')
  .then((response) => {
    return response.json();
  }) 
};
```
And we're fetching dynamic information with redux! Let's set it up so that we can create a comment as well.
### Release 6: Creating A Comment
Currently to create a comment we need to define the function in the top level component and pass it in to our form. If we are using redux's application state, we can create an action and then dispatch it from the form itself. 

In our `/actions/index.js` folder let's create an action called `createNewComment`. This is going to use the `createComment` function from our `CommentClient` so let's go ahead and import that.
``` JavaScript
import { getComments, createComment } from '../client/CommentClient'
```
And let's create another const we can export for the create action
``` JavaScript
export const CREATE_COMMENT = "CREATE_COMMENT"
```
For the action itself, this time it is going to take an argument. This will be the data we've entered in the new comment form that the `createComment` function in our client expects.

Just like the in the `fetchComments` action, the type will be the const we created. The payload will be the response from our 'createComment` function.
``` JavaScript
export function newComment(commentData) {
  return {
    type: CREATE_COMMENT,
    payload: createComment(commentData)
  }
}
```
Because redux-promise is expecting a promise in the payload we will need to update the `createComment` function in our client just like we had to update `getComments`.
``` JavaScript
export function createComment(newComment) {
  let token = document.head.querySelector("[name=csrf-token]").content;
  let body = JSON.stringify({comment: newComment});
  return fetch('/comments', {
    method: 'post',
    body: body,
    headers: {
      'X-CSRF-Token': token,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then((response) => {
    return response.json()
  })
}
```
We need to add a case for the `CREATE_COMMENT` type to our `commentReducer`. We need to return the current array of comments with our new comment added. We don't want to mutate the state directly so we can use the es6 spread operator to create a new array with the old array's contents.
``` JavaScript
export default ( state = [], action) => {
  switch(action.type){
    case FETCH_COMMENTS:
      return action.payload
    case CREATE_COMMENT:
      return [...state, action.payload];
  }
  return state
}
```
Don't forget to import the `CREATE_COMMENT` const.
``` JavaScript
import { FETCH_COMMENTS, CREATE_COMMENT } from '../actions/index'
```
Let's update our components to use everything we've created!

First we can remove the `handleFormSubmit` function from our `CommentsContainer`. This is going to be handle by the form itself. 

Now we'll only be passing `hideCommentForm` as a prop to our `Form` component. 
``` JavaScript
return <Form hideCommentForm={this.hideCommentForm.bind(this)} />
```
In our form component, we'll need to import the getFormValues function from utils as well as the `newComment` action we created, the `connect` function from react-redux, and `bindActionCreators` from redux.
``` JavaScript
import { getFormValues } from '../Utils/utils'
import { createNewComment } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
```
We need to define a new `handleFormSubmit` function in our `Form` component. It will process the form data into key/value pairs and dispatch our `newComment` action as well as calling the `hideCommentForm` function we passed in from our `CommentsContainer`.
``` JavaScript
handleFormSubmit(event) {
  event.preventDefault();
  let newComment = getFormValues(event.target)
  newComment.author = newComment.author ? newComment.author : "anonymous"
  if(newComment.body){
    this.props.createNewComment(newComment)
    this.props.hideCommentForm(event)
  }
}
```
Let's not forget to add that to the submit event of our form element.
``` JavaScript
<form className="Form" onSubmit={this.handleFormSubmit.bind(this)}
```
And we'll need a `mapDispatchToProps` function as well as an updated export.
``` JavaScript
function mapDispatchToProps(dispatch) {
  return bindActionCreators({createNewComment}, dispatch)
}

export default connect(null, mapDispatchToProps)(Form);
```
Notice in our export we're passing `null` in as the first argument. This is because `connect` expects `mapStateToProps` as a first argument and if we're not providing that we need to pass null so `mapDispatchToProps` is still our second argument.

And we're creating new comments! But we're also going to want to have the ability to delete them. Let's move to release 7 and add that ability.
### Release 7: Deleting Comments
Our `Comment` component is functional and we want to keep it that way. Let's redefine the delete comment function in our `CommentsContainer` to update the redux application state.

From our previous work we know what we need to do, create an action, add a reducer that handles that action's type, and dispatch that action from a component.

First let's add our action. As before we're going to import the database call from our client and define a const for the action type.

``` JavaScript
import { getComments, createComment, deleteCommen from '../client/CommentClient'

export const DELETE_COMMENT = "DELETE_COMMENT"
```
Then we'll define the action itself.
``` JavaScript
export function removeComment(id) {
  return {
    type: DELETE_COMMENT,
    payload: deleteComment(id)
  }
}
```
Now let's import our type and add a a case in our `commentReducer`
``` JavaScript
import { FETCH_COMMENTS, CREATE_COMMENT, DELETE_COMMENT } from '../actions/index'

case DELETE_COMMENT:
  return state.filter(function(comment){
    return comment.id != action.payload.id
  })
```
Here we're filtering and returning all of the comments that don't match the id of the comment we just deleted.


Let's update the 'deleteComment' function in our client to just return a promise. We can remove that function that handles updating the state, it will be taken care of by redux.
``` JavaScript
export function deleteComment(id) {
  let token = document.head.querySelector("[name=csrf-token]").content;

  return (
    fetch(`comments/${id}.json`, {
      method: 'delete',
      body: JSON.stringify({"id": id}),
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((response) => {
      return response.json()
    })
  )
}
```
Now we can import our `removeComment` action in our `CommentContainer`
``` JavaScript
import { fetchComments, removeComment } from '../actions/index';
```
Add it to our `mapDispatchToProps`
``` JavaScript
function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchComments, removeComment}, dispatch)
}
```
And finally update the function we're passing through to be our redux function.
``` JavaScript
<Comments comments={this.props.comments} deleteComment={this.props.removeComment.bind(this)} />
```
And that's it! We have a functioning comment section with redux helping tomanage our state. 
