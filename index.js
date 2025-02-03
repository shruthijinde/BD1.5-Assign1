const express = require('express');
const app = express();

app.get('/cart-total', (req, res) => {
    let newItemPrice = parseFloat(req.query.newItemPrice) || 0;
    let cartTotal = parseFloat(req.query.cartTotal) || 0;
    let totalCartValue = cartTotal + newItemPrice;
    res.send(`Total cart value: ${totalCartValue.toFixed(2)}`);
});

app.get('/membership-discount', (req, res) => {
    let cartTotal = parseFloat(req.query.cartTotal) || 0;
    let isMember = req.query.isMember === 'true';
    let discount = isMember ? 0.1 : 0;
    let finalPrice = cartTotal - (cartTotal * discount);
    res.send(`Final price after discount: ${finalPrice.toFixed(2)}`);
});

app.get('/calculate-tax', (req, res) => {
    let cartTotal = parseFloat(req.query.cartTotal) || 0;
    const taxRate = 0.08;
    let taxAmount = cartTotal * taxRate;
    res.send(`Tax applied on cart total: ${taxAmount.toFixed(2)}`);
});

app.get('/estimate-delivery', (req, res) => {
    let shippingMethod = req.query.shippingMethod;
    let distance = parseFloat(req.query.distance) || 0;
    let daysPerKm = shippingMethod === 'Standard' ? 1 / 50 : 1 / 100;
    let deliveryDays = Math.ceil(distance * daysPerKm);
    res.send(`Estimated delivery time: ${deliveryDays} days`);
});

app.get('/shipping-cost', (req, res) => {
    let weight = parseFloat(req.query.weight) || 0;
    let distance = parseFloat(req.query.distance) || 0;
    let shippingCost = weight * distance * 0.1;
    res.send(`Shipping cost: ${shippingCost.toFixed(2)}`);
});

app.get('/loyalty-points', (req, res) => {
    let purchaseAmount = parseFloat(req.query.purchaseAmount) || 0;
    let loyaltyPoints = Math.floor(purchaseAmount / 10);
    res.send(`Loyalty points earned: ${loyaltyPoints}`);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

