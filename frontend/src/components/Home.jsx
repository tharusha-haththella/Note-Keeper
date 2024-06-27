import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useEffect, useState } from "react";
import Axios from "axios";

function Home() {
  const [notes, setNotes] = useState([]);

  //to run getNotes method at the beginning of page load
  useEffect(() => {
    getNotes();
  }, [notes]); //everytime when the notes array updates the content of the page updates

  //to fetch existing notes from database
  const getNotes = async () => {
    const response = await Axios.get("http://localhost:3000/");
    setNotes(response.data);
  };

  //passing data to backend using axios when the add(submit) button is pressed
  const addNote = async (note) => {
    try {
      const response = await Axios.post("http://localhost:3000/add", note);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  //to delete a note(this carries the id of the note to the backend)
  const deleteNote = async (id) => {
    try {
      const response = await Axios.delete(`http://localhost:3000/delete/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  //In-App adding method (doesn't involve database) (to use pass to onAdd prop in CreatArea)
  /* function handleAdd(note) {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  } */

  //In-App function to delete note from the array (doesn't connected to the database) (to use pass this to onDelete prop in Note)
  /* function handleDelete(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((item, index) => {
        return index !== id;
      });
    });
  } */

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default Home;
