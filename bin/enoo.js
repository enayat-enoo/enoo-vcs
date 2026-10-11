#!/usr/bin/env node

const { initRepository } = require("../src/repository/init");

const command = process.argv[2];

if (command === "init") {
  try {
    const repositoryPath = process.cwd();

    const enooPath = initRepository(repositoryPath);

    console.log(`Initialized empty Enoo repository in ${enooPath}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
} else {
  console.log("Enoo VCS");
}