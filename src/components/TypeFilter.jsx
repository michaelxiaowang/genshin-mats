import React from 'react';
import './TypeFilter.css';

const filterLists = {
  "element": ['anemo', 'cryo', 'electro', 'dendro', 'geo', 'hydro', 'pyro'],
  "weapon": ['bow', 'catalyst', 'claymore', 'polearm', 'sword']
}

function TypeFilter(props) {
  return (
    <div className="type-filter">
      {
        filterLists[props.type].map(filter => (
          <React.Fragment key={filter}>
            <input
              type="checkbox"
              name={props.type}
              id={filter}
              value={filter}
              checked={props.checked === filter}
              onChange={() => props.selectFilter(filter)}
            />
            <label className="filter-label" htmlFor={filter}>
              <img className="filter-image" src={process.env.PUBLIC_URL + '/images/' + filter + '.png'} alt={filter} />
            </label>
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default TypeFilter;