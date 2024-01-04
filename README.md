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

Make sure postgres already started, you can start with `docker-compose` (postgres already configured in there). The database existed and can access with username and password. In this sample, postgres is 127.0.0.1:5432, and the database name is `postgres` with user `postgres` pass `changeme`.

If you have mailjet api key and secrect, then update `src/main/resources/application.yml`, `mailjet.enable` from `false` to `true`. If no mailjet, then all mail message (activation code, forgot password code ...) will be logged to console instead of mail.

Start dev service:

```shell
# environment can be set throught windows environments ui
# or unix shell rc file, for ex: ~/.bashrc with bash, or ~/.zshrc with zsh

export POSTGRES_URL="jdbc:postgresql://127.0.0.1:5432/postgres"
export POSTGRES_USER="postgres"
export POSTGRES_PASS="changeme"

export MAILJET_API_KEY="your mailjet api key"
export MAILJET_API_SECRET="your mailjet api secret"

cd webgame/backend
./gradlew run
```


## B2B


## B2C or B2E (end user project)

## Required tools:
Need install those:
- Nodejs (v20+) with pnpm
- Java v17

## Send mail Mailjet
Need update your own domain and create mailjet account for your mail service
After created account need add your domain and config spf/dkim based on guidelines here:
https://app.mailjet.com/account/sender?type=domain
https://app.mailjet.com/account/sender?type=auth

>> We can disable mail sending by set `mailjet.enabled` to `false` in `application.yml`

## Environments

```shell
# Database need to be existed (created) before run
POSTGRES_URL="jdbc:postgresql://127.0.0.1:5432/postgres"
POSTGRES_USER="postgres"
POSTGRES_PASS="changeme"

TEST_POSTGRES_URL="jdbc:postgresql://127.0.0.1:5432/postgres-test"
TEST_POSTGRES_USER="postgres"
TEST_POSTGRES_PASS="changeme"

# mailjet api keys for send mail
MAILJET_API_KEY="your mailjet api key"
MAILJET_API_SECRET="your mailjet api secret"

WEBGAME_HOME=/path/to/server
```
To clean flyway migration by gradle task need update build.gradle with correct postgres url/user/password
