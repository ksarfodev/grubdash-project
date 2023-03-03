const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

//Add middleware and handlers for orders to this file,
// then export the functions for use by the router.


function create(req, res) {
  const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;

  const newOrder = {
    id: nextId(),
    deliverTo: deliverTo,
    mobileNumber: mobileNumber,
    status: status,
    dishes: dishes,
  };

  orders.push(newOrder);
  res.status(201).json({ data: newOrder });
}

function destroy(req, res) {
  const { orderId } = req.params;

  const index = orders.findIndex((order) => order.id === orderId);
  if (index > -1) {
    orders.splice(index, 1);
  }
  res.sendStatus(204);
}

function list(req, res) {
  const { orderId } = req.params;
  //list() function will filter the orders by orderId if the orderId is in route parameter.
  res.json({
    data: orders.filter(orderId ? (order) => order.id == orderId : () => true),
  });
}

function read(req, res) {
  res.json({ data: res.locals.order });
}

function update(req, res) {
  const order = res.locals.order;

  const { data: { deliverTo, mobileNumber, status, dishes } = {} } = req.body;

  //ensure that id property of order is not overwritten

  //perform update
  order.deliverTo = deliverTo,
  order.mobileNumber = mobileNumber,
  order.status = status,
  order.dishes = dishes;

  res.json({ data: order });
}

//validation
function orderExists(req, res, next) {
  const orderId = req.params.orderId;
  const foundOrder = orders.find((order) => order.id === orderId);

  if (foundOrder) {
    res.locals.order = foundOrder;
    return next();
  }
  next({
    status: 404,
    message: `Order id not found: ${req.params.orderId}`,
  });
}

//check if dishes property is valid
function dishesPropertyIsValid(req, res, next) {
  const { data: { dishes } = {} } = req.body;

  const validDishes = Array.isArray(dishes) && dishes.length > 0;

  if (validDishes) {
    return next();
  }
  next({
    status: 400,
    message: `Order must include at least one dish`,
  });
}


//check if order id is valid
function orderIdIsValid(req, res, next) {
  //param
  const orderId = req.params.orderId;
  //body
  //desctructure id from req.body
  const { data: { id } = {} } = req.body;

  //if id is valid the compare it to orderId found in parameter otherwise
  //return true
  const idsMatch = id ? orderId === id : () => true;

  if (idsMatch) {
    return next();
  }

  next({
    status: 400,
    message: `Order id does not match route id. Order: ${id}, Route: ${orderId}`,
  });
}

//check if status property is missing
function statusPropertyIsValid(req, res, next) {
  const { data: { status } = {} } = req.body;
  const validStatus = ["pending", "preparing", "out-for-delivery", "delivered"];

  if (validStatus.includes(status)) {
    return next();
  }
  next({
    status: 400,
    message: `Order must have a status of ${validStatus}`,
  });
}

//check if order is delivered and cannot be changed
function orderCannotBeChanged(req, res, next) {
  const { data: { status } = {} } = req.body;

  if (status !== "delivered") {
    return next();
  }
  next({
    status: 400,
    message: `A delivered order cannot be changed`,
  });
}

//check if dish quantity is valid
function dishQuantityIsValid(req, res, next) {
  const { data: { dishes } = {} } = req.body;

  //loop through each dish in dish array to find an item with invalid dish quantity then return an error
  dishes.map((dish, index) => {
    if (!dish.quantity || dish.quantity <= 0 || !Number.isInteger(dish.quantity)
    ) {
      next({
        status: 400,
        message: `Dish ${index} must have a quantity that is an integer greater than 0`,
      });
    }
  });
  //quantity property in dishes array are all valid
  return next();
}

//validate before deleting order
function orderCannotBeDeleted(req, res, next) {
  const status = res.locals.order.status;

  if (status === "pending") {
    return next();
  }
  next({
    status: 400,
    message: `An order cannot be deleted unless it is pending.`,
  });
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}


module.exports = {
  create: [
    bodyDataHas("deliverTo"),
    bodyDataHas("mobileNumber"),
    bodyDataHas("dishes"),
    dishesPropertyIsValid,
    dishQuantityIsValid,
    create,
  ],
  list,
  read: [orderExists, read],
  update: [
    orderExists,
    bodyDataHas("deliverTo"),
    bodyDataHas("mobileNumber"),
    bodyDataHas("dishes"),
    dishesPropertyIsValid,
    dishQuantityIsValid,
    statusPropertyIsValid,
    orderIdIsValid,
    orderCannotBeChanged,
    update,
  ],
  delete: [orderExists, orderCannotBeDeleted, destroy],
  orderExists,
};
