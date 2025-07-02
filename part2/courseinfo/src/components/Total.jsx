
const Total = ({ course }) => {

  const arrayTotalExercises = [];
  const arrayCourseParts = Object.values(course.parts);
  arrayCourseParts.forEach((part) => {
    arrayTotalExercises.push(part.exercises);
  });
  const totalExercises = arrayTotalExercises.reduce((a, b) => {
    return a + b;
  });

  return (
    <>
      <p><strong>Number of exercises {totalExercises}</strong></p>
    </>
  )
}

export default Total
