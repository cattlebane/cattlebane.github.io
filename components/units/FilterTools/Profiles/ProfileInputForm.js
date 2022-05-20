import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import useInput from '../../../../hooks/use-input';
import FilterContext from '../../../../store/filter-context';

const isNotEmpty = (value) => value.trim() !== '';

const ProfileInputForm = (props) => {
  const {
    value: profileNameValue,
    isValid: profileNameIsValid,
    hasError: profileNameHasError,
    valueChangeHandler: profileNameChangeHandler,
    inputBlurHandler: profileNameBlurHandler,
    reset: resetProfileName,
  } = useInput(isNotEmpty);
  const filterCtx = useContext(FilterContext);
  const [toConfirm, setToConfirm] = useState(false);

  let formIsValid = false;

  if (profileNameIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // ** prompt to override current profile if name already exists
    // ** create new profile:
    const newProfile = {
      id: profileNameValue,
      filters: {
        active: [...filterCtx.activeFilters],
        inactive: [...filterCtx.inactiveFilters],
      },
    };

    // ** check if profile already exists
    props.profiles.filter((profile) => profile.id === profileNameValue);
    // ** prompt user to override existing profile

    /* let profiles = props.profiles.filter(
      (profile) => profile.id !== profileNameValue
    );
    profiles.push(newProfile);
    profiles.sort((firstItem, secondItem) => {
      let a = firstItem.id.toUpperCase(),
        b = secondItem.id.toUpperCase();
      return a == b ? 0 : a > b ? 1 : -1;
    }); */

    // ** create server side route for adding profile and pass it newProfile
    axios
      .post('/profiles/add-profile', newProfile)
      .then((res) => {
        console.log(' » ', res.data.message, res.data.profiles);
        props.onClose(res.data.profiles);
      })
      .catch((error) => {
        console.log(error);
        props.onClose(false);
      });
    // ** reset profilesData state with the server response

    resetProfileName();
  };

  const handleCancelConfirm = () => {
    setToConfirm(false);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    // ** check if profile name already exists.
    const matchingProfile = props.profilesData.filter(
      (profile) => profile.id === profileNameValue
    );
    // ** if exists, setToConfirm(true)
    // ** else, submit form
    if (matchingProfile.length > 0) {
      setToConfirm(true);
    } else {
      submitHandler(e);
    }
  };

  const profileNameClasses = profileNameHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <label htmlFor="name">Profile Name</label>
        <div className={profileNameClasses}>
          <input
            type="text"
            id="name"
            value={profileNameValue}
            onChange={profileNameChangeHandler}
            onBlur={profileNameBlurHandler}
          />
          <div className="form-actions">
            <button
              className="btn btn-blue"
              disabled={!formIsValid}
              onClick={handleSubmitClick}
            >
              {/* <button className="submit-btn" disabled={!formIsValid}> */}
              Submit
            </button>
          </div>
        </div>
        {profileNameHasError && (
          <div className="error-text">Please enter a profile name.</div>
        )}
      </div>
      {toConfirm && (
        <div className="profile-input-confirmation">
          <div className="profile-input-confirmation-content">
            <span className="profile-input-confirmation-content-profilename">
              {profileNameValue}
            </span>{' '}
            already exists. Override existing entry?
          </div>
          <div className="profile-input-confirmation-actions ">
            <button className="btn btn-grey">Confirm</button>
            <button className="btn btn-grey" onClick={handleCancelConfirm}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ProfileInputForm;
