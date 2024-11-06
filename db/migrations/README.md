# Migrations

Migrations in the database should be handled using [Liquibase](https://docs.liquibase.com/commands/command-list.html) changelogs. You can do that easily by running the `liquibase` service with `docker compose` like so:
```sh
docker compose run --rm liquibase update
```

Naming convention of changelogs is: `changelog-{version_tag}_{YYYY}{MM}{dd}-{HH}{mm}_{changelog_name}`