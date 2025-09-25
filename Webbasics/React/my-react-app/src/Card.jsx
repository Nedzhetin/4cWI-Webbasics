
function Card(props) {

    return (
        <div>
            <div className="flex bg-blue-400 h-40 w-40 justify-center items-center">
                <h1 className="text-xl"> {props.hello} {props.text}</h1>
            </div>
        </div>
    )
}

export default Card
