import Characters from './data/characters.json';
import Weapons from './data/weapons.json';
import Materials from './data/materials.json';
import Stages from './data/stages.json';

export const calculateCharacterMaterials = (character, stage) => {
  if (stage < 0 || stage >= 6) return {};
  const details = Characters[character];
  const requirements = Stages.characters[stage];
  const element = details.type;
  const crystal = Materials[element + '_crystal_' + requirements.crystal_stg].name;
  const elemental = element === 'flex' ? undefined : Materials[element + '_elemental'].name;
  const specialty = Materials[details.specialty].name;
  const common = Materials[details.common + '_' + requirements.common_stg].name;
  return Object.assign({}, {
    [crystal]: requirements.crystal_qty,
    [elemental]: requirements.elemental_qty,
    [specialty]: requirements.specialty_qty,
    [common]: requirements.common_qty,
    'Mora': requirements.mora
  });
}

export const calculateTalentMaterials = (character, level) => {
  if (level > 8) return {};
  const details = Characters[character];
  const requirements = Stages.talents[level];
  const talent_boss = Materials[details.talent_boss].name;
  const talent_book = Materials[(character === 'traveler' ? details.talent_book[level % 3] : details.talent_book) + "_" + requirements.talent_book_stg].name;
  const common = Materials[(character === 'traveler' ? details.talent_common : details.common) + "_" + requirements.common_stg].name;
  return Object.assign({}, {
    'Crown of Sagehood': requirements.crown_qty,
    [talent_boss]: requirements.talent_boss_qty,
    [talent_book]: requirements.talent_book_qty,
    [common]: requirements.common_qty,
    'Mora': requirements.mora
  });
}

export const calculateWeaponMaterials = (weapon, stage) => {
  if (stage < 0 || stage >= 6) return {};
  const details = Weapons[weapon];
  const requirements = Stages.weapons[details.rarity][stage];
  const weapon_material = Materials[`${details.weapon}_${requirements.weapon_stg}`].name;
  const common_material1 = Materials[`${details.common1}_${requirements.common_stg}`].name;
  const common_material2 = Materials[`${details.common2}_${requirements.common_stg}`].name;
  return Object.assign({}, {
    [weapon_material]: requirements.weapon_qty,
    [common_material1]: requirements.common_qty_1,
    [common_material2]: requirements.common_qty_2,
    'Mora': requirements.mora
  });
}