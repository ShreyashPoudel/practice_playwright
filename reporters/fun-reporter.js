// reporters/fancy-reporter.js
const chalk = require('chalk');

class FancyReporter {
  onEnd(result) {
    if (result.status === "passed") {
      console.log(chalk.greenBright.bold(`
████████╗███████╗███████╗████████╗███████╗
╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██╔════╝
   ██║   █████╗  ███████╗   ██║   ███████╗
   ██║   ██╔══╝  ╚════██║   ██║   ╚════██║
   ██║   ███████╗███████║   ██║   ███████║
   ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚══════╝
`));
      console.log(chalk.yellowBright("🎉🎉🎉 ALL TESTS PASSED! 🎉🎉🎉"));
      console.log(chalk.cyan("🚀 QA POWER LEVEL: 9000+"));
      console.log(chalk.magenta("🧪 Bugs were destroyed today!"));
      console.log(chalk.blue("😎 Time for coffee ☕"));
      console.log(chalk.greenBright("💥 WOOOOOOOOOOOOOO! 💥"));
    } else {
      console.log(chalk.red.bold(`
💥 Some tests failed!
🐞 Bugs still alive...
🔧 Back to debugging soldier!
`));
    }
  }
}

module.exports = FancyReporter;