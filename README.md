I was having a hard time installing Angular CLI and I did the following tweaks since I was using a Macbook:

Here are the steps I made:

1. installing the package:
   sudo npm install -g @angular/cli

2. change the ownership of the npm directories to mine:
   sudo chown -R $(whoami) ~/.npm
   sudo chown -R $(whoami) /usr/local/lib/node_modules

3. changing npm global directory:
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'

4. opening the file ~/.zshrc:
   nano ~/.zshrc

5. edit the content:export PATH=~/.npm-global/bin:$PATH

6. then install the Angular CLI:
   npm install -g @angular/cli

Create the folder:
Here are the commands I have used:

1. ng new technical-assessment ng new my-app --no-standalone --routing --ssr=false (i used this because i am not familiar with a standalone project and i need modules)
2. pushed the folder and readme files in Github
