# onClick: Why the Arrow Function Matters

## The Problem

```jsx
// ❌ WRONG — infinite re-renders
<button onClick={setCount(count + 1)}>Click me</button>

// ✅ CORRECT — runs only on click
<button onClick={() => setCount(count + 1)}>Click me</button>
```

---

## What's Actually Happening

### ❌ Without Arrow Function — `onClick={setCount(count+1)}`

This is a **function call**, not a function. JavaScript executes it **immediately during render**.

1. React renders the component
2. `setCount(count+1)` runs right now — during render
3. State changes → triggers a re-render
4. Re-render runs `setCount` again → another re-render
5. **Infinite loop → app crashes 💀**

---

### ✅ With Arrow Function — `onClick={() => setCount(count+1)}`

The `() =>` wrapper turns it into a **function definition**. React stores the reference and waits.

1. React renders the component
2. `onClick` receives a function reference — nothing runs yet
3. User clicks the button
4. Only **then** does `setCount` run
5. State updates → controlled, expected re-render ✓

---

## Simple Analogy

| Code | Real-world equivalent |
|---|---|
| `setCount(count+1)` | Ordering pizza **right now** |
| `() => setCount(count+1)` | Handing someone a menu and saying **"order when you're ready"** |

---

## How to Explain It in the Interview

> *"In JSX, `onClick` expects a **function reference**, not a return value. Without the arrow function, JavaScript evaluates `setCount(count+1)` inline during render, which triggers a state update, which causes another render — an infinite loop. The arrow function wraps it so it only runs on click."*

---

## Key Rule to Remember

> **JSX event handlers always need a function — something to call later, not a value that runs now.**

```jsx
// ❌ All of these run immediately during render
onClick={setCount(count + 1)}
onClick={console.log("clicked")}
onClick={doSomething()}

// ✅ All of these are safe — run only on click
onClick={() => setCount(count + 1)}
onClick={() => console.log("clicked")}
onClick={doSomething}          // passing reference (no parentheses)
```
