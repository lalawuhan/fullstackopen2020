import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistics = ({ good, bad, neutral, average, positive, sum }) => {
    return (
        <>
            {" "}
            {sum ? (
                <>
                    <h1>Statistics</h1>
                    <table>
                        <tbody>
                            <Statistic text="good" value={good} />
                            <Statistic text="bad" value={bad} />
                            <Statistic text="neutral" value={neutral} />
                            <Statistic text="average" value={average} />
                            <Statistic text="positive" value={positive} />
                            <Statistic text="sum" value={sum} />
                        </tbody>
                    </table>
                </>
            ) : (
                <h1>No Feedback</h1>
            )}
        </>
    );
};
const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td> {value}</td>
        </tr>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const Button = ({ onClick, text }) => (
        <button onClick={onClick}>{text}</button>
    );
    const handleGoodClick = () => {
        setGood(good + 1);
    };
    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    };
    const handleBadClick = () => {
        setBad(bad + 1);
    };

    const sum = good + neutral + bad;
    const average = (good - bad) / sum;
    const positive = (good / sum) * 100;

    return (
        <div>
            <h1>Give Feedback</h1>
            <>
                <Button text="good" onClick={handleGoodClick} />
                <Button text="neutral" onClick={handleNeutralClick} />
                <Button text="bad" onClick={handleBadClick} />
            </>

            <Statistics
                positive={positive}
                average={average}
                good={good}
                neutral={neutral}
                bad={bad}
                sum={sum}
            />
        </div>
    );
};
ReactDOM.render(<App />, document.getElementById("root"));
