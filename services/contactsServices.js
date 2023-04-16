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

const deleteContact = async () => {};

const updateContact = async () => {};

module.exports = {
  getAll,
  addContact,
  deleteContact,
  updateContact,
};
