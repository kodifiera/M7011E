# Electricity Consumption

Get the current average consumption. Is based on a normal distribution of the night and day and current temperature (for heating costs).

## Usage

From service defined in docker-compose, call `http://el-consumption` using fetch, axios or something. Otherwise `http://<url>/<exposed_port>`.

`<exposed_port>` is by default `8080` using

```console
$ npm start
```

or `4004` using docker-compose.

### Returns

```
4.76915
```
