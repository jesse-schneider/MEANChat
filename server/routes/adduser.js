var fs = require('fs');

module.exports = function (app, userList) {
  app.post('/api/adduser', (req, res) => {
    if (!req.body) {
      return res.sendStatus(400);
    }

    var user = {
        username: req.body.username, 
        email: req.body.email,
        ofGroupAdminRole: JSON.parse(req.body.groupAdmin),
        groupList: req.body.groupList,
        adminGroupList: req.body.adminGroupList
    };
    console.log(user);
    userList.push(user);
    try {
        fs.writeFileSync('./routes/users.json', '{ \n"users": [\n', 'utf8');
        for(i = 0; i < userList.length-1; i++)
        {
            fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[i]) + ",\n", 'utf8');
        }
        fs.appendFileSync('./routes/users.json', "\t" + JSON.stringify(userList[userList.length - 1]) + "\n", 'utf8');
        fs.appendFileSync('./routes/users.json', '] }', 'utf8');
    }
    catch {
        res.send("Error saving user");
    }
    return res.send(user);
  });
};