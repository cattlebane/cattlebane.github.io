import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import FilterContext from '../../../../store/filter-context';
import Modal from '../../Modal/Modal';
import ProfileInputForm from './ProfileInputForm';
import ProfileAddBtn from './ProfileAddBtn';

const Profiles = (props) => {
  const clearData = [
    {
      id: 'Clear',
      filters: {
        active: [],
        inactive: [],
      },
    },
  ];
  const [profiles, setProfiles] = useState(false);
  const [profilesData, setProfilesData] = useState(false);
  const [newProfileName, setNewProfileName] = useState(false);
  const filterCtx = useContext(FilterContext);

  const handleProfileClick = (id) => {
    const profile =
      id === 'none'
        ? [...clearData]
        : profilesData.filter((profileData) => profileData.id === id);
    filterCtx.updateActiveFilters(profile[0].filters.active);
    filterCtx.updateInactiveFilters(profile[0].filters.inactive);
  };

  const handleNewProfileClick = (id) => {
    // ** provide input filed to enter name/id
    setNewProfileName(true);
  };

  const handleRemoveProfileClick = (id) => {
    axios
      .post('/profiles/remove-profile', { id: id })
      .then((res) => {
        const updatedProfiles = res.data.profiles;
        setProfilesData([...updatedProfiles]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseNewProfile = (updatedProfiles) => {
    setNewProfileName(false);

    if (updatedProfiles) {
      setProfilesData(updatedProfiles);
    }

    /* if (id) {
      // ** set dropdown's active profile to new ID
      console.log('Profiles', 'handleCloseNewProfile', 'id:', id);
    } */
  };

  const loadProfiles = () => {
    axios.get('/profiles').then((res) => {
      const loadedProfiles = res.data;
      setProfilesData([...loadedProfiles]);
    });
  };

  const checkForActiveProfile = () => {
    if (
      !profiles ||
      !profilesData ||
      // !filterCtx.activeFilters ||
      profiles.length < 1
    )
      return false;

    // ** any profile data match the filterCtx active and inactive filter lists?
    const activeProfileData = profilesData.filter((profileData) => {
      if (
        profileData.filters.active.length !== filterCtx.activeFilters.length
      ) {
        return false;
      } else {
        return (
          JSON.stringify(profileData.filters.active) ==
            JSON.stringify(filterCtx.activeFilters) &&
          JSON.stringify(profileData.filters.inactive) ==
            JSON.stringify(filterCtx.inactiveFilters)
        );
      }
    });

    const activeID =
      activeProfileData.length > 0
        ? activeProfileData[0].id.split(' ').join('')
        : '';
    // ** we have a match!
    // ** find profile element that should be 'active'
    // ** set profile matching this data as 'active'
    for (let i = 0; i < profilesData.length; i++) {
      const profile = document.getElementById(
        profilesData[i].id.split(' ').join('')
      );
      if (profile.id === activeID) {
        profile.lastChild.classList.add(
          'Profiles-dropdown-content-select-active'
        );
      } else {
        profile.lastChild.classList.remove(
          'Profiles-dropdown-content-select-active'
        );
      }
    }
  };

  useEffect(() => {
    // const newProfiles = profiles.map((profile) => {
    if (!profilesData) return false;

    const newProfilesData = [...profilesData];

    const newProfiles = newProfilesData.map((profile) => {
      const id = profile.id;
      return (
        <div
          className="Profiles-dropdown-content-wrapper"
          key={id.trim()}
          profileid={id}
          id={id.split(' ').join('')}
        >
          <a
            className="icon-text Profiles-dropdown-content-remove"
            onClick={() => handleRemoveProfileClick(id)}
          >
            &#xF316;
          </a>
          <a
            className="Profiles-dropdown-content-select Profiles-dropdown-content-blue"
            onClick={() => handleProfileClick(id)}
          >
            {id}
            <span className="icon-text Profiles-dropdown-content-select-remove">
              &#xF316;
            </span>
            {/* <span className="icon-text">&#xF310;</span> */}
          </a>
        </div>
      );
    });
    setProfiles(newProfiles);
  }, [profilesData]);

  useEffect(() => {
    checkForActiveProfile();
  }, [filterCtx.activeFilters, filterCtx.inactiveFilters]);

  useEffect(() => {
    console.log('App.useEffect()');
    loadProfiles();
  }, []);

  return (
    <>
      {newProfileName && (
        <Modal
          content={
            <ProfileInputForm
              onClose={handleCloseNewProfile}
              profiles={profiles}
              profilesData={profilesData}
            />
          }
          onClose={handleCloseNewProfile}
        />
      )}
      <div className="Profiles">
        <div className="Profiles-dropdown btn-dropdown">
          <span className="Profiles-dropdown-label">Profiles</span>
          <div className="Profiles-dropdown-content">
            <a
              className="Profiles-dropdown-content-select Profiles-dropdown-content-blue"
              onClick={() => handleProfileClick('none')}
            >
              none
            </a>
            {profiles}
          </div>
        </div>
        <ProfileAddBtn onClick={handleNewProfileClick} />
      </div>
    </>
  );
};

export default Profiles;
