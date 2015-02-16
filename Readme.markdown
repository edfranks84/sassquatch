# Kit

This Kit is based upon Dan Eden's 'Belt'. I've modified it ever so slightly in order to use more of my own bits and pieces. But Kudos to that man. I hope to change it more and more over the coming months. 


## Structure

- `assets/` contains—surprise, surprise—assets for your project. When running, Grunt will watch for changes in `images` and `scss` to optimise any SVGs found in `images/src/`, create PNGs from them, and compile your Sass files to CSS. Phew!
- `assets/scss/` is kind of a treasure trove, but hopefully all the SCSS files in there are well-written enough for you to understand. Consider it homework.
- `config.rb` contains configuration options for Compass and Sass.
- `Gruntfile.js` is the workhorse, with rules for watching and processing files. It compiles Sass, optimises and converts SVGs, concatenates JS, adds prefixes to CSS, adds `rem` fallbacks to CSS, and compresses CSS.
- `index.html` is just there for demonstrative purposes.
- `README.md` is generated from the project title and description.

## How do I use it?

I'm a dirty Windows user so we use ```%USERPROFILE%\.grunt-init\kit``` instead of ```~/.grunt-init/kit```

1. Install grunt-init: `npm install -g grunt-init`
2. Clone Belt into your grunt-init template directory: `git clone https://github.com/vdecree/Kit.git %USERPROFILE%\.grunt-init\kit`
3. In your new, empty project directory, run grunt init: `grunt-init kit`
4. Finally, grab the dependencies and get Grunt running: `npm install && grunt`

*NOTE*: I've now added Notify to the task options. If you're on Windows 8.1 or newer no additional installations are required. If you are on Windows 7 you will need to install [Snarl](http://snarl.fullphat.net/) and [Growl](http://www.growlforwindows.com/gfw/help/growlnotify.aspx). 