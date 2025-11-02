
const Card = (props) => {

    return(
        <div className="feature-card">
            <props.iconType size={props.size} />
            <h3>{props.title}</h3>
            <p>{props.text}</p>
        </div>
    )

}

export default Card;