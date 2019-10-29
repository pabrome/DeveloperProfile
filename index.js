const fs = require("fs")
const inquirer = require("inquirer")
const axios = require("axios")
const { colors } = require("./generateHTML")
const html_gen = require("./generateHTML")
var pdf = require('html-pdf');
var userProfile


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
        userProfile = {
            image: response.avatar_url,
            username: response.login,
            location: response.location,
            github: response.html_url,
            blog: response.blog,
            bio: response.bio,
            repos: response.public_repos,
            followers: response.followers,
            star: response.public_gists,
            following: response.following,
            color: data.color
        }
        
        msg()

        async function msg(){
            const msg = await createFile()
            console.log("Success",msg)
        }

        function createFile() {

            var html = html_gen.generateHTML(userProfile)
            var options = { format: 'Letter' };
    
            pdf.create(html, options).toFile(`./PDF/${userProfile.username}.pdf`, function(err, res) {
                if (err) return console.log(err);
                console.log(res); 
            })
        }
    })
})

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
