## React Hooks Reference

### State
| Hook | Syntax |
|---|---|
| `useState` | `const [state, setState] = useState(initialValue)` |
| `useReducer` | `const [state, dispatch] = useReducer(reducer, initialArg)` |
| `useActionState` ⭐ | `const [state, action, isPending] = useActionState(fn, initialState)` |

### Context
| Hook | Syntax |
|---|---|
| `useContext` | `const value = useContext(MyContext)` |
| `use` ⭐ | `const value = use(resource)` |

### Ref
| Hook | Syntax |
|---|---|
| `useRef` | `const ref = useRef(initialValue)` |
| `useImperativeHandle` | `useImperativeHandle(ref, () => ({ method }), [deps])` |

### Effect
| Hook | Syntax |
|---|---|
| `useEffect` | `useEffect(() => { ... return cleanup }, [deps])` |
| `useLayoutEffect` | `useLayoutEffect(() => { ... return cleanup }, [deps])` |
| `useInsertionEffect` | `useInsertionEffect(() => { ... return cleanup }, [deps])` |

### Performance
| Hook | Syntax |
|---|---|
| `useMemo` | `const memoized = useMemo(() => compute(a, b), [a, b])` |
| `useCallback` | `const memoizedFn = useCallback(() => { ... }, [deps])` |
| `useTransition` | `const [isPending, startTransition] = useTransition()` |
| `useDeferredValue` | `const deferred = useDeferredValue(value)` |

### Other
| Hook | Syntax |
|---|---|
| `useId` | `const id = useId()` |
| `useOptimistic` ⭐ | `const [optimistic, addOptimistic] = useOptimistic(state, updateFn)` |
| `useFormStatus` ⭐ | `const { pending, data, method, action } = useFormStatus()` |
| `useSyncExternalStore` | `const snapshot = useSyncExternalStore(subscribe, getSnapshot)` |
| `useDebugValue` | `useDebugValue(value, format?)` |

> ⭐ New in React 19
