import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskItem from "./components/TaskItem";
import Container from "./components/Container";
import SearchBox from "./components/SearchBox";
import DateAndWeather from "./components/DateAndWeather";

function App() {
  const [tasks, setTask] = useState([]);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleComplete = (id) => {
    setTask(
      tasks.map((task) => (task.id === id ? { ...task, done: true } : task))
    );
    setSaved(true);
  };

  const handleSearch = (e) => {
    setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  };

  const handleRemove = (id) => {
    setTask(tasks.filter((task) => task.id !== id));
    setSaved(true);
  };

  const handleAdd = (task) => {
    task.id = new Date().getTime();
    setTask([...tasks, task]);
    setSaved(true);
  };

  const execSearch = (tasks) => {
    setIsSearch(true);

    if (!isSearch) return;
    if (search === "") {
      setTask(JSON.parse(localStorage.getItem("tasks")));
      return;
    }
    const task = [...tasks];
    const newTasks = task.filter((task) =>
      task.task.toLowerCase().includes(search.toLowerCase())
    );

    setTask(newTasks);
  };

  useEffect(() => {
    const settasks = JSON.parse(localStorage.getItem("tasks"));
    if (settasks) {
      setTask(settasks);
    }
  }, []);

  useEffect(() => {
    if (saved) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setSaved(false);
    }
  }, [saved]);

  useEffect(() => {
    execSearch(tasks);
  }, [search]);

  return (
    <>
      <div className="flex flex-col gap-4 bg-slate-50 justify-center items-center h-screen w-screen">
        <Header />
        <Container>
          <div className="flex flex-col items-center flex-1  items-top gap-5">
            <DateAndWeather />
            <SearchBox handleSearch={handleSearch} />
            <AddTask onAdd={handleAdd} />

            {tasks
              .filter((task) => !task.done)
              .map((task, index) => (
                <TaskItem
                  key={`task-${index}`}
                  task={task}
                  onComplete={handleComplete}
                  onRemove={handleRemove}
                />
              ))}

            {tasks
              .filter((task) => task.done)
              .map((task, index) => (
                <TaskItem
                  key={`task-${index}`}
                  task={task}
                  done
                  onRemove={handleRemove}
                />
              ))}
          </div>
        </Container>
      </div>
    </>
  );
}

export default App;
