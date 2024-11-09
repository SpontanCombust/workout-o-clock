# Migrations

Migrations in the database should be handled using [Liquibase](https://docs.liquibase.com/commands/command-list.html) changelogs. You can do that easily by running the `liquibase` service with `docker compose` like so:
```sh
docker compose run --rm liquibase update
```

All changelogs are grouped into version folders. With each new version a new entry needs to be added at the bottom of `changelog-root.yml`.

Each migration YAML file should contain just one changeset with the id referencing its name. 
Naming convention of these files is: `{YYYY}{MM}{dd}-{HH}{mm}_{changeset_name}` and changeset's `id` property inside should be named the same. This convention assures migrations are run in a correct order.