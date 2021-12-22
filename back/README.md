
MAC
brew services start postgresql

ACCESS
psql postgres

CREATE ROLE ochir WITH LOGIN PASSWORD '91712074'

sudo -u postgres createuser --superuser name_of_user


CONNECT
psql ochir -d iot