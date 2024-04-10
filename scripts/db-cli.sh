#!/bin/bash
# Description: This script is used to run the database CLI.
source .env.development.local
psql $DATABASE_URL # This is the database URL for the development environment