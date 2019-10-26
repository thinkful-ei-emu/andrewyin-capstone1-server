BEGIN;

  TRUNCATE
  characters,
  dnd_users
  RESTART IDENTITY CASCADE;

  INSERT INTO dnd_users
    ("userId", "userName", "fullName", "nickname", "password")
  VALUES
    ('4750995c-0782-4ade-8085-c181be1129e4', 'mmercer', 'Matt Mercer', 'DM', '$2a$10$.cjJiQptZs/F87AOfcpWz.eV0usrIkQMk9GmI/20ZlP2qaihXdcxa'),
    ('652bcd48-c986-41d0-afd3-e460f779f389', 'voxMachina', 'Vox Machina', 'VM', '$2a$10$q0KlxddLFXeJ3Fx7QvSmCOBrW43PFzfUDDNU/OdrmHqEOq10yMwcK');

  INSERT INTO characters
    ("charName", "charRace", "charClass", "charDesc", "userId")
  VALUES
    ('Gilmore', 'Human', 'Sorcerer', 'The owner of Gilmore''s Glorious Goods.', '4750995c-0782-4ade-8085-c181be1129e4'),
    ('Victor', 'Human', 'Commoner', 'A vendor of mining products in Vasselheim.', '4750995c-0782-4ade-8085-c181be1129e4'),
    ('J''mon Sa Ord', 'Ancient Brass Dragon', 'Ruler', 'The ruler of Ank''Harel.', '4750995c-0782-4ade-8085-c181be1129e4'),
    ('Grog', 'Goliath', 'Barbarian', 'A goliath barbarian part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389'),
    ('Keyleth', 'Half Elf', 'Druid', 'A half elf druid part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389'),
    ('Percy', 'Human', 'Fighter', 'A human gunslinger part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389'),
    ('Pike', 'Gnome', 'Cleric', 'A gnome cleric part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389'),
    ('Scanlan', 'Gnome', 'Bard', 'A gnome bard part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389'),
    ('Vax', 'Half Elf', 'Rogue', 'A half elf rogue part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389'),
    ('Vex', 'Half Elf', 'Ranger', 'A half elf ranger part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389');
COMMIT;