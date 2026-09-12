# ReadyCheck pilot operations

Run a single persistent container with HTTPS and a durable volume at `/app/data`. Keep `LIVE_CALLS_ENABLED=false` for the sample pilot. The application has no public business discovery, email verification or password recovery service. An operator must be available before inviting users to depend on it.

## Railway configuration

The supplied `railway.json` builds the root Dockerfile and probes `/api/health`. Create a separate project and service, attach a volume at `/app/data`, and set:

```text
NODE_ENV=production
BIND_HOST=0.0.0.0
PORT=3000
DATABASE_PATH=/app/data/readycheck.sqlite
APP_ORIGIN=https://<the-generated-service-domain>
LIVE_CALLS_ENABLED=false
RAILWAY_RUN_UID=0
```

Use one replica. Do not override the Docker start command. [Railway volumes mount as root](https://docs.railway.com/volumes#permissions); the container entry point prepares only the database directory and SQLite files, rejects symbolic links, and drops to UID/GID 1000 before importing the server. Ordinary Docker named volumes use the image's default `node` user.

Set credentials only through the host's secret variable controls. Agent CLI OAuth credentials are separate from the application's REST API key and must not be copied into this deployment. Enabling the server does not replace the recipient allowlist, account allowlist, budget controls or per-plan approval.

After deployment, verify signup, a saved fictional comparison, sign-out/sign-in, and persistence after a service restart. A green health probe establishes HTTP availability, not a successful CALL-E inquiry. Deployment with SQLite incurs restart downtime; zero-downtime multi-replica operation is not supported.

## Backup

Use Node 24 for the operation below (the backup API requires at least Node 22.16). Run as the application user inside the container:

```sh
node scripts/backup.mjs /app/data/backups
```

The script uses [SQLite's online backup API through Node](https://nodejs.org/api/sqlite.html#sqlitebackupsourceDb-path-options), opens the source read-only, creates a unique private directory and validates the resulting snapshot with `PRAGMA integrity_check`. It includes committed WAL transactions and never overwrites an earlier snapshot. Only the output path is printed. A failed command is not a successful backup.

Export the verified snapshot to restricted storage outside this volume. Keeping the only backup alongside the source does not protect against volume loss. Backups contain account credentials, sessions, cases and transcripts; restrict access and apply the same retention/deletion policy. Schedule and monitor backups before inviting users. Automatic backups are not configured by the application.

## Restore drill and recovery

1. Keep the original service and volume intact. Provision an isolated replacement volume and service with live calling disabled and no CALL-E key.
2. Copy the verified snapshot to `/app/data/readycheck.sqlite` on the empty replacement volume. Do not mix it with older `-wal` or `-shm` files.
3. Start the container, verify health, sign in with a test account, and inspect saved cases and revisions. Compare expected records from the backup time; newer writes cannot be restored from an older snapshot.
4. Before switching traffic, stop writes to the original service. Reconcile every inquiry created since the snapshot with provider records. Stop restored queued work and invalidate its approvals; never enable calls merely because the restore succeeded. Keep uncertain calls paused and recover known IDs read-only.
5. Switch traffic only after the operator verifies the replacement. Preserve the old volume for rollback and maintain `LIVE_CALLS_ENABLED=false` until reconciliation is complete.

Account support currently means helping a user recover access through an established session or export their case data. There is no automated email reset. Do not reset an account based only on someone claiming its email address.

## Rollback or disable

Set `LIVE_CALLS_ENABLED=false` and restart to prevent new dispatches. This does not cancel an active provider call. Use the application's stop-future-calls action for queued plans and retain inquiry records for reconciliation. Roll back the application image only if it supports the existing database schema; never replace the live volume with an older snapshot as a routine code rollback.
