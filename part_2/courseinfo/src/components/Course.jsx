const Header = (props) => {
  return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
  )
}
const Part = (props) => {
	console.log('props');
  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}
const Content = ({course}) => {
	console.log(course.parts);
  return (
    <div>
      {course.parts.map((part) => 
			<Part key = {part.id} part = {part}/>)}
    </div>
  )
}
const Total = ({course}) => {
	const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      Total of exercises {total} 
    </div>
  )
}
const Course = (props) => {
    return (
    <div>
      <Header course={props.course}/>
      <Content course={props.course}/>
      <Total course={props.course}/>
    </div>
  )
}

export default Course