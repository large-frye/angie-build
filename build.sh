#!/bin/bash

directories=("admin" "public")
files=("server.js" "package.json" "")
home="/Users/fryea/Documents/angie-build" # Needs to be dynamic
project="${PWD}/$1"

if [ -z $1 ]
    then 
    echo -e "You must specify a project name!"
    exit
fi

# Make directory
if [ -d $1 ]; 
    then
    echo "This directory already exists ... $1"
    else 
    # echo "Making directory...$1"
    mkdir $1
fi

# Change directory and create our node server and readme files.
cd $project
touch README.md
cat "This is $1 README file, add more detail about your project here." > README.md
cat "$home/templates/js/server.js" > server.js | sed -i -e "s/::projectName::/$1/" server.js

for d in "${directories[@]}"
do
    if [ -d $d ];
        then 
        echo "This directory already exists ... $d"
    else 
        # echo "Making directory ... $d"

    # Setup up basic angular-seed-project inside folders
        cd $project

            mkdir $d
            cd $d

            # Create index and node server files
            cat "$home/templates/index.html" > index.html | sed -i -e "s/::projectName::/$1/" index.html
            cat "$home/templates/bower.json" > bower.json | sed -i -e "s/::projectName::/$1/" bower.json
            cat "$home/templates/.bowerrc" > .bowerrc
            
            # Create directory structure
            fileStructure=("css" "js" "partials")

            for f in "${fileStructure[@]}"
            do
                cd "$project/$d"

                case "$f" in
                    "css") 
                        mkdir $f 
                        cd $f 
                        touch "styles.css"
                        ;;
                    "js")
                        mkdir $f
                        cd $f

                        echo "STARTING: create javascript files for $d"

                        # Create application
                        cat "$home/templates/js/main.js" > main.js | sed -i -e "s/::projectName::/$1/" main.js
                        sleep 1s
                        cat "$home/templates/js/controllers.js" > controllers.js | sed -i -e "s/::projectName::/$1/" controllers.js
                        sleep 1s
                        cat "$home/templates/js/services.js" > services.js | sed -i -e "s/::projectName::/$1/" services.js
                        sleep 1s
                        cat "$home/templates/js/directives.js" > directives.js | sed -i -e "s/::projectName::/$1/" directives.js
                        sleep 1s
                        cat "$home/templates/js/filters.js" > filters.js | sed -i -e "s/::projectName::/$1/" filters.js

                        echo "COMPLETED: javascript file creation for $d"

                        # Run bower
                        cd ../
                        bower install
                        ;;

                    "partials")
                        mkdir $f
                        ;;
                esac
            done
    fi
done

# Cleanup "-e" files
cd $project

for f in $(find . -type f -name "*-e")
do
    rm $f
done
