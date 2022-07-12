import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { LightTheme } from "./theme";

import Clock from "react-live-clock";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Options from "./components/Options";
import BoardContents from "./components/BoardContents";
import { memo } from "react";
import TrashCan from "./components/TrashCan";

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
  height: 100%;
  width: 100%;
`;
const Header = styled.header`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-between;
  padding: 30px;
  position: fixed;
  top: 0px;
`;
const WeatherTime = styled.div``;
const Title = styled.h1`
  font-size: 50px;
  font-weight: 500;
  text-shadow: 1px 1px 2px black;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

const Main = styled.main`
  margin-top: 10rem;
  height: 100%;
  /* border: 5px solid black; */
`;

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  background-color: inherit;

  p {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 500;
    line-height: 100px;
    text-align: center;
    text-justify: center;
    color: black;
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    // delete task

    if (
      !Object.keys(toDos).includes(draggableId) &&
      destination?.droppableId === "del"
    ) {
      setToDos((prevToDos) => {
        const boardCopy = [...prevToDos[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return { ...prevToDos, [source.droppableId]: boardCopy };
      });
      console.log("s");
      return;
    }
    if (!destination?.droppableId) return;

    // contents move
    if (Object.keys(toDos).includes(draggableId)) {
      setToDos((prevToDos) => {
        const boardCopy = Object.entries({ ...prevToDos });
        const cutTask = [...boardCopy.splice(source.index, 1)];
        boardCopy.splice(destination.index, 0, ...cutTask);

        return { ...Object.fromEntries(boardCopy) };
      });
      return;
    }

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
            <WeatherTime>
              <Clock
                style={{ "font-size": "20px", "font-weight": "500" }}
                format={"YYYY.MM.DD HH:mm:ss"}
                ticking={true}
                timezone={"KR/Pacific"}
              />
            </WeatherTime>
            <Title>To Do List</Title>
            <Options />
          </Header>
          <Main>
            <DragDropContext onDragEnd={onDragEnd}>
              <BoardContents toDos={toDos} />
              <TrashCan />
            </DragDropContext>
          </Main>
          <Footer>
            <p>Beautiful Trello Clone!!</p>
          </Footer>
        </Wrapper>

        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}

export default memo(App);
