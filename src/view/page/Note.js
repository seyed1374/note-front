import noteActions from "../../context/note/noteActions"
import {useContext, useEffect, useState} from "react"
import {NoteContext} from "../../context/note/noteReducer"
import NotePanel from "../component/note/NotePanel"
import NoteMain from "../component/note/NoteMain"

function Note()
{
    const {state: {list, keys}, dispatch} = useContext(NoteContext)
    const notes = keys.reduce((sum, _id) => [...sum, list[_id]], [])
    const [activeNoteId, setActiveNoteId] = useState(null)
    const activeNote = list[activeNoteId]

    useEffect(() =>
    {
        noteActions.getNotes({dispatch})
    }, [])

    return (
        <div className="note">
            <NotePanel activeNote={activeNote} setActiveNoteId={setActiveNoteId} notes={notes}/>
            <NoteMain activeNote={activeNote} setActiveNoteId={setActiveNoteId}/>
        </div>
    )
}

export default Note