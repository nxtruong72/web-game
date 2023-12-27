# Web Game Guidelines

## Folder structure:
```
|--web-game
   |--backend    # backend service folder
   |--docker     # docker related files
   |--docs       # common document files
   |--scripts    # bash scripts file for build/deployment support
   |--frontend   # frontend projects
      |--b2b     # CMS frontend project - for staff/admin to control the application
      |--b2c     # Web application project - end users website application
   docker-compose.yml  # starting and test as services
   package.json        # build make whole project
   pnpm-workspace.yaml # sub-projects configured
```

## Backend


## B2B


## B2C or B2E (end user project)

## Required tools:
Need install those:
- Nodejs (v20+) with pnpm
- Java v17

## Environments

```shell
# Database need to be existed (created) before run
POSTGRES_URL="jdbc:postgresql://127.0.0.1:5432/postgres"
POSTGRES_USER="postgres"
POSTGRES_PASS="changeme"

TEST_POSTGRES_URL="jdbc:postgresql://127.0.0.1:5432/postgres-test"
TEST_POSTGRES_USER="postgres"
TEST_POSTGRES_PASS="changeme"

WEBGAME_HOME=/path/to/server
```
To clean flyway migration by gradle task need update build.gradle with correct postgres url/user/password