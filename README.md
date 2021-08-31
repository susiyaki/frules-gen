# frules-gen

A CLI to generate firestore.rules file from multiple files.  

## Description

This CLI enable to organize directory structure and avoid fat `firestore.rules` file.
This CLI has a watching mode so you could edit rules comfortable. :)

## Requirement

- NodeJs

## Features

- Compile mode: Combine multiple rule files.
- Watching mode: Combine multiple rule files automatically.


## Installation

```sh
yarn add -D frules-gen
```

## Usage

Run following command or set scripts in `package.json`.

```sh
yarn frules-gen // Compile mode
yarn frules-gen -w // Watching mode
```

### Syntax of code

> [Example code](https://github.com/susiyaki/frules-gen/tree/main/example)

`index.rules`

```ts
service cloud.firestore {
  match /databases/{database}/documents {
    // helpers: Define helpers what often using.
    include "helpers/isAuthenticated.rules"; // isAuthenticated function is able to call in `documents`.

    // documents: Difine documents per domain and import here.
    include "documents/users/index.rules";
}
```

`helpers/isAuthenticated.rules`

```ts
function isAuthenticated() {
  return request.auth != null;
}
```

#### Rules

- When import file, write `include "<pathname>";` where you want to output code. 
  - it must be `include`, dosen't `import`.
  - it need to write `.rules` at pathname.
- If refer to `request` context, hava to write in `match /databases/{database}/documents`.
- Are there same include pathes, thier are each output same things so `firestore.rules` will be fat. In this case, you should change import file position to above position.


### CLI options

[frules-gen options document]()


## Author

[@susiyaki_dev](https://twitter.com/susiyaki_dev)

## License

[MIT](https://github.com/susiyaki/frules-gen/blob/main/LICENSE.txt)