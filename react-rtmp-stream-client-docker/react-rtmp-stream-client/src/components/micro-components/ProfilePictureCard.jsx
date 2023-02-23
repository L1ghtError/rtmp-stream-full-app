import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setUserPhotoThunk } from '../../store/UserSlice';
// eslint-disable-next-line no-unused-vars
import styled, { keyframes } from 'styled-components';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';

//Picture Profile Settings
export default function ProfilePictureSettings() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (inputRef.current.files.length === 1) {
      dispatch(setUserPhotoThunk(inputRef.current.files[0]));
      e.preventDefault();
    }
  };

  return (
    <ProfilePictureSettingsStyled>
      <UserAvatar photoSize={5}></UserAvatar>
      <div>
        <button>
          <label htmlFor="load-picture-input">Load Profile Picture</label>
          <input
            onChange={handleInputChange}
            id="load-picture-input"
            name="load-picture-input"
            accept=".jpg, .jpeg, .png, .gif"
            ref={inputRef}
            type={'file'}></input>
        </button>

        <p>Must be JPEG, PNG, or GIF</p>
      </div>
    </ProfilePictureSettingsStyled>
  );
}

// ProfilePictureSettings.propTypes = {
//   photoSize: PropTypes.number
// };

const ProfilePictureSettingsStyled = styled.div`
  display: flex;
  align-items: center;
  border-radius: 7px;
  background-color: #242424;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  & #user-avatar-component {
    margin-left: 1rem;
  }

  #load-picture-input {
    position: absolute;
    opacity: 0;
    background-color: red;
  }

  & button {
    display: flex;
    border-radius: 5px;
    margin-left: 1rem;
    margin-top: 1rem;
    padding: 0px;
    width: 15rem;
    background-color: #393940;
  }

  & p {
    margin-left: 1rem;
    font-size: 0.9rem;
  }

  & label {
    width: 100%;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`;

//Profile Settings
