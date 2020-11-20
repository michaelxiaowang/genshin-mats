import React from 'react';
import './TypeFilter.css';

const filterLists = {
  element: {
    type: 'image',
    list: ['anemo', 'cryo', 'electro', 'dendro', 'geo', 'hydro', 'pyro']
  },
  weapon: {
    type: 'image',
    list: ['bow', 'catalyst', 'claymore', 'polearm', 'sword']
  },
  material: {
    type: 'text',
    list: ["character", "talent", "weapon", "common"],
    names: ["Character", "Talent", "Weapon", "Common"]
  },
  days: {
    type: 'text',
    list: [1, 2, 3],
    names: ['Mon/Thu', 'Tue/Fri', 'Wed/Sat']
  }
}

function TypeFilter(props) {
  return (
    <div className="type-filter">
      {
        filterLists[props.type].list.map((filter, index) => (
          <React.Fragment key={filter}>
            <input
              className="filter-input"
              type="checkbox"
              name={props.type}
              id={filter}
              value={filter}
              checked={props.checked === filter}
              onChange={() => props.checked === filter ? props.selectFilter(undefined) : props.selectFilter(filter)}
            />
            <label className="filter-label" htmlFor={filter}>
              {
                filterLists[props.type].type === 'image' ?
                <img className="filter-image" src={process.env.PUBLIC_URL + '/images/' + filter + '.png'} alt={filter} /> :
                <div className="filter-text">{filterLists[props.type].names[index]}</div>
              }
            </label>
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default TypeFilter;