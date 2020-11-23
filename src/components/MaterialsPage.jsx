import React, {useState} from 'react';
import TypeFilter from './TypeFilter';
import { calculateCharacterMaterials, calculateTalentMaterials, calculateWeaponMaterials } from '../utils';
import "./MaterialsPage.css";

function MaterialsPage(props) {
  const [searchText, setSearchText] = useState('');
  const [dayGroup, setDayGroup] = useState(undefined);
  const [materialType, setMaterialType] = useState(undefined);

  let materials = {};
  Object.entries(props.state.characters)
    .filter(([key, value]) => value['stage'] !== -1)
    .forEach(([key, value]) => {
      // character ascension materials
      for (let i = value.stage; i < 6; i++) {
        Object.entries(calculateCharacterMaterials(key, i)).forEach(([item, item_qty]) => {
          addMaterial(materials, item, item_qty);
        });
      }
      // flatten traveler talents for different elements to one object
      let talents = {};
      if (key === 'traveler') {
        Object.values(value.talents).reduce((allTalents, elementalTalents) => {
          return Object.assign(allTalents, { ...elementalTalents });
        }, talents);
      } else {
        talents = value.talents;
      }
      // talent ascension materials
      Object.values(talents).forEach((level) => {
        for (let i = level - 1; i < 9; i++) {
          Object.entries(calculateTalentMaterials(key, i)).forEach(([item, item_qty]) => {
            addMaterial(materials, item, item_qty);
          });
        }
      })
    });
  
  // weapon ascension materials
  Object.entries(props.state.weapons)
    .filter(([key, value]) => value['stage'] !== -1)
    .forEach(([key, value]) => {
      for (let i = value.stage; i < 6; i++) {
        Object.entries(calculateWeaponMaterials(key, i)).forEach(([item, item_qty]) => {
          addMaterial(materials, item, item_qty);
        });
      }
    });
  let names = Object.keys(materials);
  names = Object.values(props.materials)
    .filter(material => material.name.toLowerCase().includes(searchText.toLowerCase()))
    .filter(material => dayGroup === undefined || !material.hasOwnProperty('day_group') || (material.hasOwnProperty('day_group') && material.day_group === dayGroup))
    .filter(material => !materialType || material.type === materialType)
    .map(material => material.name).filter(name => names.includes(name));

  return (
    <>
      <div className="filters">
        <div className="search-filter">
          <input
            type="text"
            value={searchText}
            placeholder="Search for a material..."
            onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <TypeFilter type="material" checked={materialType} selectFilter={setMaterialType} />
        <TypeFilter type="days" checked={dayGroup} selectFilter={setDayGroup} />
      </div>
      <ul className="material-list">
        {
          names.map(material => (
            <li className="material" key={material}>
              <div className="material-image-container">
                <img className="material-image" src={getImagePath(material)} alt={material} />
              </div>
              <label className="material-text">{material} - {materials[material].toLocaleString()}</label>
            </li>
          ))
        }
      </ul>
    </>
  )
}

function addMaterial(materials, name, qty) {
  materials[name] = materials.hasOwnProperty(name) ? materials[name] + qty : qty;
}

function getImagePath(material) {
  const name = material.toLowerCase().replaceAll(' ', '_').replaceAll('\'', '').replaceAll('"', '');
  return process.env.PUBLIC_URL + '/images/materials/' + name + '.png'
}

export default MaterialsPage