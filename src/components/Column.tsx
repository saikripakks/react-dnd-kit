import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";

export default function Column({
    title,
    tasks,
    id,
}: any) {
    const { setNodeRef } = useDroppable({ id });

    return (

        <div className="bg-gray-100 rounded-xl p-4 min-h-[500px] flex flex-col">

            <div className="flex justify-between mb-4">

                <h2 className="font-bold text-xl">{title}</h2>

                <span className="bg-blue-600 text-white px-3 rounded-full">
                    {tasks.length}
                </span>

            </div>

            <SortableContext
                id={id}
                items={tasks.map((t: any) => t.id)}
                strategy={verticalListSortingStrategy}
            >

                <div ref={setNodeRef} className="space-y-3 flex-1">

                    {tasks.map((task: any) =>

                        <TaskCard
                            key={task.id}
                            task={task}
                        />

                    )}

                </div>

            </SortableContext>

        </div>

    );

}