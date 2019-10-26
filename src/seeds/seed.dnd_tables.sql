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
    ("charName", "charRace", "charClass", "charDesc", "userId", "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma")
  VALUES
    ('Gilmore', 'Human', 'Sorcerer', 'The owner of Gilmore''s Glorious Goods.', '4750995c-0782-4ade-8085-c181be1129e4', '10', '12', '12', '14', '14', '20'),
    ('Victor', 'Human', 'Commoner', 'A vendor of mining products in Vasselheim.', '4750995c-0782-4ade-8085-c181be1129e4', '8', '8', '8', '14', '12', '8'),
    ('J''mon Sa Ord', 'Ancient Brass Dragon', 'Ruler', 'The ruler of Ank''Harel.', '4750995c-0782-4ade-8085-c181be1129e4', '30', '14', '29', '18', '17', '28'),
    ('Grog', 'Goliath', 'Barbarian', 'A goliath barbarian part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389', '26', '15', '22', '6', '10', '13'),
    ('Keyleth', 'Half Elf', 'Druid', 'A half elf druid part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389', '14', '15', '14', '15', '22', '10'),
    ('Percy', 'Human', 'Fighter', 'A human gunslinger part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389', '12', '22', '14', '20', '16', '14'),
    ('Pike', 'Gnome', 'Cleric', 'A gnome cleric part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389', '19', '12', '14', '13', '20', '14'),
    ('Scanlan', 'Gnome', 'Bard', 'A gnome bard part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389', '13', '11', '16', '16', '7', '22'),
    ('Vax', 'Half Elf', 'Rogue', 'A half elf rogue part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389', '14', '20', '11', '16', '14', '14'),
    ('Vex', 'Half Elf', 'Ranger', 'A half elf ranger part of the group called Vox Machina.', '652bcd48-c986-41d0-afd3-e460f779f389', '7', '20', '10', '14', '16', '17');
COMMIT;