## Set up steps
1. Make sure you have **Node.js** installed, at least version 20+
2. Then I run this command `npm create vite@latest` this will create another directory with all necessary files in it 
3. When you run the previous command, the terminal would ask you some questions with multiple options, for this project I chose: (see ../proofs/ReactSetUp.png for proof)
    - Project name: react-fundamentals
    - Select a framework: React
    - Select a variant: Javascript
    - Use rolldown-vite (Experimental)?: No
    - Install with npm and start now?: Yes (this will run `npm install` and `npm run dev` which would start the project in a developer set up, meaning every time you change and save somthing, the project will change along side, to see the project go to http://localhost:5173/)
4. After making sure the React project is set up, we are going to install **TailwindCSS**, for this the official documentation gives us a great step by step: https://tailwindcss.com/docs/installation/using-vite
    - go into the project directory and run `npm install tailwindcss @tailwindcss/vite` 
    - Configure the plugin in the file **vite.config.js**
    ```vite.config.js
    import { defineConfig } from 'vite'
    import tailwindcss from '@tailwindcss/vite'

    export default defineConfig({
        plugins: [
        tailwindcss(),
        ],
    })
    ```
    - Now go to **index.css** file and replace everything with `@import "tailwindcss";` 
5. With all these you'll have a React project with TailwindCSS installed, now you need to start using TailwindCSS in your components and see the tool in action, rebember to run `npm run dev` in order to see the project and go to  http://localhost:5173/
