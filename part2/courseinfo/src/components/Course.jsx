import Header from './Header.jsx'
import Content from './Content.jsx'
import Total from './Total.jsx'

const Course = ({ courses }) => {

  return (
    <>
      {courses.map(course => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Content course={course} />
            <Total course={course} />
          </div>
        )
      })}
    </>
  )
}

export default Course
