const getBotOptions = (req, res) => {
    const options = [
        {
            name: 'About Product?',
            subOptions: ['Product wrong delivered', 'Product not delivered', 'Damaged product received', 'Missing parts in product']
        },
        {
            name: 'Order & Payment Issues',
            subOptions: ['Payment failed', 'Order not confirmed', 'Need invoice', 'Order cancellation request']
        },
        {
            name: 'Delivery & Tracking',
            subOptions: ['Delayed delivery', 'Wrong address update', 'Tracking not updating', 'Change delivery date']
        },
        {
            name: 'Contact Support',
            subOptions: ['Send an email', 'Call customer service', 'Live chat support', 'Request a callback']
        }
    ];

    res.json(options);
};

export default getBotOptions;
