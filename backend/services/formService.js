const Form = require('../models/formModel')

const createForm = (formData) => {
    const newForm = new Form ({formData})
    return newForm
}

const updateForm = async (formId, formData) => {
    const updatedForm = await Form.findByIdAndUpdate(formId, formData , 
        {
            new: true,
        });
    return updatedForm
}

const getFormById = async (formId) => {
    const existingForm = await Form.findById(formId)
    return existingForm;
}

const getAllForms = async (userId) => {
    const forms = await Form.findOne({userId : userId})
    return forms;
}

const deleteFormById = async (formId) => {
    const form = await Form.findByIdAndDelete(formId)
    return res.json({message : "Form is deleted"})
}

module.exports = {
    createForm,
    updateForm,
    getFormById,
    getAllForms,
    deleteFormById
}