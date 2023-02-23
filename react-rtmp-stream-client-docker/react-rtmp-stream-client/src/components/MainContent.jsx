//import { useState } from 'react';
import styled from 'styled-components';

import { Routes, Route } from 'react-router-dom';
import OptionsPage from './OptionsPage';
import StreamInfo from './StreamInfo';
import VideoPlayer from './VideoPlayer';
const MainContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 50rem;
  justify-content: center;
`;

function MainContent() {
  return (
    <MainContentStyled>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <VideoPlayer></VideoPlayer>
              <StreamInfo></StreamInfo>
            </>
          }></Route>
        <Route
          exact
          path="/options"
          element={
            <>
              <OptionsPage></OptionsPage>
              <StreamInfo></StreamInfo>
            </>
          }></Route>
      </Routes>
    </MainContentStyled>
  );
}
export default MainContent;
