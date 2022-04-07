


const Change = ({
    data: { changeQuestion, setChangeQuestion, handleNextQuestion },
}) => {
    const handelClick = () => {
        setChangeQuestion(true);
        handleNextQuestion()
    };


return (!changeQuestion) ? (

    <button
        onClick={handelClick()}
    >
        &#9851;</button>
) : (<div>s</div>

);

};
export default Change;