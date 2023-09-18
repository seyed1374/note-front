import DeleteSvg from "../../media/svg/DeleteSvg"
import WriteSvg from "../../media/svg/WriteSvg"
import noteActions from "../../context/note/noteActions"
import {useContext, useEffect, useState} from "react"
import {NoteContext} from "../../context/note/noteReducer"

function Note()
{
    const {state: note} = useContext(NoteContext)
    const {dispatch} = useContext(NoteContext)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    useEffect(() =>
    {
        noteActions.getNotes({dispatch})
        console.log(note)
    }, [])

    function onTitleChange(e)
    {
        setTitle(e.target.value)
    }

    function onTextChange(e)
    {
        setText(e.target.value)
    }

    function onSaveClick()
    {
        noteActions.addNote({data: {title, text}, dispatch})
            .then(createdNote =>
            {
                console.log("ok")
            })
            .catch(err =>
            {
                console.log("error")
            })
    }

    return (
        <div className="note">
            <div className="note-panel">
                <div className="note-panel-header">
                    <DeleteSvg className="note-panel-header-delete"/>
                </div>
                <div className="note-panel-detail">
                    {
                        Object.values(note).map(item =>
                            <div className="note-panel-note-box">
                                <div className="note-panel-note-box-title">{item.title}</div>
                                <div className="note-panel-note-box-text">{item.text}</div>
                            </div>,
                        )
                    }
                </div>
            </div>
            <div className="note-border"></div>
            <div className="note-body">
                <div className="note-body-header">
                    <WriteSvg className="note-body-header-add-note"/>
                    <button className="note-body-header-btn" onClick={onSaveClick}>save</button>
                </div>
                <div className="note-body-detail">
                    <input className="note-body-title" onChange={onTitleChange}/>
                    <textarea className="note-body-text" onChange={onTextChange}/>
                </div>
            </div>
        </div>
    )
}

export default Note