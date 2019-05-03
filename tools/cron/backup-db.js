const moment = require('moment');
let shell = require('shelljs');
const CronJob = require('cron').CronJob;

module.exports = {
  initialize: function () {
    new CronJob('30 2 * * *', function () {
      shell.echo('---------------Database backup process started!---------------');
      const cmd = 'mkdir -p $HOME/db-backup';
      if (shell.exec(cmd + '&& mysqldump -u root peersview > $HOME/db-backup/'
        + moment().format('YYYYMMDD')
        + '_peersview.sql').code !== 0) {
        shell.exit(1);
      } else {
        shell.echo('Database backup complete');
      }
      shell.echo('---------------Database backup process ended!---------------');
    }, null, true, 'UTC');
  },

};


