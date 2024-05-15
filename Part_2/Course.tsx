const Course = ({ courses }) => {
    console.log('courses', courses);

    return (
        courses.map(f => {
            console.log(f);
            return (
                <div key={f.id}>
                    <h1>{f.name}</h1>
                    {f.parts.map((p, i) => <div key={i}>{p.name} {p.exercises}</div>)}
                    {'total of ' + f.parts.reduce((sum, order) => sum + order.exercises, 0) + ' exercises'}
                </div >
            );

        })
    );


}

export default Course;