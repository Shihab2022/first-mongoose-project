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

_For type script type declaration we install this package_

```
npm i --save-dev @types/express
```

_For cors file declaration_

```
npm i --save-dev @types/cors
```

**8-3 Installing eslint, refactor code, fix errors using command**

[TypeScript using ESLint and Prettier](https://blog.logrocket.com/linting-typescript-eslint-prettier)

```
  "include": ["src"], // which files to compile
  "exclude": ["node_modules"],
```

_this two line add ts config file on the top_

_then install this package_

```
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

_then put this command_

```
npx eslint --init
```

_for fix bug use this command_

```
"lint:fix":"npx eslint src --fix ",

///------------> command is

npm run lint:fix
```

\*_install prettier_

```
npm install --save-dev prettier
```

_For run tsc application_
[ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

- it only for development perpase . It not use for production
  _for install_

```
npm i ts-node-dev --save-dev
```

_for run_

```
///---> add file path server.ts
ts-node-dev --respawn --transpile-only server.ts
```
