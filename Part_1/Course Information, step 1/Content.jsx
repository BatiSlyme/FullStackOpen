const Content = (props) => {
    // const maps = props.parts.map(f =>
    //     <p key={f.part}>{f.part} {f.exercises}</p >
    // );

    return (
        <div>
            <Part part={props.parts[0].part} exercises={props.parts[0].exercises} />
            <Part part={props.parts[1].part} exercises={props.parts[1].exercises} />
            <Part part={props.parts[2].part} exercises={props.parts[2].exercises} />
        </div>
    );
}

export default Content;

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises}</p >
        </div >
    );
}