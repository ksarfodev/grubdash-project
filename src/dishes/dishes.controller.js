const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

//Add middleware and handlers for dishes to this file, 
//then export the functions for use by the router.


//list
function list(req, res) {
  const { dishId } = req.params;
  //list() function will filter the dishes by dishId if the dishId is in route parameter.
  res.json({
    data: dishes.filter(dishId ? (dish) => dish.id == dishId : () => true),
  });
}

//create
function create(req, res) {
  const { data: { name, description, price, image_url } = {} } = req.body;
  const newDish = {
    id: nextId(),
    name: name,
    description: description,
    price: price,
    image_url: image_url,
  };

  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

//read
function read(req, res) {
  res.json({ data: res.locals.dish });
}

//update
function update(req, res) {
  const dish = res.locals.dish;
  const { data: { name, description, price, image_url } = {} } = req.body;

  //ensure that id property of dish is not overwritten

  dish.name = name;
  dish.description = description;
  dish.price = price;
  dish.image_url = image_url;

  res.json({ data: dish });
}

//validation
function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

//check if id in the body does not match :dishId in the route
function dishIdIsValid(req, res, next) {
  //param
  const dishId = req.params.dishId;

  //body
  //destructure id from req.body
  const { data: { id } = {} } = req.body;

  //if id is valid then compare it to dishId found in parameter otherwise
  //return true
  const idsMatch = id ? dishId === id : () => true;

  if (idsMatch) {
    return next();
  }
  next({
    status: 400,
    message: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}`,
  });
}

//confirm dish exists before doing anything else
function dishExists(req, res, next) {
  const dishId = req.params.dishId;
  const foundDish = dishes.find((dish) => dish.id === dishId);

  if (foundDish) {
    res.locals.dish = foundDish;
    return next();
  }
  next({
    status: 404,
    message: `Dish does not exist: ${req.params.dishId}`,
  });
}

//Dish must have a price that is an integer greater than 0
function priceIsValidNumber(req, res, next) {
  const { data: { price } = {} } = req.body;
  if (price <= 0 || !Number.isInteger(price)) {
    return next({
      status: 400,
      message: "Dish must have a price that is an integer greater than 0",
    });
  }
  next();
}

module.exports = {
  create: [
    bodyDataHas("name"),
    bodyDataHas("description"),
    bodyDataHas("price"),
    bodyDataHas("image_url"),
    priceIsValidNumber,
    create,
  ],
  list,
  read: [dishExists, read], //place dishExists first
  update: [
    dishExists, //place dishExists first
    bodyDataHas("name"),
    bodyDataHas("description"),
    bodyDataHas("price"),
    bodyDataHas("image_url"),
    dishIdIsValid,
    priceIsValidNumber,
    update,
  ],
  dishExists,
};
