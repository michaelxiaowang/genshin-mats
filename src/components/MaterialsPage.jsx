import React from 'react';
import "./MaterialsPage.css";

function MaterialsPage(props) {
  let materials = {};
  Object.entries(props.state.characters)
    .filter(([key, value]) => value['stage'] !== -1)
    .forEach(([key, value]) => {
      const characters = props.characters;
      const character = key;
      const details = characters[character];
      const element = props.characters[key.toLowerCase()].type;
      const elemental = element !== 'flex' ? props.materials[element + '_elemental'].name : undefined;
      const specialty = props.materials[props.characters[key.toLowerCase()].specialty].name;
      // character ascension
      for (let i = value.stage; i < 6; i++) {
        let stage = props.stages.characters[i];
        const crystal = props.materials[(element === 'flex' ? 'diamond' : element) + '_crystal_' + stage.crystal_stg].name;
        const common = props.materials[props.characters[key.toLowerCase()].common + '_' + stage.common_stg].name;
        materials[crystal] = materials.hasOwnProperty(crystal) ? materials[crystal] + stage.crystal_qty : stage.crystal_qty;
        materials[elemental] = materials.hasOwnProperty(elemental) ? materials[elemental] + stage.elemental_qty : stage.elemental_qty;
        materials[specialty] = materials.hasOwnProperty(specialty) ? materials[specialty] + stage.specialty_qty : stage.specialty_qty;
        materials[common] = materials.hasOwnProperty(common) ? materials[common] + stage.common_qty : stage.common_qty;
        addMaterial(materials, 'Mora', stage.mora);
      }
      // talent ascension
      let talents = {};
      if (character === 'traveler') {
        Object.values(value.talents).reduce((allTalents, elementalTalents) => {
          return Object.assign(allTalents, { ...elementalTalents });
        }, talents);
      } else {
        talents = value.talents;
      }
      Object.entries(talents).forEach(([talent, level]) => {
        for (let i = level - 1; i < 9; i++) {
          const requirements = props.stages.talents[i];
          const talent_boss_qty = requirements.talent_boss_qty;
          const talent_book_stg = requirements.talent_book_stg;
          const talent_book_qty = requirements.talent_book_qty;
          const common_qty = requirements.common_qty;
          const common_stg = requirements.common_stg;
          const talent_boss = props.materials[details.talent_boss].name;
          const talent_book = props.materials[(character === 'traveler' ? details.talent_book[i % 3] : details.talent_book) + "_" + talent_book_stg].name;
          const common = props.materials[(character === 'traveler' ? details.talent_common : details.common) + "_" + common_stg].name;
          addMaterial(materials, talent_boss, talent_boss_qty);
          addMaterial(materials, talent_book, talent_book_qty);
          addMaterial(materials, common, common_qty);
          addMaterial(materials, 'Mora', requirements.mora);
        }
      })
    });
  
  calculateWeaponMaterials(materials, props.state.weapons, props.stages.weapons, props.weapons, props.materials);
  let names = Object.keys(materials);
  names = Object.values(props.materials).map(material => material.name).filter(name => names.includes(name));

  return (
    <div>
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
    </div>
  )
}

function calculateWeaponMaterials(materials, weaponState, weaponStages, weaponInfo, materialInfo) {
  Object.entries(weaponState)
    .filter(([key, value]) => value['stage'] !== -1)
    .forEach(([key, value]) => {
        const weapon = key;
        const details = weaponInfo[weapon];
        for (let i = value.stage; i < 6; i++) {
          const requirements = weaponStages[details.rarity][i];
          const weapon_material = materialInfo[`${details.weapon}_${requirements.weapon_stg}`].name;
          const common_material1 = materialInfo[`${details.common1}_${requirements.common_stg}`].name;
          const common_material2 = materialInfo[`${details.common2}_${requirements.common_stg}`].name;
          const weapon_qty = requirements.weapon_qty;
          const common_qty_1 = requirements.common_qty_1;
          const common_qty_2 = requirements.common_qty_2;
          addMaterial(materials, weapon_material, weapon_qty);
          addMaterial(materials, common_material1, common_qty_1);
          addMaterial(materials, common_material2, common_qty_2);
        }
    });
}

function addMaterial(materials, name, qty) {
  materials[name] = materials.hasOwnProperty(name) ? materials[name] + qty : qty;
}

function getImagePath(material) {
  const name = material.toLowerCase().replaceAll(' ', '_').replaceAll('\'', '').replaceAll('"', '');
  return process.env.PUBLIC_URL + '/images/materials/' + name + '.png'
}

export default MaterialsPage