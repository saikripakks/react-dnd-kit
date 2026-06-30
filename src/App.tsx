import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
} from "@dnd-kit/sortable";

import { useState } from "react";
import { initialTasks } from "./data/tasks";
import Column from "./components/Column";

function App() {

  const [tasks, setTasks] = useState(initialTasks);

  const getColumn = (status: string) =>
    tasks.filter(t => t.status === status);

  const findTask = (id: string) =>
    tasks.find(t => t.id === id);

  const handleDragEnd = (event: DragEndEvent) => {

    const { active, over } = event;

    if (!over) return;

    const activeTask = findTask(active.id as string);
    if (!activeTask) return;

    const isOverColumn = over.id === "todo" || over.id === "progress" || over.id === "done";
    
    if (isOverColumn) {
      if (activeTask.status !== over.id) {
        setTasks(prev =>
          prev.map(task =>
            task.id === active.id
              ? { ...task, status: over.id as any }
              : task
          )
        );
      }
      return;
    }

    const overTask = findTask(over.id as string);
    if (!overTask) return;

    if (activeTask.status === overTask.status) {

      const columnTasks = getColumn(activeTask.status);

      const oldIndex = columnTasks.findIndex(t => t.id === active.id);
      const newIndex = columnTasks.findIndex(t => t.id === over.id);

      const reordered = arrayMove(columnTasks, oldIndex, newIndex);

      setTasks(prev => {

        const others = prev.filter(
          t => t.status !== activeTask.status
        );

        return [...others, ...reordered];

      });

    } else {

      setTasks(prev =>
        prev.map(task =>
          task.id === active.id
            ? { ...task, status: overTask.status }
            : task
        )
      );

    }

  };

  return (

    <div className="min-h-screen p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        Task Management Board
      </h1>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >

        <div className="grid md:grid-cols-3 gap-6">

          <Column
            id="todo"
            title="To Do"
            tasks={getColumn("todo")}
          />

          <Column
            id="progress"
            title="In Progress"
            tasks={getColumn("progress")}
          />

          <Column
            id="done"
            title="Completed"
            tasks={getColumn("done")}
          />

        </div>

      </DndContext>

    </div>

  );

}

export default App;