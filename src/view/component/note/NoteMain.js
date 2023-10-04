import WriteSvg from "../../../media/svg/WriteSvg"
import noteActions from "../../../context/note/noteActions"
import {useContext, useEffect, useState} from "react"
import {NoteContext} from "../../../context/note/noteReducer"

function NoteMain({activeNote, setActiveNoteId})
{
    const {dispatch} = useContext(NoteContext)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const note_id = activeNote?._id

    useEffect(() =>
    {
        if (activeNote)
        {
            setTitle(activeNote.title)
            setText(activeNote.text)
        }
    }, [note_id])

    function onAddClick()
    {
        noteActions.addNote({data: {title, text}, dispatch})
            .then(createdNote =>
            {
                setActiveNoteId(createdNote?.data?._id)
            })
            .catch(err =>
            {
                console.log("error")
            })
    }

    function onSaveClick()
    {
        noteActions.updateNote({data: {title, text, note_id}, dispatch})
            .then(() =>
            {
                console.log("ok")
            })
            .catch(() =>
            {
                console.log("error")
            })
    }

    function onTitleChange(e)
    {
        setTitle(e.target.value)
    }

    function onTextChange(e)
    {
        setText(e.target.value)
    }

    return (
        <div className="note-body">
            <div className="note-body-header">
                <WriteSvg className="note-body-header-add-note" onClick={onAddClick}/>
                {activeNote && <button className="note-body-header-btn" onClick={onSaveClick}>save</button>}
            </div>
            {
                activeNote &&
                <div key={activeNote._id} className="note-body-detail">
                    <input className="note-body-title" defaultValue={activeNote.title} onChange={onTitleChange}/>
                    <textarea className="note-body-text" defaultValue={activeNote.text} onChange={onTextChange}/>
                </div>
            }
        </div>
    )
}

export default NoteMain