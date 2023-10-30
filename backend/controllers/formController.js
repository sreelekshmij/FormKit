const formService = require('../services/formService');

const createForm = (req, res) => {
  const formData = req.body;
  const newForm = formService.createForm(formData);
  res.json(newForm);
};

const updateForm = async (req, res) => {
  const formId = req.params.formId;
  const formData = req.body;
  const updatedForm = await formService.updateForm(formId, formData);
  res.json(updatedForm);
};

const getFormById = async (req, res) => {
  const formId = req.params.formId;
  const existingForm = await formService.getFormById(formId);
  res.json(existingForm);
};

const getAllForms = async (req, res) => {
  const userId = req.params.userId;
  const forms = await formService.getAllForms(userId);
  res.json(forms);
};

const deleteFormById = async (req, res) => {
  const formId = req.params.formId;
  await formService.deleteFormById(formId);
  res.json({ message: 'Form is deleted' });
};

module.exports = {
  createForm,
  updateForm,
  getFormById,
  getAllForms,
  deleteFormById
};
