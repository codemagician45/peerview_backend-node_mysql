#!/bin/sh
export NODE_ENV='production'
export SINGLE_PROCESS='true'
export PEERSVIEW_DB_ADAPTER='mysql'
export PEERSVIEW_DB_HOST='us-cdbr-iron-east-05.cleardb.net'
export PEERSVIEW_DB_USER='b8a1e7c2573e8c'
export PEERSVIEW_DB_PASSWORD='96fc507f'
export PEERSVIEW_DATABASE='heroku_a0351cee4a00f2c'
export PEERSVIEW_DB_PORT='3306'
export PEERSVIEW_DB_TIMEZONE='+00:00'

node index.js
