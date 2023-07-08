function FlexContainer(props) {

    const styles = {
        display: "flex",
        flexWrap: "wrap",
        width: "90%",
        margin: "auto", 
        justifyContent: "space-between",            
        ...props.styles
    } 

    return <div style = {styles}>
        {props.children}
    </div>
}

export default FlexContainer