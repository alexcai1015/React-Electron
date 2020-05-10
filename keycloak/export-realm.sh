#!bin/bash
# Force terminal exit to 0 for killing export.
trap 'exit 0' SIGTERM

TIMEOUT_SECONDS=40
REALM_NAME=rapidpass
JSON_EXPORT_FILE=/tmp/exports/${REALM_NAME}-realm-dev.json

# Start a new keycloak instance with exporting options enabled.
# Use port offset to prevent port conflict from the "real" keycloak instance.
timeout ${TIMEOUT_SECONDS}s \
  /opt/jboss/keycloak/bin/standalone.sh \
    -Dkeycloak.migration.action=export \
    -Dkeycloak.migration.provider=singleFile \
    -Dkeycloak.migration.realmName=${REALM_NAME} \
    -Dkeycloak.migration.usersExportStrategy=REALM_FILE \
    -Dkeycloak.migration.file=${JSON_EXPORT_FILE} \
    -Djboss.socket.binding.port-offset=99 \

# Grab the keycloak export instance process id
PID="${!}"

# Stop the keycloak export instance
kill ${PID}
