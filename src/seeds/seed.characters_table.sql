BEGIN;

  TRUNCATE
  characters
  RESTART IDENTITY CASCADE;

  INSERT INTO characters
    (charName, charRace, charClass, charDesc)
  VALUES
    ('Grog', 'Goliath', 'Barbarian', 'A goliath barbarian part of the group called Vox Machina.'),
    ('Keyleth', 'Half Elf', 'Druid', 'A half elf druid part of the group called Vox Machina.'),
    ('Percy', 'Human', 'Fighter', 'A human gunslinger part of the group called Vox Machina.'),
    ('Pike', 'Gnome', 'Cleric', 'A goliath barbarian part of the group called Vox Machina.'),
    ('Grog', 'Goliath', 'Barbarian', 'A goliath barbarian part of the group called Vox Machina.'),
    ('Grog', 'Goliath', 'Barbarian', 'A goliath barbarian part of the group called Vox Machina.'),
    ('Grog', 'Goliath', 'Barbarian', 'A goliath barbarian part of the group called Vox Machina.'),
