import DeleteSvg from "../../media/svg/DeleteSvg"
import WriteSvg from "../../media/svg/WriteSvg"
import noteActions from "../../context/note/noteActions"
import {useContext, useEffect, useState} from "react"
import {NoteContext} from "../../context/note/noteReducer"

function Note()
{
    const {state: {list, keys, note_id}} = useContext(NoteContext)
    const notes = keys.reduce((sum, _id) => [...sum, list[_id]], [])
    const {dispatch} = useContext(NoteContext)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [activeNoteId, setActiveNoteId] = useState(null)
    const activeNote = list[activeNoteId]

    useEffect(() =>
    {
        noteActions.getNotes({dispatch})
    }, [])

    function onTitleChange(e)
    {
        setTitle(e.target.value)
    }

    function onTextChange(e)
    {
        setText(e.target.value)
    }

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

    function onDeleteClick()
    {
        noteActions.deleteNote({data: {note_id}, dispatch})
            .then(() =>
            {
                console.log("ok")
            })
            .catch(() =>{
                console.log("error")
            })
    }

    function onNoteClick(item)
    {
        return function ()
        {
            setActiveNoteId(item._id)
        }
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

    return (
        <div className="note">
            <div className="note-panel">
                <div className="note-panel-header">
                    {activeNote && <DeleteSvg className="note-panel-header-delete" onClick={onDeleteClick}/>}
                </div>
                <div className="note-panel-detail">
                    {
                        notes.map(item =>
                            <div key={item._id} className="note-panel-note-box" onClick={onNoteClick(item)}>
                                <div className="note-panel-note-box-title">{item.title || "empty note"}</div>
                                <div className="note-panel-note-box-text">{item.text || "‌"}</div>
                            </div>,
                        )
                    }
                </div>
            </div>
            <div className="note-border"></div>
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
        </div>
    )
}

export default Note