import React from 'react';
import "./MaterialsPage.css";

function MaterialsPage(props) {
    console.log(props);
    let materials = {};
    Object.entries(props.state).forEach(([key, value]) => {
        const element = props.characters[key.toLowerCase()].type;
        const elemental = props.materials[element + '_elemental'].name;
        console.log(props.materials);
        const specialty = props.materials[props.characters[key.toLowerCase()].specialty].name;
        for (let i = value.stage; i < 6; i++) {
            let stage = props.stages.characters[i];
            const crystal = props.materials[element + '_crystal_' + stage.crystal_stg].name;
            const common = props.materials[props.characters[key.toLowerCase()].common + '_' + stage.common_stg].name;
            materials[crystal] = materials.hasOwnProperty(crystal) ? materials[crystal] + stage.crystal_qty : stage.crystal_qty;
            materials[elemental] = materials.hasOwnProperty(elemental) ? materials[elemental] + stage.elemental_qty : stage.elemental_qty;
            materials[specialty] = materials.hasOwnProperty(specialty) ? materials[specialty] + stage.specialty_qty : stage.specialty_qty;
            materials[common] = materials.hasOwnProperty(common) ? materials[common] + stage.common_qty : stage.common_qty;
            materials.mora = materials.hasOwnProperty('mora') ? materials.mora + stage.mora: stage.mora
        }
    });
    return (
        <div>
            <h1>Materials</h1>
            <div>
                {
                    Object.entries(materials).map(([key, value]) => (
                        <div>
                            <h3>{key} X {value}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MaterialsPage