const Contact = require("../db/models/contactModel");

const getAll = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const addContact = async (data) => {
  const contact = new Contact(data);
  await contact.save();
  return contact;
};

const deleteContact = async (id, data) => {
  await Contact.findByIdAndRemove(id, data);
};

const updateContact = async (fields, data) => {
  const contact = await Contact.findByIdAndUpdate(fields, data, {new:true});
  return contact;
};

module.exports = {
  getAll,
  addContact,
  deleteContact,
  updateContact,
};
