const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});
const config = require('config')

const createNodeContainer = (params) => {

  console.log('createNodeContainer params', params)
  const { appName, hostPort, appPort } = params;

  return docker.createContainer({
    Name: `appName${+ new Date()}`,
    Image: 'node:10-alpine',
    ExposedPorts: { [`${appPort}/tcp`]: {} },
    Cmd: ['node' ,'/app/src/index.js'],
    HostConfig: {
      Binds: [
        `${config.applicationDirectory}/noderunner/apps/${appName}:/app`
      ],
      PortBindings: { [`${appPort}/tcp`]: [{ 'HostPort': hostPort }] },
    }
  })
}

module.exports = {
  createNodeContainer
}

// const main = async () => {
//   const branches = await gitGetBranches()
//   console.log('branches', branches)
//   const container = await createNodeContainer()
//   await container.start();
// }

// main();