import Part from './Part.jsx'

const Content = ({ course }) => {
  const { parts } = course
  return (
    <>
      {parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)}
    </>

  )
}

export default Content
