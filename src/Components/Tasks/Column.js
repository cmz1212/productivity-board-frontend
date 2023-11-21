import React from "react";
import { getStatusFromColumnId } from "./GetColumnStatus";
import DisplayTask from "./DisplayTasks";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function Column(props) {
  const { columnId, tasks, fetchAllTasks, onDelete} = props;
  const columnTasks = tasks.filter(
    (task) => task.status === getStatusFromColumnId(columnId)
  );

  return (
    <div className="flex">
      <br/>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column"
            id={snapshot.isDraggingOver ? "dropping" : `${columnId}`}
          >
            <h2 style={{fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center', marginBottom: '1em'}}>{getStatusFromColumnId(columnId)}</h2>
            {columnTasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`task-space ${
                      snapshot.isDragging ? "dragging" : ""
                    }`}
                  >
                    <DisplayTask
                      key={task.id}
                      task={task}
                      fetchAllTasks={fetchAllTasks}
                      index={index}
                      onDelete={onDelete}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}