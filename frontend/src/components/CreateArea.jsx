import { useRef, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const addNote = props.onAdd;
  const ref = useRef(null);
  const [state, setState] = useState(false); //to add collapse effect to the textarea
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    /**
     * Change the state to false if clicked on outside of element
     */
    function handleClickOutside(event) {
      //add exception to the delete button
      if (ref.current && !ref.current.contains(event.target) && !event.target.matches("path")) {
        setState(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  //to add notes to the array
  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  //when we click the text area it collapses, this function is to make the state for that inncident
  function handleClick() {
    setState(true);
  }

  //to handle the submit(add) button
  const handleSubmit = (event) => {
    event.preventDefault(); //preventing fromm goint to "localhost:3000/add" because "/add" is refered to API
    addNote(note); //passing note to backend (this function came from props)
    setNote({
      //setting the input fields to blank after submitting a note
      title: "",
      content: "",
    });
  };

  return (
    <div>
      <form ref={ref} action="/add" method="POST" className="create-note">
        {state && (
          <input
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          value={note.content}
          rows={state ? 3 : 1}
          onChange={handleChange}
          onClick={handleClick}
        />
        <Zoom in={state}>
          <Fab type="submit" onClick={handleSubmit}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
