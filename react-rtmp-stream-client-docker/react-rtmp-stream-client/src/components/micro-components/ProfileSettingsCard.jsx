// eslint-disable-next-line no-unused-vars
import styled, { keyframes } from 'styled-components';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import twitchIcon from '../../assets/SocialMediaSVGS/twitch-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo as reduxSetUserInfo, selectUserInfo } from '../../store/UserSlice';
import { useImmer } from 'use-immer';
import { useState, useEffect, useRef } from 'react';
//Picture Profile Settings
export default function ProfileSettingsCard() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useImmer({
    userName: '',
    streamName: '',
    userStreamKey: '',
    userColorTheme: '#535bf2'
  });
  //const [isAllFieldsSame, setIsAllFieldsSame] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDisplayStreamKey, setDisplayStreamKey] = useState(0);
  let reduxUserInfo = useSelector(selectUserInfo);
  let submitRef = useRef(0);
  useEffect(() => {
    setUserInfo(reduxUserInfo);
  }, []);
  const handleUserNameChange = (e) => {
    setUserInfo((draft) => {
      draft.userName = e.target.value;
    });
  };
  const compareLocalAndGlobalState = () => {
    let isAllFieldsSame = 1;
    const userInfoNames = Object.keys(userInfo);
    userInfoNames.forEach((e) => {
      if (userInfo[e] != reduxUserInfo[e]) {
        isAllFieldsSame = 0;
      }
    });
    return isAllFieldsSame;
  };
  const handleUserColorThemeChange = (e) => {
    setUserInfo((draft) => {
      draft.userColorTheme = e.target.value;
    });
  };
  const handleStreamNameChange = (e) => {
    setUserInfo((draft) => {
      draft.streamName = e.target.value;
    });
  };
  const handleStreamKeyChange = (e) => {
    setUserInfo((draft) => {
      draft.userStreamKey = e.target.value;
    });
  };
  const displayStreamKey = (isDisplayStreamKey) => {
    if (isDisplayStreamKey === 1) {
      return userInfo.userStreamKey;
    }
    if (isDisplayStreamKey === 0) {
      let output = '';
      for (let i = 0; i < userInfo.userStreamKey.length; i++) {
        output += '*';
      }
      return output;
    }
  };
  const handleSubmit = (userInfo) => {
    //should i migrate to "Formik" or "react Forms"?
    console.log('click handled');
    let isInvalidParamFound = 0;
    let errorMessage = '';
    Object.entries(userInfo).forEach((e) => {
      if (e[1] === '') {
        errorMessage += ' ' + e[0];
        isInvalidParamFound = 1;
      }
    });
    if (isInvalidParamFound) {
      setErrorMessage('please specify:' + errorMessage);
    }
    if (isInvalidParamFound === 0) {
      setErrorMessage('');
      dispatch(reduxSetUserInfo(userInfo));
    }
  };
  return (
    <>
      <ProfileSettingsCardStyled>
        <div className="card-settings-wrapper">
          <div className="text-card-wrapper">
            <p>Username</p>
            <h5>
              {userInfo.userName == '' ? 'Specify username' : `Username: ${userInfo.userName}`}
            </h5>
          </div>
          <input
            value={userInfo.userName}
            onChange={(e) => handleUserNameChange(e)}
            maxLength={32}
            placeholder="Username"></input>
        </div>
        <div className="card-settings-wrapper">
          <div className="text-card-wrapper">
            <p>Stream name</p>
            <h5>
              {userInfo.streamName == ''
                ? 'Specify stream name...'
                : `Stream name: ${userInfo.streamName}`}
            </h5>
          </div>
          <input
            value={userInfo.streamName}
            onChange={handleStreamNameChange}
            maxLength={54}
            placeholder="Stream name"></input>
        </div>
        <div className="card-settings-wrapper">
          <div className="text-card-wrapper">
            <p>Stream key</p>
            <h5>
              That your private stream key <div id="warning-p">(dont show it to anyone)</div>
            </h5>
          </div>
          <div>
            <label id="stream-key-label" htmlFor="stream-key-input">
              {userInfo.userStreamKey ? displayStreamKey(isDisplayStreamKey) : 'stream key'}
              <input
                value={userInfo.userStreamKey}
                onChange={handleStreamKeyChange}
                name="stream-key-input"
                id="stream-key-input"
                maxLength={64}
                placeholder="Stream key"
                autoComplete="off"></input>
            </label>
            <button
              onClick={() => {
                isDisplayStreamKey ? setDisplayStreamKey(0) : setDisplayStreamKey(1);
              }}
              id="stream-key-display-button">
              Show
            </button>
          </div>
        </div>
        <div id="card-color-wrapper" className="card-settings-wrapper">
          <div>
            <p>User color theme</p>
            <input
              id="user-color-input"
              value={userInfo.userColorTheme}
              onChange={handleUserColorThemeChange}
              type={'color'}></input>
            <h5>set your color theme</h5>
          </div>
          <button
            style={{ marginLeft: '1rem' }}
            onClick={() => {
              setUserInfo((draft) => {
                draft.userColorTheme = '#535bf2';
              });
            }}
            id="stream-key-display-button">
            Set to default
          </button>
        </div>
        <div id="twitch-auth-wrapper" className="card-settings-wrapper">
          <p>Sync with twich</p>
          <button id="stream-key-display-button" disabled>
            soon...{/* Auth with Twitch! */}
          </button>
          <img src={twitchIcon}></img>
        </div>
        <div id="profile-settings-save-button-wrapper" className="card-settings-wrapper">
          {errorMessage ? (
            <div id="warning-p" style={{ alignSelf: 'center' }}>
              {errorMessage}
            </div>
          ) : (
            <div></div>
          )}
          <button
            onClick={() => handleSubmit(userInfo)}
            ref={submitRef}
            disabled={compareLocalAndGlobalState()}
            style={
              compareLocalAndGlobalState()
                ? { backgroundColor: '#828497', cursor: 'unset' }
                : { backgroundColor: '#c3c6e2' }
            }>
            Save changes
          </button>
        </div>
      </ProfileSettingsCardStyled>
    </>
  );
}

// ProfileSettingsCardSettings.propTypes = {
//   photoSize: PropTypes.number
// };

const ProfileSettingsCardStyled = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 7px;
  background-color: #242424;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .card-settings-wrapper {
    display: flex;
    flex-direction: column;

    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }

  #stream-key-input {
    position: absolute;
    opacity: 0;
    height: 0px;
    padding: 0px;
    margin: 0px;
    background-color: red;
  }
  #stream-key-display-button {
    width: auto;
    padding-right: 4rem;
    margin-left: 0px;
    margin-right: 1rem;
    font-size: 0.8rem;
    right: 0;
  }
  .text-card-wrapper {
    font-size: 0.7rem;
    display: flex;
    flex-direction: row;
  }
  #warning-p {
    display: inline-block;
    color: red;
    margin-top: 0px;
    margin-left: 0px;
    font-size: 16px;
  }
  & input {
    background: #44444d;
    border-radius: 5px;

    border: 0px solid black;
    height: 1.5rem;
    margin: 0rem 2rem 1rem 2rem;
    padding-left: 2rem;
  }

  #card-color-wrapper {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    & div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    & input {
      justify-content: center;
      width: 3rem;
      height: 2rem;
      margin: 0rem 0rem 0rem 1rem;
      padding-left: 0rem;
    }
  }
  #stream-key-label {
    display: inline-block;
    background: #44444d;
    border-radius: 5px;
    margin: 0rem 1rem 1rem 1.4rem;
    padding: 0.4rem 1rem 0.4rem 1rem;
    font-size: 0.7rem;
    width: 70%;
  }
  #stream-key-label:hover {
    cursor: text;
    outline: 1px solid white;
  }
  #stream-key-label:focus,
  #stream-key-label:active,
  #stream-key-label:active {
    outline: 1px solid white;
  }
  h5 {
    margin-top: 1rem;
    margin-left: 1rem;
    font-weight: 400;
    margin-bottom: 0px;
  }
  & button {
    border-radius: 5px;
    margin-left: 1rem;

    width: 15rem;
    background-color: #393940;
  }

  & p {
    margin-left: 1rem;
    font-size: 0.9rem;
  }

  #profile-settings-save-button-wrapper {
    align-items: flex-end;

    justify-content: center;
    height: 3.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    & button {
      margin-right: 2rem;
      width: 10rem;
      background-color: #c3c6e2;
      color: black;
      padding-right: 3rem;
      font-size: 0.8rem;
    }
    & button:hover {
      border-color: #393940;
    }
    & button:focus,
    button:focus-visible {
      outline: 3px solid #393940;
    }
  }
  #twitch-auth-wrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    & img {
      width: 2.2rem;
      margin-right: 5rem;
      filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));
    }
    & button {
      padding-right: 6rem;
      padding-left: 4rem;
    }
    & p {
      margin-left: 1rem;
    }
  }
`;

//Profile Settings
