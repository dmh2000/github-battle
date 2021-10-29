# Component Life Cycle

- mount

  - **constructor**
    - set initial state
  - **render**
    - render a dom node
    - must be a pure function
  - **componentDidMount**
    - make an ajax request
    - any one time operation
    - async operations
    - set up listeners

- updating

  - **componentDidUpdate(prevProps,prevState)**
    - updated state or props
    - not called on initial render
    - refetch data
    - reset listeners

- unmounted

  - **componentWillUnmount**
    - ABOUT to be removed from DOM
    - any cleanup
    - remove listeners
      - avoids memory leaks
    -
