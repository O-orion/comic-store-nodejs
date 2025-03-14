const validateComic = (req, res, next) => {
    const { title, price, stock } = req.body;

    if (!title || !price || stock === undefined ) {
        return res.status(400).json({ message: 'Title, price, and stock are required' });
    }

    if (price < 0 || stock < 0) {
        return res.status(400).json({ message: 'Price and stock must be non-negative' })
    }

    next();
}

module.exports = validateComic;
