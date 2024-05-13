const Course = ({ course }) => {
    console.log(course);

    return (
        course.parts.map(f =>
            <div key={f.id}>
                {f.name} {f.exercises}
            </div>
        )
    );

}

export default Course;