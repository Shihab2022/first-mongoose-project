## first-mongoose-project

**8-2 Installing express , mongoose, typescript, dotenv ,cors**

[ npm install express](https://expressjs.com/en/starter/installing.html)

[npm install typescript --save-dev](https://www.typescriptlang.org/download)

[npm install mongoose --save](https://mongoosejs.com/docs/index.html)

[npm i cors](https://www.npmjs.com/package/cors)

[npm i dotenv](https://www.npmjs.com/package/dotenv)

```
tsc -init
```
*For type script type declaration we install this package*

```
npm i --save-dev @types/express
```

*For cors file declaration*

```
npm i --save-dev @types/cors
```


**8-3 Installing eslint, refactor code, fix errors using command**


[TypeScript using ESLint and Prettier](https://blog.logrocket.com/linting-typescript-eslint-prettier)


```
  "include": ["src"], // which files to compile
  "exclude": ["node_modules"],
```

*this two line add ts config file on the top*

*then install this package*
```
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

*then put this command*
```
npx eslint --init
```
*for fix bug use this command*
```
"lint:fix":"npx eslint src --fix ", 

///------------> command is 

npm run lint:fix
```