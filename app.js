const Email = require('email-templates');
const mjml2html = require("mjml")
const fs = require("fs")
/**
 * customer render functions for mjml
 * @param {mjml content string} mjmlcontent 
 */
function mjml(mjmlpath,locals,cb) {
  let mjmlContent =  mjml2html(fs.readFileSync(mjmlpath).toString());
  cb(null,mjmlContent.html)
}
const nodemailer = require("nodemailer")
require("./polyfill")
const realtransporter = nodemailer.createTransport({
  port: 587,
  host: "<smtp host>",
  auth: {
    type: "LOGIN",
    user: "<email accounts>",
    pass: "<email password>"
  }

})
const email = new Email({
  message: {
    from: '<email accounts>'
  },
  views: {
    options: {
      extension: 'mjml', // for mjml 
      map: {
        mjml: 'mjml',
      },
      engineSource: {
        mjml:mjml
      }
    }
  },
  send: true,
  transport: realtransporter
}
);

email
  .send({
    template: 'templates',
    message: {
      to: '1141591465@qq.com',
      subject: "demoapp"
    },
    locals: {
      name: 'Elon'
    }
  })
  .then(console.log)
  .catch(console.error);