import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { LightTheme } from "./theme";

import {
  DragDropContext,
  DragDropContextProps,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import { toDoState } from "./atoms";
import Boards from "./components/Boards";
import Options from "./components/Options";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
line-height: 1;
}
menu, ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: '';
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}
* {
box-sizing: border-box;
}

body{
  
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    line-height: 1.2;
    background: fixed radial-gradient(${(props) =>
      [...props.theme.bgColor].join()});
    
}

a{
    text-decoration: none;
    color:inherit;
}
`;

const Wrapper = styled.div`
  /* height: 150vh; */
  padding: 10px;
  border: 1px solid black;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;
const WeatherTime = styled.div``;
const Title = styled.h1``;

const Main = styled.main`
  /* display: grid;
  place-items: center;
  grid-gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 5rem; */

  /* display: flex;
  justify-content: center;
  flex-flow: row wrap;
  gap: 20px; */
  margin-top: 5rem;
  display: flex;
  gap: 20px;
  div {
    width: 100%;
    border: 1px solid black;
  }
`;
const Footer = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0;
  border: 1px solid black;
`;

const arr = ["qw"];

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (!destination?.droppableId) return;

    // same board
    if (source.droppableId === destination?.droppableId) {
      setToDos((prevToDos) => {
        // {...prevToDos}
        const boardCopy = [...prevToDos[source.droppableId]];
        const cutTask = [...boardCopy.splice(source.index, 1)];
        boardCopy.splice(destination.index, 0, ...cutTask);

        return { ...prevToDos, [source.droppableId]: boardCopy };
      });
    }

    // different board
    if (source.droppableId !== destination?.droppableId) {
      setToDos((prevToDos) => {
        const sourceCopy = [...prevToDos[source.droppableId]];
        const destinationCopy = [...prevToDos[destination.droppableId]];

        const cut = sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination.index, 0, ...cut);
        return {
          ...prevToDos,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destinationCopy,
        };
      });
    }
  };

  return (
    <>
      <ThemeProvider theme={LightTheme}>
        <Wrapper>
          <Header>
            <WeatherTime>시간 날씨</WeatherTime>
            <Title>To Do List</Title>
            <Options />
          </Header>
          <Main>
            <DragDropContext onDragEnd={onDragEnd}>
              {Object.keys(toDos).map((toDo, idx) => (
                <Droppable key={toDo} droppableId={toDo}>
                  {(provided) => (
                    <div ref={provided.innerRef}>
                      <Draggable index={idx} draggableId={toDo}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            {<Boards toDo={toDo} toDos={toDos} />}
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </Main>
          {/* <Footer>Footer</Footer> */}
        </Wrapper>

        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

export default App;
