/*
Reusable hooks that start with use (useX)

Example hook
export function useCounter(initial: number = 0) {
  const [count, setCount] = useState(initial);

  function increment(){
    setCount(c => c + 1); 
  }
  function decrement(){
    setCount(c => c - 1)
  }

  return {
    count,
    increment,
    decrement,
  };
}

*/
