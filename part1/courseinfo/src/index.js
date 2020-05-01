import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const course = "Half Stack application development";
    const parts = [
        {
            name: "Fundamentals of React",
            exercises: 10,
        },
        {
            name: "Using props to pass data",
            exercises: 7,
        },
        {
            name: "State of a component",
            exercises: 14,
        },
    ];

    const Header = (props) => {
        console.log("header props", props);
        return <h1>{props.course}</h1>;
    };
    const Parts = ({ parts }) => {
        return (
            <p>
                {parts.name}
                {parts.exercises}
            </p>
        );
    };
    const Content = (props) => {
        return (
            <div>
                <Parts parts={props.parts[0]} />
                <Parts parts={props.parts[1]} />{" "}
                <Parts parts={props.parts[2]} />
            </div>
        );
    };

    const Total = ({ parts }) => {
        return (
            <>
                Total exercises :
                {parts[0].exercises + parts[1].exercises + parts[2].exercises}
            </>
        );
    };
    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
