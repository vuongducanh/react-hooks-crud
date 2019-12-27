import React, { useState, useMemo, useCallback, useEffect } from 'react';

function UseMemo() {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  const words = ['This', 'is', 'React', 'Application', 'for', 'Testing', 'By', 'Priyanka']
  const word = words[wordIndex]

  const computeLetterCount = (word) => {
    let i = 0;
    while (i < 200000000) i++
    return word.length;
  };

  const handleChangeCount = (count) => {
    return count
  }

  const letterCount = useMemo(() => computeLetterCount(word), [word]);

  const onChangeCount = useCallback(() =>
    handleChangeCount(count)
    , [count])

  useEffect(() => {
    console.log('components use-memo')
  },[])

  return (
    <div>
      <div style={{ padding: '15px' }}>
        <h2>Compute number of letters (slow)</h2>
        <p>"{word}" has {letterCount} letters</p>
        <button
          onClick={() => {
            const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
            setWordIndex(next);
          }}
        >
          Next word
                </button>

        <h2>Increment a counter (fast)</h2>
        <p>Counter: {count}</p>
        <p>change Count{onChangeCount()}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  )
}

export default UseMemo;
