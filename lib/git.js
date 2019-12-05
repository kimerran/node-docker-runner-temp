var Git = require("nodegit");

const gitClone = (gitUrl, appName) => {
  return Git.Clone(gitUrl, `apps/${appName}`)
  .then((repo) => {
    return true;
  })
  .catch(err => {
    console.error(err)
    return false;
  });
}

const gitGetBranches = (appName) => {
  return Git.Repository.open(`apps/${appName}`)
  .then((repo) => {
    return Git.Reference.list(repo)
  })
  .then(refs => {
    const branches = refs.map((ref) => {
      if (ref.indexOf('remotes') > -1) {
        const t = ref.split('/')
        return t.slice(-1).pop()
      }
    }).filter((r) => r && r !== 'master')
    return branches;
  })
}

module.exports = {
  gitGetBranches,
  gitClone,
}