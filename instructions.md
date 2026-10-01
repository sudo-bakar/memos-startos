# Memos

## Documentation

- [Memos documentation](https://usememos.com/docs) — how to use Memos and what each feature does.
- [Docker deployment guide](https://usememos.com/docs/deploy/docker) — the settings reference behind the environment this package sets for you.

## What you get on StartOS

- **One web address** that serves both the Memos interface and its API. Open it
  from the Dashboard to sign in, write notes, and upload attachments.
- **Everything stored in one place.** Your notes, accounts, and attachments all
  live in the service's data volume, so a backup captures the whole instance and
  a restore brings it back ready to use.

## Getting set up

Memos has no way to create an administrator for you, so the first account wins
the role.

1. Open the **Web Interface** from the Dashboard.
2. **Create your account.** The first one created becomes the administrator of
   this instance.
3. In Memos, open **Settings** and turn off public sign-up, unless you want
   other people to be able to register.

That is everything a normal install needs.

## Using Memos

### Web interface

The web interface is the whole application: your notes, tags, attachments,
search, and the admin settings. It also serves the REST and gRPC APIs that the
mobile and browser clients use, at the same address.

### Instance URL and public access

Memos has a single "instance URL" — the canonical address it advertises to
clients and trusts for cross-origin requests. StartOS sets that for you from
whichever address you have enabled, which is right for most people but changes
if you later enable or disable an address.

If you want Memos to advertise a stable origin — normally your own domain — pin
it instead:

1. Open **Actions → Set Instance URL**.
2. Choose the address you want Memos to advertise — normally your own domain.
3. Memos restarts and uses it from then on. Choose **Auto** later to go back to
   letting StartOS pick.

Whether the instance is public or private is a separate setting inside Memos,
under **Settings → System → Access and policies**. It is decided once from the instance
URL when Memos first starts: an instance with an address starts public, one
without starts private. Change it there at any time; changing the instance URL
later does not flip it.

### If you lose your password

Memos has no "forgot password" link and no way to email you a reset, so StartOS
provides one:

1. **Stop the service.** The action rewrites the database directly, so nothing
   may be using it.
2. Run **Actions → Reset Admin Password**.
3. Copy the username and password it gives you — the password is shown once.
4. Start the service and sign in.

This resets the administrator account only, and signs out any session that was
signed in with the old password. If you are the administrator and someone else
has forgotten *their* password, change it for them from Memos' own settings
instead.

### Actions

- **Set Instance URL** — pins the address Memos advertises, or returns it to
  **Auto**. Only needed when generated links should use a stable domain.
- **Reset Admin Password** — mints a new administrator password when you are
  locked out, and signs out sessions using the old one. The service must be
  stopped first.
