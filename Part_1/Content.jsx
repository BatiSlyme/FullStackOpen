const Content = (props) => {
    // const maps = props.parts.map(f =>
    //     <p key={f.part}>{f.part} {f.exercises}</p >
    // );
    console.log(props);
    return (
        <div>
            <Part part={props.part1.name} exercises={props.part1.exercises} />
            <Part part={props.part2.name} exercises={props.part2.exercises} />
            <Part part={props.part3.name} exercises={props.part3.exercises} />
        </div>
    );
}

export default Content;

const Part = (props) => {
    console.log(props);
    return (
        <div>
            <p>{props.part} {props.exercises}</p >
        </div >
    );
}