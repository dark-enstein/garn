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
    

    // Edit sysctl
    const { exec } = require("child_process");
    exec("sudo sysctl -w kernel.core_pattern='sample.bf'", (error, stdout, stderr) => {
	    if (error) {
		console.log(`error: ${error.message}`);
		return;
	    }
	    if (stderr) {
		console.log(`stderr: ${stderr}`);
		return;
	    }
	    console.log(`stdout: ${stdout}`);
    });
    console.log('Configured kernel')


    // intentionally segf
    exec("sysctl kernel.core_pattern ;./gen_c", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
    });
    console.log('Generated a core')


    // check core exist
    exec("ls -all", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
    });
    console.log('Generated a core')

    // Write the file
    //const filePath = path.join(".", dumpName);
    //await fs.writeFile(filePath, "sample"); // Use await here to ensure the file is written before uploading
    //console.log('File was created successfully.');

    // Upload the artifact
//    const uploadResponse = await artifact.uploadArtifact(
//      dumpName,
//      ['sample.bf'],
//      ".",
//      {
//        retentionDays: 10
//      }
//    );

//    console.log(`Upload successful: ${uploadResponse.artifactId}, size: ${uploadResponse.size}`);
  } catch (error) {
    console.error('Failed to upload artifact:', error);
    core.setFailed(error.message);
  }
}

main();

