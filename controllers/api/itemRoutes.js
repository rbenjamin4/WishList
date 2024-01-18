const router = require('express').Router();
const { Item } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const allItems = await Item.findAll()
  
      res.status(200).json(allItems);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try{
        const newItem = await Item.create({
            ...req.body,
        });

        res.status(200).json(newItem);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
      const itemData = await Item.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!itemData[0]) {
        res.status(404).json({ message: 'No item with this id!' });
        return;
      }
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
    }
});

  router.delete('/:id', async (req, res) => {
    try {
      const itemData = await Item.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!itemData) {
        res.status(404).json({ message: 'No item with this id!' });
        return;
      }
      res.status(200).json(itemData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;