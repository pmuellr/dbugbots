#!/usr/bin/env node

'use strict'

if (require.main === module) {
  const cli = require('./lib/cli')

  const argv = cli.parseArgs()
  console.log(argv)
}
