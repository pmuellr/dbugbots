'use strict'

exports.parseArgs = parseArgs

const fs = require('fs')
const path = require('path')

const minimist = require('minimist')

const pkg = require('../package.json')

// parse command-line arguments
function parseArgs () {
  const minimistOpts = {
    boolean: ['help', 'version'],
    alias: {
      '?': 'help',
      h: 'help',
      v: 'version'
    }
  }

  const argv = minimist(process.argv.slice(2), minimistOpts)

  // check for help and version options
  if (argv.version) version()
  if (argv.help) help()
  if (argv._.length === 1 && argv._[0] === '?') help()
  if (argv._.length === 0) help()

  return argv
}

// print program version
function version () {
  console.log(pkg.version)
  process.exit()
}

// print help
function help () {
  const helpFile = path.join(__dirname, '..', 'HELP.md')
  const helpText = fs.readFileSync(helpFile, 'utf8')
    .replace(/%%PROGRAM%%/g, pkg.name)
    .replace(/%%VERSION%%/g, pkg.version)
    .replace(/%%HOMEPAGE%%/g, pkg.homepage)

  console.log(helpText)
  process.exit()
}
