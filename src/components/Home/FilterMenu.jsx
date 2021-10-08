import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import useComponentInvisible from '../../hooks/useComponentInvisible';
import useShowComponent from '../../hooks/useShowComponent';
import FilterRegion from './FilterRegion';
import DetailtsFilterOption from './DetailtsFilterOption';
import { RiArrowDownSLine } from 'react-icons/ri';
import sortCategories from '../../data/sortCategories';
import { GrPowerReset } from 'react-icons/gr';

const regions = ['africa', 'americas', 'asia', 'europe', 'oceania'];
const detailsFilterOptions = ['all', 'yes', 'no'];

const FilterMenu = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { ref: filterMenuRef } = useComponentInvisible('CLOSE-FILTER-MENU');
  const {
    ref: unMemberMenuRef,
    showComponent: showUnMemberMenu,
    setShowComponent: setShowUnMemberMenu,
  } = useShowComponent('');
  const {
    ref: landlockedMenuRef,
    showComponent: showLandlockedMenu,
    setShowComponent: setShowLandlockedMenu,
  } = useShowComponent('');

  const handleSortSelect = (item) => {
    dispatch({
      type: 'SET-SORT-TYPE',
      // payload: { id: item.id, text: item.text },
      payload: item,
    });
  };

  const handleCountriesSlider = (e) => {
    dispatch({ type: 'SET-COUNTRIES-PER-PAGE', payload: e.target.value });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET-FILTERS' });
    // dispatch({type: 'RESET-TO-FIRST-PAGE'})
  };

  return (
    <div
      ref={filterMenuRef}
      className={`filter-menu ${appState.menuOpen && 'filter-open'}
  }`}
    >
      <div className="filter-block">
        <h3 className="filter-heading main section-heading">Filter | Sort</h3>
      </div>
      <div className="filter-content">
        <h3 className="mobile-only section-heading filter-heading main">
          Filter | Sort
        </h3>
        <div className="line mobile-only"></div>
        <h3 className="section-heading region-heading">Regions</h3>
        <div className="filter-category">
          <div className="options">
            {regions.map((region, idx) => {
              return <FilterRegion region={region} key={region} idx={idx} />;
            })}
          </div>
        </div>
        <div className="line"></div>
        <h3 className="section-heading sort-heading">Sort by</h3>
        <div className="sort-categories">
          {/* {sortCategories.entries((key, value) => {
            console.log(key);
            console.log(value);
            return (
              <p
                onClick={(e) => handleSortSelect(e)}
                id={key}
                key={key}
                className={`${appState.sortBy === key ? 'sort-active' : ''}`}
              >
                {value}
              </p>
            );
          })} */}
          {sortCategories.map((item) => {
            return (
              <p
                onClick={() => handleSortSelect(item)}
                id={item.id}
                key={item.id}
                className={`${
                  appState.sortBy.id === item.id ? 'sort-active' : ''
                }`}
              >
                {item.text}
              </p>
            );
          })}
        </div>
        <div className="line"></div>
        <h3 className="section-heading details-heading">Details</h3>
        <div className="details-category">
          <div className="un-member details-option" ref={unMemberMenuRef}>
            <div
              className="dropdown-heading"
              onClick={() => setShowUnMemberMenu((prevState) => !prevState)}
            >
              <h4 className="text">UN Member</h4>
              <RiArrowDownSLine className="arrow" />
            </div>
            <div className={`choices ${showUnMemberMenu ? 'show' : ''}`}>
              {detailsFilterOptions.map((option) => {
                return (
                  <DetailtsFilterOption
                    option={option}
                    dropdown="unMember"
                    action="SET-UN-MEMBER-FILTER"
                    key={`unMember-${option}`}
                  />
                );
              })}
            </div>
          </div>
          <div className="landlocked details-option" ref={landlockedMenuRef}>
            <div
              className="dropdown-heading"
              onClick={() => setShowLandlockedMenu((prevState) => !prevState)}
            >
              <h4 className="text">Landlocked</h4>
              <RiArrowDownSLine className="arrow" />
            </div>
            <div className={`choices ${showLandlockedMenu ? 'show' : ''}`}>
              {detailsFilterOptions.map((option) => {
                return (
                  <DetailtsFilterOption
                    option={option}
                    dropdown="landlocked"
                    action="SET-LANDLOCKED-FILTER"
                    key={`landlocked-${option}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="line"></div>
        <h3 className="section-heading countries-heading">Countries / Page</h3>
        <div className="countries-per-page">
          <h4 className="countries-per-page-value">
            {appState.countriesPerPage}
          </h4>
          <input
            type="range"
            className="countries-per-page-input"
            tabIndex="-1"
            min="12"
            max="84"
            value={appState.countriesPerPage}
            onChange={(e) => handleCountriesSlider(e)}
          />
        </div>
        <div className="line"></div>
        <div className="reset-category">
          <div className="reset-btn" onClick={resetFilters}>
            <p className="reset-text">Reset</p>
            <GrPowerReset className="reset-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
