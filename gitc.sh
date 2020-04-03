#!/bin/bash
read -p "Commit massage: " msg
#ssh-add ~/.ssh/key#1
git add .
git commit -m"$msg"
git push
git status

