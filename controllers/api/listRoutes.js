const router = require('express').Router();
const { List } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allLists = await List.findAll()

    res.status(200).json(allLists);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newList = await List.create({
      ...req.body
    });

    res.status(200).json(newList);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  try {
    const listData = await List.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!listData[0]) {
      res.status(404).json({ message: 'No list with this id!' });
      return;
    }
    res.status(200).json(listData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const listData = await List.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!listData) {
      res.status(404).json({ message: 'No list with this id!' });
      return;
    }
    res.status(200).json(listData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
