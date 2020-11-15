# M7011E

## Set up

Start with installing lint and format tools eslint and prettier.

```console
$ npm i
```

To deploy everything run this command. This also works if you have updated any `service` in the docker-compose file.

```console
$ npm run deploy
```

If you need to rebuild and redeploy all services you can run.

```console
$ npm run redeploy
```

To rebuild individual services you may also use the docker-compose commands directly.

```console
$ docker-compose up -d <SERVICE_NAME>
```

To halt everything and stop the docker containers you may run either command.

```console
$ npm run down
$ docker-compose down
```

## Help, something called HUSKY doesn't allow me to commit to git!

As the title say, Husky runs some check on the code before it is added to the repo to make sure you haven't forgot to clean up the code, like unneccessary console.log or unused variables.

### Common Husky errors

-   console.log
    -   use `console.info`, `console.warn`, or `console.error` instead.
-   Unused variables
    -   Remove the unused variable!
