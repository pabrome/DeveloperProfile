const fs = require("fs")
const inquirer = require("inquirer")
const axios = require("axios")
const { colors } = require("./generateHTML")
const html_gen = require("./generateHTML")
var pdf = require('html-pdf');


inquirer.prompt([
    {
        type: "list",
        message: "What is your favourite color?",
        name: "color",
        choices: [
            "green", 
            "blue", 
            "pink", 
            "red"
        ]
    },
    {
        type: "input",
        name:"username",
        message: "What is your GitHub username?"
    }
]).then(function(data) {
    var url = `https://api.github.com/users/${data.username}`
    console.log(url)
    axios.get(url).then(function(response){
        var response = response.data
        var userProfile = {
            image: response.avatar_url,
            username: response.login,
            location: response.location,
            github: response.html_url,
            blog: response.blog,
            bio: response.bio,
            color: data.color
        }
        console.log(userProfile.location)
        
        var fileName = `./HTML/${userProfile.username}.html`
        writeToFile(fileName,html_gen.generateHTML(userProfile))

        // var html = fs.readFileSync('./pabrome.html', 'utf8');
        // var options = { format: 'Letter' };

        // pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
        //     if (err) return console.log(err);
        //     console.log(res); // { filename: '/app/businesscard.pdf' }
        //   });
        
    })
})

const questions = [

];

function writeToFile(fileName, data) {

fs.writeFile(fileName, data, function(err) {

    if (err) {
      return console.log(err);
    }

    console.log("Success!");
})}

function init() {

init();
}

function API(username) {

}
