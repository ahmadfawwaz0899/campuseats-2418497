# Week 1 reflection
 
1. What is the difference between building a UI imperatively (plain DOM code) and 
declaratively (React)?
 - Imperative (Plain DOM) is where we can write step by step codes telling the browser how to manually find and mutate the DOM.Meanwhile the declaration (react) is describe what the UI should look like for a given state and React automatically updates the DOM whenever that state will changes.

2. Why must a component name start with a capital letter?
- React uses casing in JSX to distinguish custom components from built-in HTML tags. Lowercase tags basically treated as standard HTML elements, whereas the capitalized names signal to React that it should render a custom component functions.
 
3. What does a fragment <>...</> do, and why not just use a <div>?
- This may allows us to group multiple JSX elements together.Using an unnecessary <div> can clutter the DOM tree and mess up layout styling .
 
4. Name one benefit of splitting the UI into small components.
- It is more reusability and maintainability, when we put it into more specific and small components, it can be reused accross different parts of an application and are significantly easier to read,test, debug and maintain.