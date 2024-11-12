import { useState } from "react";
import data from "../data/data";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const [tasks, setTasks] = useState(data);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    event.preventDefault();
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModal(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleClose() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleDeleteTask(taskId) {
    const taskDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskDelete);
  }

  return (
    <>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            onCloseClick={handleClose}
            taskToUpdate={taskToUpdate}
            onSave={handleAddEditTask}
          />
        )}
        <div className="container">
          <div className="p-2 flex justify-end">
            <SearchTask />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions onAddClick={() => setShowAddModal(true)} />
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      </section>
    </>
  );
}
