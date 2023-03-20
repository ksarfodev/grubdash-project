# grubdash-project

A RESTful API built using Express
### Routes

#### Live Demo API
> https://project-grubdash-hybs.onrender.com/

#### `GET /dishes`
This route will respond with a list of all existing dish data.

**Example request**
```
GET http://localhost:5000/dishes
```

**Example response**
```
{
  "data": [
    {
      "id": "d351db2b49b69679504652ea1cf38241",
      "name": "Dolcelatte and chickpea spaghetti",
      "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
      "price": 19,
      "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
    }
  ]
}
```

#### `POST /dishes`
This route will save the dish and respond with the newly created dish.

##### Validation
* A dish must include a `name` property that is not empty
* A dish must include a `description` property that is not empty
* A dish must include a `price` that is an integer greater than 0
* A dish must include a `image_url` property that is not empty

**Example request**
```
POST http://localhost:5000/dishes
```

Body:
```
{
  "data": {
    "name": "Dolcelatte and chickpea spaghetti",
    "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
    "price": 19,
    "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
  }
}
```

**Example response**

Status 201
```
{
  "data": {
    "id": "d351db2b49b69679504652ea1cf38241",
    "name": "Dolcelatte and chickpea spaghetti",
    "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
    "price": 19,
    "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
  }
}
```

#### `GET /dishes/:dishId`

This route will respond when a matching dish id is found.

**Example request**
```
GET http://localhost:5000/dishes/3c637d011d844ebab1205fef8a7e36ea
```

**Example response**

Status 200
```
{
    "data": {
        "id": "3c637d011d844ebab1205fef8a7e36ea",
        "name": "Broccoli and beetroot stir fry",
        "description": "Crunchy stir fry featuring fresh broccoli and beetroot",
        "price": 15,
        "image_url": "https://images.pexels.com/photos/4144234/pexels-photo-4144234.jpeg?h=530&w=350"
    }
}
```

#### `PUT /dishes/:dishId`

This route will update the dish when a matching dish id is found.

##### Validation

The update validation includes all of the same validation as the `POST /dishes` route, plus the following:

* Error if `:dishId` does not exist
* Error if `id` in the body does not match `:dishId` in the route

**Example request**
```
PUT http://localhost:5000/dishes/3c637d011d844ebab1205fef8a7e36ea
```

Body:
```
{
  "data": {
    "id": "3c637d011d844ebab1205fef8a7e36ea",
    "name": "Century Eggs",
    "description": "Whole eggs preserved in clay and ash for a few months",
    "image_url": "some-valid-url",
    "price": "17"
  }
}
```

**Example response**
```
{
  "data": {
    "id": "3c637d011d844ebab1205fef8a7e36ea",
    "name": "Century Eggs",
    "description": "Whole eggs preserved in clay and ash for a few months",
    "image_url": "some-valid-url",
    "price": "17"
  }
}
```

#### `GET /orders`

This route will respond with a list of all existing order data.

**Example request**
```
GET http://localhost:5000/orders
```

**Example response**  
Status 200
```
{
  "data": [
    {
      "id": "5a887d326e83d3c5bdcbee398ea32aff",
      "deliverTo": "308 Negra Arroyo Lane, Albuquerque, NM",
      "mobileNumber": "(505) 143-3369",
      "status": "delivered",
      "dishes": [
        {
          "id": "d351db2b49b69679504652ea1cf38241",
          "name": "Dolcelatte and chickpea spaghetti",
          "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
          "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
          "price": 19,
          "quantity": 2
        }
      ]
    }
  ]
}
```

#### `POST /orders`

This route will save the order and respond with the newly created order.

##### Validation
*  The `deliverTo` property is required and cannot be empty
*  The `mobileNumber` property is required and cannot be empty
*  The `dishes` property is required and  must be an array of size 1 or larger


**Example request**
```
POST http://localhost:5000/orders
```

Body:
```
{
  "data": {
    "deliverTo": "308 Negra Arroyo Lane, Albuquerque, NM",
    "mobileNumber": "(505) 143-3369",
    "status": "delivered",
    "dishes": [
      {
        "id": "d351db2b49b69679504652ea1cf38241",
        "name": "Dolcelatte and chickpea spaghetti",
        "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
        "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
        "price": 19,
        "quantity": 2
      }
    ]
  }
}
```
**Example Response**

Status 201
```
{
  "data": {
    "id": "5a887d326e83d3c5bdcbee398ea32aff",
    "deliverTo": "308 Negra Arroyo Lane, Albuquerque, NM",
    "mobileNumber": "(505) 143-3369",
    "status": "delivered",
    "dishes": [
      {
        "id": "d351db2b49b69679504652ea1cf38241",
        "name": "Dolcelatte and chickpea spaghetti",
        "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
        "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
        "price": 19,
        "quantity": 2
      }
    ]
  }
}
```

#### `GET /orders/:orderId`

This route will respond with the order when a matching order id is found.

**Example request**
```
GET http://localhost:5000/orders/f6069a542257054114138301947672ba
```

**Example response**

Status 200
```
{
  "data": {
    "id": "f6069a542257054114138301947672ba",
    "deliverTo": "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    "mobileNumber": "(202) 456-1111",
    "status": "out-for-delivery",
    "dishes": [
      {
        "id": "90c3d873684bf381dfab29034b5bba73",
        "name": "Falafel and tahini bagel",
        "description": "A warm bagel filled with falafel and tahini",
        "image_url": "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        "price": 6,
        "quantity": 1
      }
    ]
  }
}
```

#### `PUT /orders/:orderId`

This route will update the order when a matching order id is found.

##### Validation:

The update validation includes all of the same validation as the `POST /orders` route, plus the following:


* The `id` of body must matches `:orderId` from the route

* The `status` property is required and must be one of the following:
  * `pending`, `preparing`, `out-for-delivery`, `delivered`
* An error occurs if the status equals `delivered` since a delivered order cannot be changed

**Example request**
```
PUT http://localhost:5000/orders/3c637d011d844ebab1205fef8a7e36ea
```

Body:
```
{
  "data":  {
    "id": "f6069a542257054114138301947672ba",
    "deliverTo": "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    "mobileNumber": "(202) 456-1111",
    "status": "out-for-delivery",
    "dishes": [
      {
        "id": "90c3d873684bf381dfab29034b5bba73",
        "name": "Falafel and tahini bagel",
        "description": "A warm bagel filled with falafel and tahini",
        "image_url":
          "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        "price": 6,
        "quantity": 2
      }
    ]
  }
}

```

**Example response**
```
{
    "data": {
        "id": "f6069a542257054114138301947672ba",
        "deliverTo": "1600 Pennsylvania Avenue NW, Washington, DC 20500",
        "mobileNumber": "(202) 456-1111",
        "status": "out-for-delivery",
        "dishes": [
            {
                "id": "90c3d873684bf381dfab29034b5bba73",
                "name": "Falafel and tahini bagel",
                "description": "A warm bagel filled with falafel and tahini",
                "image_url": "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
                "price": 6,
                "quantity": 2
            }
        ]
    }
}
```

#### `DELETE /orders/:orderId`

This route will delete the order and return a `204` when a matching order id is found.

##### Validation

* An order cannot be deleted unless its  `status` is pending

**Example request**
```
DELETE http://localhost:5000/dishes/3c637d011d844ebab1205fef8a7e36ea
```

**Example response**  
Status 204 and no response body.

