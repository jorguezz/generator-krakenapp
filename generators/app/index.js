'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fabulous ' + chalk.red('generator-krakenapp') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Kraken app name:',
      default: 'mysubapp-kraken'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  configuring: function() {
    // Config files
    const _filesPath = {
      './config/default.json':   '',
      './config/default-0.json': '',
      './config/default-1.json': '',
      './config/default-2.json': '',
      './config/default-3.json': '',
      './config/development.json': 'dev',
      './config/production.json': '',
      './config/staging.json': 'staging',
      './config/qa.json': 'qa'
    };

    for (let filePath in _filesPath) {
      let _conf = this.fs.readJSON(filePath);
      _conf.apps[this.props.name] = _filesPath[filePath] ? this.props.name + '-' + _filesPath[filePath] : this.props.name ;
      this.fs.writeJSON(filePath, _conf);
    }

  },

  writing: function () {

    const _folderPath = './api/' + this.props.name;

    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath(_folderPath + '/app.js')
    );

    this.fs.copy(
      this.templatePath('query.js'),
      this.destinationPath(_folderPath + '/query.js')
    );

    this.fs.copy(
      this.templatePath('routes.js'),
      this.destinationPath(_folderPath + '/routes.js')
    );

    this.fs.copy(
      this.templatePath('./actions/action-example.js'),
      this.destinationPath(_folderPath + '/actions/action-example.js')
    );
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  },

  end: function () {
    this.log('Kraken SubApp: ' + chalk.yellow(this.props.name) + ' was created ' + chalk.green('successfully!!'));
  }

});
