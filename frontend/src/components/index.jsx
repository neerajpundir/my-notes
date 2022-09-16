import React from "react";
import Config from "../config/config";
import dateformat from "./date";

const Index = () => {
  // API Urls
  const getAddNotesUrl = Config.API_URL + Config.ADD_NOTES;
  const getNotesUrl = Config.API_URL + Config.GET_NOTES;
  const deleteNotesURL = Config.API_URL + Config.DELETE_NOTES;

  // All States
  const textAreaRef = React.useRef();
  const [todo, setTodo] = React.useState({ status: 404, data: [] });
  const [notes, setNotes] = React.useState({ title: "", mynotes: "" });
  const [wordCount, setWordCount] = React.useState(250);

  // Handle Change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNotes({ ...notes, [name]: value });
    if (name === "mynotes") {
      var text = 250 - value.length;
      setWordCount(text);
    }
  };

  // Get All Notes
  const getMyNotes = async () => {
    const res = await fetch(getNotesUrl);
    const allnotes = await res.json();
    setTodo({ status: 200, data: allnotes.notes });
  };

  React.useEffect(() => {
    getMyNotes();
  }, []);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (notes) {
      createNotes(getAddNotesUrl, notes);
    }
    setNotes({ title: "", mynotes: "" });
    setTodo({ status: 404, data: [] });
    setWordCount(250);
    getMyNotes();
  };

  const createNotes = (url, data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = fetch(url, requestOptions).then((res) => res.json());
  };

  const renderSwitch = (param) => {
    switch (param + 1) {
      case 1:
        return "primary ";
      case 2:
        return "secondary";
      case 3:
        return "success";
      case 4:
        return "danger";
      case 5:
        return "warning";
      case 6:
        return "info";
      default:
        return "yellow";
    }
  };

  const removetodo = (id) => {
    const res = fetch(deleteNotesURL + id).then((res) => res.json());
    setTodo({ status: 404, data: [] });
    getMyNotes();
  };

  return (
    <section>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 mt-5">
              <div className="p-4 note-body">
                <form className="form-group">
                  <input
                    type="text"
                    name="title"
                    className="form-control mb-2 mt-2 text"
                    placeholder="Title (Max limit: 25)"
                    required={true}
                    maxLength={25}
                    value={notes.title}
                    onChange={handleChange}
                  />
                  <p className="count">Total Count : 250</p>
                  <textarea
                    className="form-control text"
                    name="mynotes"
                    cols="30"
                    rows="15"
                    required={true}
                    placeholder="Notes"
                    ref={textAreaRef}
                    maxLength={250}
                    value={notes.mynotes}
                    onChange={handleChange}
                  ></textarea>
                </form>
                <div className="remaining-count">
                  <p className="count text-danger">
                    Character Remaining : {wordCount}
                  </p>
                </div>
                <div className="note-save-btn">
                  <button
                    type="submit"
                    className="form-control btn btn-primary"
                    onClick={handleSubmit}
                  >
                    <i className="fa fa-plus"> Add</i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-8 mt-5 scroll">
              <div className="row justify-content-end">
                {todo.status === 200
                  ? todo.data.map((items) => {
                      const { id, title, notes, createdAt } = items;
                      return (
                        <div className="col-12 col-sm-6 col-md-6 mb-3" key={id}>
                          <div className="card all-notes border-0">
                            <div
                              className={
                                "bg-" + renderSwitch(id % 6) + " card-header"
                              }
                            >
                              <div className="title text-light m-0">
                                <h5>{title}</h5>
                              </div>
                              <div className=" float-end">
                                <a
                                  href="#!"
                                  title="Remove todo"
                                  onClick={() => removetodo(id)}
                                >
                                  <i className="fa fa-trash-o text-light" />
                                </a>
                              </div>
                            </div>
                            <div className="card-body">
                              <blockquote
                                className={
                                  "text-" +
                                  renderSwitch(id % 6) +
                                  " blockquote mb-0"
                                }
                              >
                                <p> {notes} </p>
                              </blockquote>
                              <footer className="footer">
                                {" "}
                                <cite
                                  title="Source Date"
                                  className={
                                    "text-" + renderSwitch(id % 6) + " date"
                                  }
                                >
                                  {dateformat(createdAt)}
                                </cite>
                              </footer>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
