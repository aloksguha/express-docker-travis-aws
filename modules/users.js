let users = [];
// [   { id: '1xyz', name:'Alok'},
//     { id: '2xyz', name:'Akshansh'},
//     { id: '3xyx', name:'Neena'}
// ];


var getUsers = (req, res) => {
  res.json(users.slice());
}

var getUser = (req, res) => {
  let id = req.params.id;
  let user = users.find((ele) => {
    return ele.id == id
  });
  res.json(user);
}

var addUser = (req, res) => {
  let id = Math.random().toString(36).substring(7);
  if (req.body.name) {
    users.push({
      id: id,
      name: req.body.name
    });
    res.status(201).send(users.find(ele => {
      return ele.id === id
    }));
  } else {
    res.status(502).json({
      error: 'name not found in supplied data'
    });
  }
}

var deleteUser = (req, res) => {
  let data = users.find(ele => {
    return ele.id == req.params.id
  });
  users.splice(data, 1);
  res.status(202).json(data);
}

var updateUser = (req, res) => {
  let data = users.find(ele => {
    return ele.id == req.params.id
  });
  data.name = req.params.name || data.name;
  res.status(202).send();
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser
};
