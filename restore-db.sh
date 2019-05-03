#!/usr/bin/env bash

if [ "$#" -eq 1 ]; then
    echo -n "[Latest] "; ls $HOME/db-backup | grep -v / | tail -1;
    echo "---------------------------------------------";
    echo "recently backup databases file(s) [max 10]";
    echo "---------------------------------------------";
    ls $HOME/db-backup | grep -v / | tail -10 | nl;
    echo "---------------------------------------------";
    echo "for restore database: Try npm run db-restore <database file name>";
    elif [ "$#" -eq 2 ]; then
    if [ -r $1$2 ]; then
    echo "Database Restore Process is started. Please wait for a moment";
    mysql -u root peersview < $1$2
    echo "Database Restore Process is Completed.";
    else
    echo "Invalid Database file name";
    fi
    else
    echo "Invalid Parameters. Try npm run db-restore";
fi
