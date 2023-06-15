export ENABLE_DS_AUTOUPDATE=true
export DB_NAME=startup-app-db
export DB_TYPE=POSTGRESQL
export DB_HOST=localhost
export DB_USER=postgres
export DB_PORT=5432
export DB_PWD=Prat@456
export MQ_HOST=localhost
export MQ_PORT=5672
export MQ_USERNAME=guest
export MQ_PASSWORD=guest
export REDIS_HOST=localhost
export REDIS_PORT=6379
export REDIS_REQD=true
export LOGGER_CONFIG='{"logStreams": [{"type": "pretty"}],"levels": {"default": "debug"}, "enableContextLogging": false}'
node server/migrate.js
node .
