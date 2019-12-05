const express = require('express');
const bodyParser = require('body-parser')

const { gitClone } = require('./lib/git')
const { createNodeContainer } = require('./lib/docker')

const app = express();

app.use(bodyParser.json())

app.post('/', async (req, res) => {
  const {
    git,
    appName,
    ports
  } = req.body;

  const { appPort, hostPort } = ports;

  console.log('git url', git)

  const isSuccess = await gitClone(git, appName);
  console.log('isSuccess', isSuccess)
  if (!isSuccess) {
    return res.send(`Unable to clone repository ${git}`)
  }

  const container = await createNodeContainer({
    appName,
    appPort,
    hostPort
  })

  const what = await container.start()
  console.log(what)

  res.json(true)
})

app.listen(8080)