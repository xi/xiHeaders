# xiHeaders - modify request headers

This is yet another extension to modify request headers. It stands out by being
extremely simple (~100 lines of code).

## Rules

Rules are defined as a JSON. Each rule has the following properties:

-   pattern: the URL pattern this rule applies to. Patterns can include `*` as
    a wildcard.
-   header: the name of the header
-   value: the new value
-   action: add|replace|remove [default: replace]

## Examples

Show reddit images instead of redirecting to a HTML page:

```json
{
  "pattern": "https://i.redd.it/*",
  "header": "Accept",
  "value": "image/*"
}
```

A similar rule can also be used for `i.imgur.com`.

## Prior Art

-   https://addons.mozilla.org/firefox/addon/header-editor/
-   https://addons.mozilla.org/firefox/addon/modify-header-value/
-   https://addons.mozilla.org/firefox/addon/simple-modify-header/
