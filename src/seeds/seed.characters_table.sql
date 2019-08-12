BEGIN;

  TRUNCATE
  characters
  RESTART IDENTITY CASCADE;

  INSERT INTO characters
    ("charName", "charRace", "charClass", "charDesc")
  VALUES
    ('Grog', 'Goliath', 'Barbarian', 'A goliath barbarian part of the group called Vox Machina.'),
    ('Keyleth', 'Half Elf', 'Druid', 'A half elf druid part of the group called Vox Machina.'),
    ('Percy', 'Human', 'Fighter', 'A human gunslinger part of the group called Vox Machina.'),
    ('Pike', 'Gnome', 'Cleric', 'A gnome cleric part of the group called Vox Machina.'),
    ('Scanlan', 'Gnome', 'Bard', 'A gnome bard part of the group called Vox Machina.'),
    ('Vax', 'Half Elf', 'Rogue', 'A half elf rogue part of the group called Vox Machina.'),
    ('Grog', 'Half Elf', 'Ranger', 'A half elf ranger part of the group called Vox Machina.');

COMMIT;