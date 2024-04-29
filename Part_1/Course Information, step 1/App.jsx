import Content from "./Content"
import Header from "./Header"
import Total from "./Total"

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  // return (
  //   <div>
  //     <h1>{course}</h1>
  //     <p>
  //       {part1} {exercises1}
  //     </p>
  //     <p>
  //       {part2} {exercises2}
  //     </p>
  //     <p>
  //       {part3} {exercises3}
  //     </p>
  //     <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  //   </div>
  // )
  return (
    <div>
      <Header course={course} />
      <Content parts={
        [{ exercises: exercises1, part: part1 },
        { exercises: exercises2, part: part2 },
        { exercises: exercises3, part: part3 }]
      } />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App

