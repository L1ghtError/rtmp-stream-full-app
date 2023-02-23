import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvalibleSMSvgByURL } from '../../scripts/getAvalibleSMSvgByURL';
import { addNewUserLink, selectUserLinks } from '../../store/UserSlice';
import { LinkExcerpt } from './LinkExcerpt';
// eslint-disable-next-line no-unused-vars
import styled, { keyframes } from 'styled-components';

//Picture Profile Settings
export default function ProfileLinksCard() {
  //const [isEditing, setEditProperty] = useState(0);
  const [newUserLinkURL, setnewUserLinkURL] = useState('');
  const [newUserLinkTitle, setnewUserLinkTitle] = useState('');
  const dispatch = useDispatch();
  const userLinks = useSelector(selectUserLinks);

  const handleAddUserLink = () => {
    try {
      new URL(newUserLinkURL);
    } catch {
      return false;
    }
    if (userLinks.find((e) => e.linkURL === newUserLinkURL)) {
      return false;
    }
    dispatch(addNewUserLink({ linkTitle: newUserLinkTitle, linkURL: newUserLinkURL }));
    setnewUserLinkURL('');
    setnewUserLinkTitle('');
  };
  const doesUserLinkArrHaveFreeSpace = () => {
    let doesHaveFreeSpace = 0;
    userLinks.forEach((e) => {
      if (e.linkURL == '') {
        doesHaveFreeSpace = 1;
      }
    });

    return doesHaveFreeSpace;
  };
  return (
    <ProfileLinksCardStyled>
      <div className="card-settings-wrapper">
        <p>Add link</p>
        <div id="inputs-wrapper">
          <img src={getAvalibleSMSvgByURL(newUserLinkURL)}></img>
          <input
            value={newUserLinkTitle}
            onChange={(e) => setnewUserLinkTitle(e.target.value)}
            placeholder="Title"></input>
          <input
            value={newUserLinkURL}
            onChange={(e) => setnewUserLinkURL(e.target.value)}
            placeholder="Link"></input>
          <button
            onClick={handleAddUserLink}
            style={
              !doesUserLinkArrHaveFreeSpace()
                ? { backgroundColor: '#828497', cursor: 'unset' }
                : { backgroundColor: '#c3c6e2', cursor: 'pointer' }
            }
            disabled={!doesUserLinkArrHaveFreeSpace()}>
            Add link
          </button>
        </div>
      </div>
      {userLinks.map((e) => {
        if (e.linkURL) {
          return <LinkExcerpt userLink={e} key={e.linkURL}></LinkExcerpt>;
        }
      })}
    </ProfileLinksCardStyled>
  );
}

// ProfileLinksCard.propTypes = {
//   photoSize: PropTypes.number
// };

const ProfileLinksCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  background-color: #242424;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  #inputs-wrapper {
    display: flex;
    margin-bottom: 0.5rem;
    align-items: center;
    /* width: 100%; */
    /* align-content: flex-end;
    justify-content: space-between; */
    /* flex-direction: row; */
  }
  .link-excerpt {
    border-top: 1px solid rgba(0, 0, 0, 0.5);
    padding-top: 1.2rem;
    & button {
      margin-right: 1rem;
    }
  }

  .card-settings-wrapper {
    display: flex;
    width: 100%;

    flex-direction: column;
    //border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }
  & img {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    max-width: 2rem;
    height: 2rem;
    margin-left: 1rem;

    filter: brightness(0%) drop-shadow(0 0 5px #2b2b2b) drop-shadow(0 0 10px #2e2e2eaa);
  }

  & p {
    margin-left: 1rem;

    font-size: 0.9rem;
  }
  & button {
    display: flex;
    border-radius: 5px;
    margin-left: 0rem;
    margin-right: 2rem;
    width: 10rem;
    height: 1.9rem;
    background-color: #c3c6e2;
    color: black;
    font-size: 0.8rem;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
  & button:hover {
    border-color: #393940;
  }
  & button:focus,
  button:focus-visible {
    outline: 3px solid #393940;
  }
  & input {
    background: #44444d;
    border-radius: 5px;
    width: 70%;
    border: 0px solid black;
    height: 1.5rem;
    margin: 0rem 1rem 0rem 1rem;
    padding-left: 2rem;
  }
  label {
    display: inline-block;
    background: #44444d;
    border-radius: 5px;
    color: #d4c7c7;
    margin: 0rem 1rem 0rem 1rem;
    padding: 0.2rem 1rem 0.2rem 1rem;
    max-width: 12rem;
    overflow: hidden;
    font-size: 0.7rem;
    width: 70%;
  }
  label:hover {
    cursor: text;
    outline: 1px solid white;
  }
`;

//Profile Settings
