import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  const deleteNote = props.onDelete;

  function removeNote(event) {
    event.preventDefault();
    deleteNote(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <div className="delete">
        <button onClick={removeNote}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Note;
