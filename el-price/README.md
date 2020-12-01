# Electricity Price

## Usage

From service defined in docker-compose, call `http://price` using fetch, axios or something. Otherwise `http://<url>/<exposed_port>`.

`<exposed_port>` is by default `8080` using

```console
$ npm start
```

or `4005` using docker-compose.

### Returns

```json
{
	"price": 0.6166668275,
	"price_currency": "SEK",
	"avg_consumption": 2.96685,
	"avg_generation": 0.5132790228
}
```
