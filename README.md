This website was the result of Google, YouTube, Github, StackOverflow, and Documentations for Angular. This is my first time using Angular, that's why I had a hard time in the front end and focused on the functionalities of the website.

I was having a hard time installing Angular CLI and I did the following tweaks since I was using a Macbook.
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

Creating the register, login, and home component

- ng g c components/login
- ng g c components/register
- ng g c components/home

Creating the services

- ng g s services/auth

Creating guards

- ng g g guards/auth (choose the canActivate)

Creating interfaces

- ng g i interfaces/auth

Creating the login form.

1. Create your html login and your css styling
2. Then, create your functionalities at login.component.ts

Creating the signup form.

1. Create your html login and your css styling
2. Then, create your functionalities at login.component.ts
3. Download the json-server (for storing the users since we are not using any database)

- installation of json-server: npm install json-server
- to start the server: npx json-server db.json

Creating the login function
Give security to the website
