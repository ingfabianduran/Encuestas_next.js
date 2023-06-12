import { Grid } from "@mui/material";
import TypeQuestion from "./TypeQuestion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function ViewQuestions({ questions = [], updateQuestion, deleteQuestion }) {
  return (
    <DragDropContext
      onDragEnd={(res) => console.log(res)}>
      <Droppable droppableId="questions">
        {
          (droppableProvided) => (
            <Grid container sx={{
              marginTop: 1,
              paddingX: 2,
              paddingBottom: 2,
              border: "1px dashed grey",
              borderRadius: 3
            }}
              rowSpacing={1}
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}>
              {
                questions.map((question, index) => (
                  <Draggable key={index} draggableId={question.key} index={index}>
                    {
                      (draggableProvided) => (
                        <Grid item md={12}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          ref={draggableProvided.innerRef}>
                          <TypeQuestion
                            question={question}
                            index={index}
                            updateQuestion={updateQuestion}
                            deleteQuestion={deleteQuestion} />
                        </Grid>
                      )
                    }
                  </Draggable>
                ))
              }
              {droppableProvided.placeholder}
            </Grid>
          )
        }
      </Droppable>
    </DragDropContext >
  )
}