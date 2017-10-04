# Application Components
- Node >= __8.5__
- npm >= __5.3__
- Webpack __3.6.0__
- Webpack Dev Server __2.9.1__
- React __16.0.0__
- ReactDOM __16.0.0__
- Node Sass __4.5.3__
- ESLint __4.6.1__
- Babel __6.26.0__
- View Templating with Pug __2.0.0-rc.4__
- Style Library Font Awesome __4.7.0__ (via Node Sass Imports)
- A Server
- A Client
- Some Hot Drama, Perhaps.
- *__Cow Houses!!!__*

## Instructions
1.  clone, or whatever

1.  cd into directory

1.  npm install (you might need to install some gloabals like eslint???)
    ```bash
    npm install -g eslint
    ```

1.  set node env for Prod build (`set` on windows, `export` on LINUX/UNIX)
    ```bash
    export NODE_ENV=production
    ```

1.  Make views in ~/views

1.  Develop in ~/src

1.  run the dev boxes
    ```bash
    gulp dev
    ```

## Gulp Tasks Aplenty
### Server
#### KNOW the effect you intend to create
| Patterns               | Effects                                                                                                                                         |
| ---                    | ---
| `gulp server:cleaning` | Removes the `./build` directory                                                                                                                 |
| `gulp server:building` | Removes the `./build` directory,<br /> Compiles a new one                                                                                       |
| `gulp server:watching` | Removes the `./build` directory,<br /> Compiles a new one,<br /> Watches `./src/server` for, and repeats on Changes                             |
| `gulp server:dev`      | Removes the `./build` directory,<br /> Compiles a new one and runs tests,<br /> Watches for & repeats on Changes With Nodemon                   |
| `gulp server:test`     | Removes the `./build` directory,<br /> Compiles a new one and runs tests                                                                        |
| `gulp server:test:dev` | Removes the `./build` directory,<br /> Compiles a new one and runs tests,<br /> Watches `./src/server` for, and repeats on Changes With Nodemon |

__NOTE:__ Should not crash on ERROR, should log errors to Console

### Client
| Patterns            | Effects                                                                                                               |
| ---                 | ---
| `gulp client:clean` | Removes the `./public/build` directory                                                                                |
| `gulp client:build` | Removes the `./public/build` directory,<br /> Compiles a new one                                                      |
| `gulp client:dev`   | Removes the `./public/build` directory,<br /> Compiles a new one,<br /> Watches `/build/` for, and repeats on Changes |

### Dev
| Patterns   | Effects                                        |
| ---        | ---                                            |
| `gulp dev` | Runs `server:dev` and `client:dev` in parallel |

## Issue Reporting
### Rules
1. Be kind, and concise.
1. If you don't like Cow Houses, Look for another package.

### Template
1.  Include steps to reproduce

1.  A Debug or stacktrace pasted in 'should' contain the first line or so
   which should realate to the item in question. (please don't paste spaghetti)
