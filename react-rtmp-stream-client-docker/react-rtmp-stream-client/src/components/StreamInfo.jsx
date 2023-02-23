//import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../store/UserSlice.js';
import settingButtonLogo from '../assets/SettingButton.svg';
import UserAvatar from './micro-components/UserAvatar';

function StreamInfo() {
  const userInfo = useSelector(selectUserInfo);
  return (
    <StreamInfoStyled>
      <section>
        <UserAvatar></UserAvatar>
        <p id="user-name">
          {userInfo.userName != '' ? userInfo.userName : `please specify user name`}
        </p>
        <p id="stream-name"> | {userInfo.streamName}</p>
      </section>
      <section>
        <div id="settings-button-logo-wrapper">
          <img
            id="react-logo"
            src={settingButtonLogo}
            className="settings-button-logo"
            alt="settings-button-logo"
          />
        </div>
      </section>
    </StreamInfoStyled>
  );
}
export default StreamInfo;

const StreamInfoStyled = styled.div`
  display: flex;
  width: 100%;

  background: rgba(166, 166, 166, 0.1);
  height: 3rem;
  border-radius: 0px 0px 20px 20px;
  align-items: center;
  justify-content: space-between;

  #user-avatar-component {
    margin-left: 20px;
  }

  & button {
    margin-left: 1rem;
  }

  #user-name {
    margin-left: 15px;
  }
  & p {
    margin-left: 5px;
  }
  & section {
    display: flex;
    align-items: center;
  }

  #settings-button-logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 5px 5px 5px 5px;
    transition: background-color 0.25s;
    margin-right: 20px;
  }
  #settings-button-logo-wrapper:hover {
    background-color: #595959;
    cursor: pointer;
  }
`;
