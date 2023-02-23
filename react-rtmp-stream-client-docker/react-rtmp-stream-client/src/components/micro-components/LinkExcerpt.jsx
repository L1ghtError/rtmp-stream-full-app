import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvalibleSMSvgByURL } from '../../scripts/getAvalibleSMSvgByURL';
import { selectUserLinks, deleteUserLinkByURL, changeUserLink } from '../../store/UserSlice';
import PropTypes from 'prop-types';
export function LinkExcerpt({ userLink }) {
  let [isEditing, setEditingParam] = useState(0);
  const userLinks = useSelector(selectUserLinks);
  let [userLinkTitle, setUserLinkTitle] = useState(userLink.linkTitle);
  let [userLinkURL, setUserLinkURL] = useState(userLink.linkURL);
  const dispatch = useDispatch();
  const handleSaveUserLink = () => {
    try {
      new URL(userLinkURL);
    } catch {
      return false;
    }
    if (userLinks.find((e) => e.linkURL === userLinkURL && e.linkTitle === userLinkTitle)) {
      if (userLink.linkURL === userLinkURL && userLink.linkTitle === userLinkTitle) {
        //Bad better use nano to save
        setEditingParam(0);
      }
      return false;
    }

    dispatch(
      changeUserLink({ old: userLink, new: { linkTitle: userLinkTitle, linkURL: userLinkURL } })
    );
    setEditingParam(0);
  };
  const handleDeleteLink = () => {
    dispatch(deleteUserLinkByURL(userLinkURL));
  };
  return (
    <div className="card-settings-wrapper link-excerpt">
      <div id="inputs-wrapper">
        <img src={getAvalibleSMSvgByURL(userLinkURL)}></img>
        {isEditing == 0 && (
          <>
            <label>{userLinkTitle}</label>
            <label>{userLinkURL}</label>
          </>
        )}
        {isEditing == 1 && (
          <>
            <input
              value={userLinkTitle}
              onChange={(e) => setUserLinkTitle(e.target.value)}
              placeholder="Title"></input>
            <input
              value={userLinkURL}
              onChange={(e) => setUserLinkURL(e.target.value)}
              placeholder="Link"></input>
          </>
        )}
        <button onClick={handleDeleteLink}>Remove</button>
        {isEditing == 1 ? (
          <button onClick={handleSaveUserLink}>Save</button>
        ) : (
          <button onClick={() => setEditingParam(1)}>Edit</button>
        )}
      </div>
    </div>
  );
}
LinkExcerpt.propTypes = {
  userLink: PropTypes.object.isRequired
};
