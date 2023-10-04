import DeleteSvg from "../../../media/svg/DeleteSvg"
import Icon from "../../../media/note-icon.png"
import {useContext, useState} from "react"
import noteActions from "../../../context/note/noteActions"
import {NoteContext} from "../../../context/note/noteReducer"
import NoteBox from "./NoteBox"

function NotePanel({notes, activeNote, setActiveNoteId})
{
    const {dispatch} = useContext(NoteContext)
    const [showModal, setShowModal] = useState(false)
    const note_id = activeNote?._id

    function toggleModal()
    {
        setShowModal(showModal => !showModal)
    }

    function onDeleteClick()
    {
        noteActions.deleteNote({data: {note_id}, dispatch})
            .then(() =>
            {
                toggleModal()
            })
            .catch(() =>
            {
                console.log("error")
            })
    }


    return (
        <>
            <div className="note-panel">
                <div className="note-panel-header">
                    {activeNote && <DeleteSvg className="note-panel-header-delete" onClick={toggleModal}/>}
                </div>
                <div className="note-panel-detail">
                    {
                        notes.map(item =>
                           <NoteBox setActiveNoteId={setActiveNoteId} data={item} key={item._id} note_id={note_id}/>
                        )
                    }
                </div>
            </div>

            {
                showModal &&
                <div className="delete-modal">
                    <img className="delete-modal-img" src={Icon} alt=""/>
                    <div className="delete-modal-qus">Are you sure you want to delete the selected note?</div>
                    <div className="delete-modal-btn">
                        <div className="delete-modal-btn-detail" onClick={toggleModal}>Cancel</div>
                        <div className="delete-modal-btn-detail" onClick={onDeleteClick}>Delete</div>
                    </div>
                </div>
            }
        </>
    )
}

export default NotePanel