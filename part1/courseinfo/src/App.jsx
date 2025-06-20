import { useState } from 'react'
import viteLogo from '/vite.svg'

const Header = (props) => {
  return(
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Content = ({course}) => {
  const {name, parts} = course
  return(
    <>
      <Part name = {parts[0].name} exercises = {parts[0].exercises} />
      <Part name = {parts[1].name} exercises = {parts[1].exercises} />
      <Part name = {parts[2].name} exercises = {parts[2].exercises} />
    </>

  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  )

}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  console.log(course.parts[0].name)

  return (
    <>
      <Header name={course.name}/>
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App
