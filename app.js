const Email = require('email-templates');
const mjml2html = require("mjml")
const fs = require("fs")
require("./polyfill")
const email = new Email({
  message: {
    from: 'niftylettuce@gmail.com',
    headers: {
      'X-Some-Custom-Thing': 'Some-Value'
    },
    list: {
      unsubscribe: 'https://niftylettuce.com/unsubscribe'
    }
  },
  transport: {
    jsonTransport: true
  },
  render: (view, locals) => {
    return new Promise((resolve, reject) => {
      // this example assumes that `template` returned
      // is an ejs-based template string
      // view = `${template}/html` or `${template}/subject` or `${template}/text`
      if (view.substring("html")) {
        let vars = {
          appname:"dalongdemo-rongfengliang"
        }
        let htmlOutput = mjml2html(fs.readFileSync("templates/mail.mjml").toString().interpolate({vars}))
        resolve(htmlOutput.html)
      }
      if (view.substring("text")) {
        resolve("not support")
      }
    });
  }
}
);

email
  .send({
    template: 'mars',
    message: {
      to: 'elon@spacex.com',
      subject: "demoapp"
    },
    locals: {
      name: 'Elon'
    }
  })
  .then(console.log)
  .catch(console.error);