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

**there have two pattern for softwer development**

- MVC pattern
- Modular pattern //////////-------> we use this model

_In this time most use is modular pattern_

**Rules Principle**

- DRY-Don't repeat yourself
- Fat model / thin model

## pattern is

_for typescript_

# interface --->schema -----> model-----> db query

[TypeScript Creating Your First Document](https://mongoosejs.com/docs/typescript.html)

**If we want to connect our project with compas then we copy the url from env and past on campas**

## Validate our error by package

[validator](https://www.npmjs.com/package/validator)
[validator github](https://github.com/validatorjs/validator.js)

**There have two popular validator library to validate error**
_first one is :_
[joi](https://www.npmjs.com/package/joi)
[joi documentation](https://joi.dev/api/?v=17.9.1)

_second one is :_

[zod](https://www.npmjs.com/package/zod)
[zod documentation](https://zod.dev/?id=installation)

**For password encript use this lybrary**

[bcrypt](https://www.npmjs.com/package/bcrypt)

```
npm i bcrypt
```

_for type_

[bcrypt type](https://www.npmjs.com/package/@types/bcrypt)

```
npm i -D @types/bcrypt
```

# handle status code

## [http-status](https://www.npmjs.com/package/http-status)

## Functional Requirements: PH University

# Authentication

_Student_

- Student can login and logout securely
- Students can update their password.
- Faculty
- Faculty can login and logout securely
- Faculty can update their password.
- Admin:
- Facultycan login and logout securely
- Faculty can update their password.

# Profile Management:

_Student_

- Students can manage and update their profile.
- Students can update certain fields
- Faculty:
- Faculty can manage and update their profile.
- Faculty Can update certain fields\
- Admin:
- Admin can manage and update their profile.
- Admin can update certain fields

# Academic Process:

_Student:_

- Students can enroll in offered courses for a specific semester.
- Students can view their class schedule.
- Students can see their grades.
- Students can view notice board and events
- Faculty:
- Faculty can manage student grades
- Faculty can access students' personal and academic information.
- Admin:
- Admin can manage multiple processes:
- Semester
- Course
- Offered Course
- Section
- Room
- Building

# User Management:

_Admin:_

- Admin can manage multiple accounts
- Admin can block/unblock user
- Admin can change user password

# Data Model

_User:_

- \_id
- Id (generated)
- password
- needsPasswordChange
- role
- status
- isDeleted
- createdAt
- updatedAt

_Student:_

- \_id
- id (generated)
- name
- gender
- dateOfBirth
- email
- contactNo
- emergencyContactNo
- presentAddress
- permanentAddress
- guardian
- localGuardian
- profileImage
- admissionSemester
- isDeleted
- createdAt
- updatedAt

_Faculty:_

- \_id
- id (generated)
- designation
- name
- gender
- dateOfBirth
- email
- contactNo
- emergencyContactNo
- presentAddress
- permanentAddress
- profileImage
- academicFaculty
- academicDepartment
- isDeleted
- createdAt
- updatedAt

_Admin:_

- \_id
- id (generated)
- designation
- name
- gender
- dateOfBirth
- email
- contactNo
- emergencyContactNo
- presentAddress
- permanentAddress
- profileImage
- managementDepartment
- isDeleted
- createdAt
- updatedAt

_Academic Semester:_

- \_id
- name
- year
- code
- startMonth
- endMonth
- createdAt
- updatedAt

_Academic Faculty:_

- \_id
- name
- createdAt
- updatedAt

_Academic Department:_

- \_id
- name
- academicFaculty
- createdAt
- updatedAt

# API Endpoints

_User:_

- users/create-student (POST)
- users/create-faculty (POST)
- users/create-admin (POST)

_Student:_

- students (GET)
- students/:id (GET)
- students/:id (PATCH)
- students/:id (DELETE)
- students/my-profile

_Faculty:_

- faculties(GET)
- faculties/:id (GET)
- faculties/:id (PATCH)
- faculties/:id (DELETE)
- faculties/my-profile

_Admin:_

- admins (GET)
- admins /:id (GET)
- admins /:id (PATCH)
- admins /:id (DELETE)
- admins /my-profile

_Auth:_

- auth/login
- auth/refresh-token
- auth/change-password
- auth/forgot-password
- auth/reset-password
