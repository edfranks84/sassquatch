# sassquatch

This is sassquatch. Experts dispute my existance, but you've found me. I am a Sass and Grunt scaffold for the cool kids.


## Structure

- `assets/` contains—surprise, surprise—assets for your project. When running, Grunt will watch for changes in `images` and `scss` to optimise any SVGs found in `images/src/`, create PNGs from them, and compile your Sass files to CSS. Phew!
- `assets/scss/` is kind of a treasure trove, but hopefully all the SCSS files in there are well-written enough for you to understand. Consider it homework.
- `Gruntfile.js` is the workhorse, with rules for watching and processing files. It compiles Sass, optimises and converts SVGs, concatenates JS, adds prefixes to CSS, adds `rem` fallbacks to CSS, and compresses CSS.
- `index.html` is just there for demonstrative purposes.
- `README.md` is generated from the project title and description.

***Note***: I've removed compass from the workings as I wanted to try LibSass as it's crazy fast. You can add or change things up however you like. 

## How do I use it?

I'm a dirty Windows user so we use ```%USERPROFILE%\.grunt-init\sassquatch``` instead of ```~/.grunt-init/sassquatch```

1. Install grunt-init: `npm install -g grunt-init`
2. Clone Belt into your grunt-init template directory: `git clone https://github.com/vdecree/sassquatch.git %USERPROFILE%\.grunt-init\sassquatch`
3. In your new, empty project directory, run grunt init: `grunt-init sassquatch`
4. Finally, grab the dependencies and get Grunt running: `npm install && grunt`

***Note***: I've now added Notify to the task options. If you're on Windows 8.1 or newer no additional installations are required. If you are on Windows 7 you will need to install [Snarl](http://snarl.fullphat.net/) and [Growl](http://www.growlforwindows.com/gfw/help/growlnotify.aspx).
