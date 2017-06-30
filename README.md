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
