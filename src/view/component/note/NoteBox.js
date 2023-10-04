function NoteBox({setActiveNoteId, note_id, data: {title, text, _id}})
{
    function onNoteClick(item)
    {
        return function ()
        {
            setActiveNoteId(item._id)
            console.log("ok")
        }
    }

    return (
        <div className={`note-panel-note-box ${note_id === _id ? "active" : ""}`} onClick={onNoteClick}>
            <div className="note-panel-note-box-title">{title || "empty note"}</div>
            <div className="note-panel-note-box-text">{text || "‌"}</div>
        </div>
    )
}

export default NoteBox