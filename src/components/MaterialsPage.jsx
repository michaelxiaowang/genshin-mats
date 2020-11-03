import React from 'react';
import "./MaterialsPage.css";

function MaterialsPage(props) {
    let materials = {};
    Object.entries(props.state)
        .filter(([key, value]) => value['stage'] !== -1)
        .forEach(([key, value]) => {
            const element = props.characters[key.toLowerCase()].type;
            const elemental = element !== 'flex' ? props.materials[element + '_elemental'].name : undefined;
            const specialty = props.materials[props.characters[key.toLowerCase()].specialty].name;
            for (let i = value.stage; i < 6; i++) {
                let stage = props.stages.characters[i];
                const crystal = props.materials[(element === 'flex' ? 'diamond' : element)+ '_crystal_' + stage.crystal_stg].name;
                const common = props.materials[props.characters[key.toLowerCase()].common + '_' + stage.common_stg].name;
                materials[crystal] = materials.hasOwnProperty(crystal) ? materials[crystal] + stage.crystal_qty : stage.crystal_qty;
                materials[elemental] = materials.hasOwnProperty(elemental) ? materials[elemental] + stage.elemental_qty : stage.elemental_qty;
                materials[specialty] = materials.hasOwnProperty(specialty) ? materials[specialty] + stage.specialty_qty : stage.specialty_qty;
                materials[common] = materials.hasOwnProperty(common) ? materials[common] + stage.common_qty : stage.common_qty;
                materials.mora = materials.hasOwnProperty('mora') ? materials.mora + stage.mora: stage.mora
            }
        });
    let names = Object.keys(materials);
    names = Object.values(props.materials).map(material => material.name).filter(name  => names.includes(name));

    return (
        <div>
            <h1>Materials</h1>
            <ul className="material-list">
                {
                    names.map(material => (
                        <li className="material" key={material}>
                            <img className="material-image" src={getImagePath(material)} alt={material}></img>
                            <label className="material-text">{material} - {materials[material]}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

function getImagePath(material) {
    return process.env.PUBLIC_URL + '/images/materials/' + material.toLowerCase().replaceAll(' ', '_') + '.png'
}

export default MaterialsPage