import React from "react"

function CloseCircleSvg({className})
{
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="11.8926" r="10" fill="var(--second-icon-color)"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M15 9L9 15L15 9Z" fill="var(--solid-light)"/>
            <path d="M15 9L9 15" stroke="var(--solid-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M15 15L9 9L15 15Z" fill="var(--solid-light)"/>
            <path d="M15 15L9 9" stroke="var(--solid-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default CloseCircleSvg