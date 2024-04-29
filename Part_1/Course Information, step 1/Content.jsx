const Content = (props) => {
    const maps = props.parts.map(f =>
        <p key={f.part}>{f.part} {f.exercises}</p >
    );

    return (
        <div>
            {maps}
        </div>
    );
}

export default Content;