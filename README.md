# [ColorPK.com](https://www.colorpk.com) v2 ![](https://github.com/im6/vp2/workflows/build/badge.svg)

A python web app written with `NO javascript framework`

<p align="center">
  <img width="256" height="296" src="https://github.com/im6/vp2/blob/master/static/logo.png">
</p>

## QuickStart

local dev django server

```sh
pip3 install virtualenv
virtualenv -p python3 env
source env/bin/activate
pip install -r requirements/dev.txt
```

before running, add `./connection.cnf` file in app root directory.

```sh
<set your env variable> python manage.py runserver 3001
```

open new console, and dev on port 3000 for hot reload.

```sh
yarn install
yarn start
```

## Special thanks

[styled tab](//https://codepen.io/JiveDig/pen/jbdJXR)
