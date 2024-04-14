const core = require('@actions/core');
const {DefaultArtifactClient} = require('@actions/artifact');
const path = require('node:path');
const fs = require('fs').promises; // Use the promise-based functions

const corePath = './core';

async function main() {
  try {

    const artifact = new DefaultArtifactClient();
    const dumpName = core.getInput('name');

    console.log(`Dump name set to: ${dumpName}!`);

    // Write the file
    const filePath = path.join(".", dumpName);
    await fs.writeFile(filePath, "sample"); // Use await here to ensure the file is written before uploading
    console.log('File was created successfully.');

    // Upload the artifact
    const uploadResponse = await artifact.uploadArtifact(
      dumpName,
      [filePath],
      ".",
      {
        retentionDays: 10
      }
    );

    console.log(`Upload successful: ${uploadResponse.artifactId}, size: ${uploadResponse.size}`);
  } catch (error) {
    console.error('Failed to upload artifact:', error);
    core.setFailed(error.message);
  }
}

main();

