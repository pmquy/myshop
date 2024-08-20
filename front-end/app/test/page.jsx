'use client'

import { memo, useCallback, useMemo, useState } from "react"

const Test1 = memo(({state1, setState1}) => {
  
  console.log('Test1')

  const factorial = useMemo(() => {
    console.log(state1, 'change')
    const calcFactorial = n => (n <= 1 ? 1 : n * calcFactorial(n - 1));
    return calcFactorial(state1);
  }, [state1]);

  return <div>
    <div>{factorial}</div>
    <button onClick={() => setState1(p => p + 1)}>Click</button>
  </div>
})

Test1.displayName = 'Test1'


const Test2 = memo(({state2, setState2}) => {
  
  console.log('test2')

  return <div>
    <div>{state2}</div>
    <button onClick={() => setState2(p => p + 1)}>Click</button>
  </div>
})

Test2.displayName = 'Test2'


export default function Page() {
  const [state1, setState1] = useState(1)
  const [state2, setState2] = useState(1)
  
  console.log('Page')


  return <div className="p-10">
    <Test1 setState1={setState1} state1={state1}/>
    <Test2 setState2={setState2} state2={state2}/>
  </div>
}