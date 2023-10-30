const Subscription = require('../models/subscriptionModel')

const createSubscription = (subscriptionData) => {
    const newSubscription = new Subscription ({subscriptionData})
    return newSubscription
}

const updateSubscription = async (subscriptionId, subscriptionData) => {
    const updatedSubscription = await Subscription.findByIdAndUpdate(subscriptionId, subscriptionData , 
        {
            new: true,
        });
    return updatedSubscription
}

const getSubscriptionById = async (subscriptionId) => {
    const existingSubscription = await Subscription.findById(subscriptionId)
    return existingSubscription;
}

// const getAllSubscriptions = async (userId) => {
//     const Subscriptions = await Subscription.findOne({userId : userId})
//     return Subscriptions;
// }

const deleteSubscriptionById = async (subscriptionId) => {
    const Subscription = await Subscription.findByIdAndDelete(subscriptionId)
    return res.json({message : "Subscription is deleted"})
}

module.exports = {
    createSubscription,
    updateSubscription,
    getSubscriptionById,
    // getAllSubscriptions,
    deleteSubscriptionById
}