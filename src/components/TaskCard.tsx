import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

export default function TaskCard({task}:any){

const{
attributes,
listeners,
setNodeRef,
transform,
transition,
}=useSortable({id:task.id});

const style={
transform:CSS.Transform.toString(transform),
transition,
};

return(
<div
ref={setNodeRef}
style={style}
{...attributes}
{...listeners}
className="bg-white rounded-lg p-4 shadow cursor-grab active:cursor-grabbing"
>
{task.title}
</div>
);

}