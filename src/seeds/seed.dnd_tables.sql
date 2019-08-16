BEGIN;

  TRUNCATE
  characters,
  dnd_users
  RESTART IDENTITY CASCADE;

  INSERT INTO dnd_users
    ("userName", "fullName", "nickname", "password")
  VALUES
    ('mmercer', 'Matt Mercer', 'DM', '$2a$10$.cjJiQptZs/F87AOfcpWz.eV0usrIkQMk9GmI/20ZlP2qaihXdcxa'),
    ('voxMachina', 'Vox Machina', 'VM', '$2a$10$q0KlxddLFXeJ3Fx7QvSmCOBrW43PFzfUDDNU/OdrmHqEOq10yMwcK');

  INSERT INTO characters
    ("charName", "charRace", "charClass", "charDesc", "userId")
  VALUES
    ('Gilmore', 'Human', 'Sorcerer', 'The owner of Gilmore''s Glorious Goods.', 1),
    ('Victor', 'Human', 'Commoner', 'A vendor of mining products in Vasselheim.', 1),
    ('J''mon Sa Ord', 'Ancient Brass Dragon', 'Ruler', 'The ruler of Ank''Harel.', 1),
    ('Grog', 'Goliath', 'Barbarian', 'A goliath barbarian part of the group called Vox Machina.', 2),
    ('Keyleth', 'Half Elf', 'Druid', 'A half elf druid part of the group called Vox Machina.', 2),
    ('Percy', 'Human', 'Fighter', 'A human gunslinger part of the group called Vox Machina.', 2),
    ('Pike', 'Gnome', 'Cleric', 'A gnome cleric part of the group called Vox Machina.', 2),
    ('Scanlan', 'Gnome', 'Bard', 'A gnome bard part of the group called Vox Machina.', 2),
    ('Vax', 'Half Elf', 'Rogue', 'A half elf rogue part of the group called Vox Machina.', 2),
    ('Vex', 'Half Elf', 'Ranger', 'A half elf ranger part of the group called Vox Machina.', 2);

COMMIT;