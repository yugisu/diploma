START_DELAY_SERVER=4
START_DELAY_FRONTEND=12

trap "exit" INT TERM
trap "docker-compose down && kill 0" EXIT

docker-compose up -d database

# Run shared
(cd shared && yarn watch | sed "s/^/`printf '\033[36m(shared)\033[0m'`   /;") &

# Run server
(sleep $START_DELAY_SERVER && cd server && yarn start | sed "s/^/`printf '\033[95m(server)\033[0m'`   /;") &

# Run frontend
(sleep $START_DELAY_FRONTEND && cd frontend && yarn start | sed "s/^/`printf '\033[94m(frontend)\033[0m'` /;") &

wait