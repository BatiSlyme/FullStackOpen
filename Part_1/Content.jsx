const Content = (props) => {
    const maps = props.parts.map((f, i) =>
        <p key={i}>{f.name} {f.exercises}</p >
    );
    console.log(props);
    return (
        maps
    );
}

export default Content;

// const Part = (props) => {
//     console.log(props);
//     return (
//         <div>
//             <p>{props.part} {props.exercises}</p >
//         </div >
//     );
// }