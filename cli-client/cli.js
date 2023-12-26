#!/usr/bin/node

const program = require('commander');
const axios = require('axios').default;

program
  .command('healthcheck')
  .description('Check the health status of the backend')
  .action(async () => {
    try {
      const response = await axios.get('http://localhost:9876/ntuaflix_api/admin/healthcheck');
      
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

program
  .command('title')
  .description('Get information about a title by its ID')
  .option('-i, --titleID <titleID>', 'Specify the title ID')
  .action(async (options) => {
    if (options.titleID) {
      try {
        const response = await axios.get(`http://localhost:9876/ntuaflix_api/info/title/${options.titleID}`);
        console.log('Title Information:', response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      console.error('Please provide a title ID using --titleID.');
    }
  });

program
  .command('name')
  .description('Get information about a contributor by its ID')
  .option('-i, --nameID <nameID>', 'Specify the name ID')
  .action(async (options) => {
    if (options.nameID) {
      try {
        const response = await axios.get(`http://localhost:9876/ntuaflix_api/info/name/${options.nameID}`);
        console.log('Contributor Information:', response.data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      console.error('Please provide a name ID using --nameID.');
    }
  });

program.parse(process.argv);
