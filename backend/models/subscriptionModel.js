const mongoose = require('mongoose')

const subscriptionModel = new mongoose.Schema(
    {
        plan_name: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        customer_id: {
            type: String,
        }
    },
    {timestamps: true},
)

module.exports = mongoose.model("Subscription", subscriptionModel)