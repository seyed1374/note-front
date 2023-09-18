import React from "react"

function ShowValidation({text, isError, noSpace})
{
    return (
        <div className={`validation-err ${noSpace ? "no-space" : ""} ${isError ? "error" : "success"} ${text ? "show" : ""}`}>
            {text}
        </div>
    )
}

export default ShowValidation