import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick = {onClick}>{text}</button>


const Statistics = ({text, value}) => {
  let insertedValue = value.toString()
  if (text==='positive') insertedValue+=' %'

  return (
    <tr>
      <td>{text}</td>
      <td>{insertedValue}</td>
    </tr>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    setGood(good+1)
    setTotal(good +bad +neutral +1)
    setAverage((good-bad+1)/(total+1))
    setPositive((good+1)*100/(total+1))
    }
    
  const increaseBad = () => { 
    setBad(bad+1)
    setTotal(good +bad +neutral +1)
    setAverage((good-bad-1)/(total+1))
    setPositive((good)*100/(total+1))
    }
      
  const increaseNeutral =() => { 
    setNeutral(neutral+1)
    setTotal(good +bad +neutral +1)
    setAverage((good-bad)/(total+1))
    setPositive((good)*100/(total+1))
    }

  if (total===0) return(
    <div>
      <h1>give feedback</h1>
      <Button onClick = {increaseGood} text = 'good'></Button>
      <Button onClick = {increaseNeutral} text = 'neutral'></Button>
      <Button onClick = {increaseBad} text = 'bad'></Button>

      <h1>statistics</h1>

      No feedback given



    </div>
  )
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {increaseGood} text = 'good'></Button>
      <Button onClick = {increaseNeutral} text = 'neutral'></Button>
      <Button onClick = {increaseBad} text = 'bad'></Button>

      <h1>statistics</h1>

      <table>
        <tbody>
          <Statistics text = 'good' value ={good}></Statistics>
          <Statistics text = 'neutral' value ={neutral}></Statistics>
          <Statistics text = 'bad' value ={bad}></Statistics>
          <Statistics text = 'all' value ={total}></Statistics>
          <Statistics text = 'average' value ={average}></Statistics>
          <Statistics text = 'positive' value ={positive}> </Statistics>
        </tbody>
      </table>


    </div>
  )
}

export default App