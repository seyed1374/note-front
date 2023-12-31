function WriteSvg({className, onClick})
{
    return (
        <svg className={className} onClick={onClick} viewBox="0 0 256 256">
            <path fill="#b5b0b0"
                  d="M243.2,35.4l-22.7-22.7c-3.8-3.8-9.9-3.8-14.2,0.5l-10.9,10.9l36.4,36.4l10.9-10.9C247,45.4,247,39.2,243.2,35.4z M215.8,200.2c0,12.7-10.4,22.7-22.7,22.7H56.3c-12.7,0-22.7-10.4-22.7-22.7V63.3c0-12.7,10.4-22.7,22.7-22.7h90.6L169.6,18H48.2C27,17.5,10,34.5,10,55.7v152.5C10,229,27,246,48.2,246h152.5c21.2,0,38.2-17,38.2-38.2V86l-23.1,23.1L215.8,200.2L215.8,200.2z M226.2,65.7l-36.4-36.4l-80.2,79.8l36.4,36.4L226.2,65.7z M89.8,165.3l51-14.6l-36.4-36.4L89.8,165.3L89.8,165.3z"/>
        </svg>
    )
}

export default WriteSvg