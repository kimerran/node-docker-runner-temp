// const Docker = require('dockerode');

// var docker = new Docker({socketPath: '/var/run/docker.sock'});

// docker.listContainers(function (err, containers) {
//   console.log(err)
//   console.log(containers)
//   containers.forEach(function (containerInfo) {
//     console.log(containerInfo)
//     docker.getContainer(containerInfo.Id).stop();
//   });
// });


const npm = require('npm')

npm.commands.install(['--prefix apps/progatory-node-test apps/progatory' ])