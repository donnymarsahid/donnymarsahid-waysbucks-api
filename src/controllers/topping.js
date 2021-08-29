const { topping } = require('../../models');

exports.getToppings = async (req, res) => {
  try {
    const toppings = await topping.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    res.send({
      status: 'success',
      data: {
        toppings,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.detailTopping = async (req, res) => {
  try {
    const idTopping = req.params.id;
    const findTopping = await topping.findOne({
      where: {
        id: idTopping,
      },
    });
    const { id, title, price, image } = findTopping;
    res.send({
      status: 'success',
      data: {
        topping: {
          id,
          title,
          price,
          image,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.addTopping = async (req, res) => {
  const toppingExists = await topping.findOne({
    where: {
      title: req.body.title,
    },
  });
  if (toppingExists) {
    res.status(500).send({
      status: 'failed',
      message: 'topping already exists',
    });
    return false;
  }
  try {
    const newTopping = await topping.create({ ...req.body });
    const { id, title, price, image } = newTopping;
    res.send({
      status: 'success',
      data: {
        topping: {
          id,
          title,
          price,
          image,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.updateTopping = async (req, res) => {
  try {
    const idTopping = req.params.id;
    await topping.update(req.body, {
      where: {
        id: idTopping,
      },
    });
    const findTopping = await topping.findOne({
      where: {
        id: idTopping,
      },
    });
    const { id, title, price, image } = findTopping;
    res.send({
      status: 'success',
      data: {
        topping: {
          id,
          title,
          price,
          image,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteTopping = async (req, res) => {
  try {
    const { id } = req.params;
    await topping.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success',
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
