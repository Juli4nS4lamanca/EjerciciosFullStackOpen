import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : ((good * 1) + (bad * -1)) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;

  if (all === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={all} />
          <StatisticLine text='Average' value={average} />
          <StatisticLine text='Positive' value={positive + '%'} />
        </tbody>
      </table>
    </>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;
const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <th>{text}</th>
        <td>{value}</td>
      </tr>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    const updateGood = good + 1;
    setGood(updateGood)
  }

  const handleClickNeutral = () => {
    const updateNeutral = neutral + 1;
    setNeutral(updateNeutral);
  }
  const handleClickBad = () => {
    const updateBad = bad + 1;
    setBad(updateBad);
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={handleClickGood} text='Good' />
      <Button handleClick={handleClickNeutral} text='Neutral' />
      <Button handleClick={handleClickBad} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
