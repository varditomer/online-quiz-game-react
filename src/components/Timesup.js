import React from "react";




export default function Timesup({ userName, setTimeOut, handleNextQuestion }) {


    const handleClick = () => {
        setTimeout(() => {
            setTimeOut(false);
            handleNextQuestion();
        }, 1000);
    };

    return (
        <div className="timesup">
            <h1>Time's UP &#128336;! <span className="big"> {userName}</span> Try Faster!</h1>


                <button className="col-6 mt-6 btn btn-dark btn-lg" data-bs-toggle="button"
                    onClick={handleClick}
                >Continue</button>


        </div>

    );
}