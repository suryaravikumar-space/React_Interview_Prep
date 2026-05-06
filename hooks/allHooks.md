
# React Hooks — Interview-Ready Guide

> Each hook is explained in ~1 minute verbal delivery style, with syntax, real usage, and the problem it solves.

---

## 1. `useState`

### What Problem Does It Solve?
Before hooks, functional components were "dumb" — they couldn't hold any local state. You had to convert them to class components just to track a counter or a form value. `useState` brings local, reactive state directly into functional components.

### Syntax
```jsx
const [state, setState] = useState(initialValue);
```

### Real Usage
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

### How to Explain It
> "useState lets a functional component remember a value between renders. Every time I call setState, React re-renders the component with the new value. The initial value is only used on the first render. I can store anything — numbers, strings, booleans, objects, arrays. One gotcha: if state is an object, I must spread the old state when updating to avoid losing other fields."

### Drawback It Solves
Eliminates the need for class components just to manage local UI state.

---

## 2. `useEffect`

### What Problem Does It Solve?
Functional components had no lifecycle methods. `useEffect` replaces `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` — it lets you run side effects (API calls, subscriptions, timers, DOM manipulation) after render.

### Syntax
```jsx
useEffect(() => {
  // side effect logic
  return () => {
    // cleanup (optional)
  };
}, [dependencies]);
```

### Real Usage
```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));

    return () => {
      // cancel fetch / cleanup if userId changes
    };
  }, [userId]); // re-runs only when userId changes

  return <div>{user?.name}</div>;
}
```

### Dependency Array Rules
| Dependency Array | Behavior |
|---|---|
| Not provided | Runs after every render |
| `[]` empty | Runs once (like componentDidMount) |
| `[a, b]` | Runs when a or b changes |

### How to Explain It
> "useEffect is where I put anything that talks to the outside world — APIs, event listeners, timers. The dependency array controls when it fires. If I return a function from it, React calls that as cleanup before the next effect runs or before unmount — perfect for unsubscribing from sockets or clearing intervals."

### Drawback It Solves
No more class lifecycle methods — side effects are co-located with the state they depend on.

---

## 3. `useCallback`

### What Problem Does It Solve?
Every render, functions inside a component are re-created as new references. When you pass a function to a child component (especially a memoized one), the child re-renders unnecessarily because the function reference changed even though its logic didn't. `useCallback` memoizes the function itself.

### Syntax
```jsx
const memoizedFn = useCallback(() => {
  // function logic
}, [dependencies]);
```

### Real Usage
```jsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // stable reference — won't change between renders

  return <Child onClick={handleClick} />;
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click</button>;
});
```

### How to Explain It
> "useCallback returns a memoized version of a function. React won't re-create it unless one of the dependencies changes. It's most useful when passing callbacks to memoized child components — without it, even React.memo can't prevent re-renders because the function reference is always new."

### Drawback It Solves
Prevents unnecessary re-renders of child components caused by new function references on every parent render.

---

## 4. `useMemo`

### What Problem Does It Solve?
Expensive calculations run on every render even when inputs haven't changed. `useMemo` memoizes the *return value* of a computation, recomputing only when dependencies change.

### Syntax
```jsx
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]);
```

### Real Usage
```jsx
function ProductList({ products, filterText }) {
  const filtered = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [products, filterText]); // only recalculates when these change

  return filtered.map(p => <ProductCard key={p.id} product={p} />);
}
```

### `useMemo` vs `useCallback`
| Hook | Memoizes |
|---|---|
| `useMemo` | Return **value** of a function |
| `useCallback` | The **function** itself |

### How to Explain It
> "useMemo is for caching computed values — not functions, but the result of calling a function. If I'm filtering a list of 10,000 items on every keystroke, that's wasteful. useMemo ensures the filter only runs when the list or filter text actually changes. It's a performance optimization — I don't use it everywhere, only when I can measure a bottleneck."

### Drawback It Solves
Avoids repeating expensive computations on every render when inputs are unchanged.

---

## 5. `useContext`

### What Problem Does It Solve?
Prop drilling — passing data down through many layers of components even when intermediate components don't need it. `useContext` lets any component in the tree directly consume shared state without prop chains.

### Syntax
```jsx
const value = useContext(MyContext);
```

### Real Usage
```jsx
// 1. Create context
const ThemeContext = createContext("light");

// 2. Provide it at the top
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Layout />
    </ThemeContext.Provider>
  );
}

// 3. Consume it anywhere in the tree
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

### How to Explain It
> "useContext solves prop drilling. Instead of passing a theme, user object, or language setting through 5 layers of components, I put the data in a Context Provider at the top and any child — no matter how deep — can pull it directly. It's not a replacement for Redux or Zustand for complex global state, but for simpler cross-cutting concerns like theme, auth user, or locale, it's perfect."

### Drawback It Solves
Eliminates prop drilling and component coupling for shared/global data.

---

## 6. `useRef`

### What Problem Does It Solve?
Two distinct problems:
1. Accessing DOM elements directly (focus, scroll, measure)
2. Storing a mutable value that persists across renders **without** causing a re-render

### Syntax
```jsx
const ref = useRef(initialValue);
// Access: ref.current
```

### Real Usage — DOM Access
```jsx
function SearchBox() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Focus on mount
  }, []);

  return <input ref={inputRef} />;
}
```

### Real Usage — Mutable Value Without Re-render
```jsx
function Timer() {
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => console.log("tick"), 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
```

### How to Explain It
> "useRef gives me a box — ref.current — that I can read and write without triggering a re-render. It's the go-to for holding a reference to a DOM element, or for storing things like timer IDs, previous values, or flags that don't affect the UI. The key difference from useState: updating ref.current is silent — React doesn't know and doesn't re-render."

### Drawback It Solves
Provides direct DOM access and mutable storage without the re-render overhead of state.

---

## 7. `useReducer`

### What Problem Does It Solve?
When state logic gets complex — multiple sub-values, next state depending on previous state, or many different actions — `useState` becomes messy. `useReducer` brings Redux-style state management locally into a component.

### Syntax
```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

### Real Usage
```jsx
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT": return { ...state, count: state.count + state.step };
    case "DECREMENT": return { ...state, count: state.count - state.step };
    case "SET_STEP":  return { ...state, step: action.payload };
    case "RESET":     return initialState;
    default: throw new Error("Unknown action");
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <input
        type="number"
        onChange={e => dispatch({ type: "SET_STEP", payload: Number(e.target.value) })}
      />
    </>
  );
}
```

### How to Explain It
> "useReducer is useState's more structured sibling. The state transitions live in a pure reducer function, and I dispatch named actions to drive those transitions. This makes complex state predictable and testable — I can unit test the reducer in isolation, completely separate from React. It also makes it easier to track what changed and why."

### Drawback It Solves
Tames complex multi-value state logic that would be unwieldy with multiple `useState` calls.

---

## 8. `useLayoutEffect`

### What Problem Does It Solve?
`useEffect` fires **after** the browser paints, so DOM reads inside it can cause a visible flicker. `useLayoutEffect` fires **synchronously after** DOM mutations but **before** the browser paints — giving you a chance to read layout and synchronously update the DOM before the user sees anything.

### Syntax
```jsx
useLayoutEffect(() => {
  // runs synchronously after DOM update, before paint
}, [dependencies]);
```

### Real Usage
```jsx
function Tooltip({ targetRef }) {
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    const rect = targetRef.current.getBoundingClientRect();
    tooltipRef.current.style.top = `${rect.bottom + 8}px`;
    tooltipRef.current.style.left = `${rect.left}px`;
  }, []);

  return <div ref={tooltipRef} className="tooltip">Info</div>;
}
```

### How to Explain It
> "useLayoutEffect is useEffect but it runs before the browser paints. I use it for measuring DOM elements or positioning things — like tooltips or popovers — where reading layout after paint would cause a visible flash or jump. It's a niche hook; 90% of the time useEffect is correct. But for synchronous DOM measurement before the user sees anything, useLayoutEffect is the right tool."

### Drawback It Solves
Prevents visual flicker when you need to read DOM layout and immediately apply changes before the user sees the screen.

---

## 9. Custom Hooks

### What Problem Does It Solve?
Logic reuse across components. Before hooks, you had render props and HOCs — both complex patterns. Custom hooks let you extract stateful logic into a plain function that can be shared across any component.

### Convention
Must start with `use` prefix. Can call other hooks inside.

### Real Usage
```jsx
// Custom hook — reusable fetch logic
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}

// Use it in any component
function UserPage({ id }) {
  const { data, loading, error } = useFetch(`/api/users/${id}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  return <h1>{data.name}</h1>;
}
```

### How to Explain It
> "Custom hooks are how React promotes code reuse without forcing component wrappers. Any logic I find myself copy-pasting across components — data fetching, form handling, debouncing, window resize tracking — I extract into a custom hook. It starts with 'use' so React knows it can call other hooks inside. It's just a function — no magic — but it keeps my components clean and my logic testable."

### Drawback It Solves
Replaces complex HOC and render prop patterns with simple, composable logic extraction.

---

## Quick Reference Cheat Sheet

| Hook | Use For | Triggers Re-render? |
|---|---|---|
| `useState` | Local reactive state | ✅ Yes |
| `useEffect` | Side effects, lifecycle | No directly |
| `useCallback` | Memoize functions | No |
| `useMemo` | Memoize computed values | No |
| `useContext` | Consume shared context | ✅ Yes (when context changes) |
| `useRef` | DOM refs, mutable values | ❌ No |
| `useReducer` | Complex state logic | ✅ Yes |
| `useLayoutEffect` | Sync DOM measurement | No directly |
| Custom Hook | Reusable logic | Depends on internals |

---

## Interview Tips

1. **Always mention the problem first** — "Before this hook, the problem was..."
2. **Give a concrete use case** — not just "manage state" but "track whether a modal is open"
3. **Know the gotchas** — stale closures in useEffect, object state spreading in useState, over-using useMemo
4. **useCallback + React.memo** — always mention these together, they only work as a pair
5. **useReducer vs useState** — "I reach for useReducer when I have 3+ related state values or complex transitions"
