#!/bin/bash

# Build the static site
(cd web-src; hugo --gc --minify)

# Build the anima hello world web app in React
#(cd hello-world; yarn build)
yarn add parcel@latest
(cd hello-world; npm run build)

# Build Collabrium's front end
# ...

