import React, { Fragment } from "react";
import "./App.css";
import List from "./components/Lisst";
import Search from "./components/Search";

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org",
      author: "Dan Abromov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  //custom hook
  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
      localStorage.setItem(key, value);
    });
    return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    localStorage.setItem("search", event.target.value);
  };

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">

      <h1>My Hackers Stories</h1>
      <InputWithLabel
        id="search"
        label="search"
        value={searchTerm}
        onInputChange={handleSearch}
      />
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
};
const InputWithLabel = ({ id, label, value,type="text", onInputChange }) => {
  <Fragment>
    <label htmlFor={"id"}>{label}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </Fragment>
}
export default App;
