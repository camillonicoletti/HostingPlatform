# French localization design

## Goal

Add complete French support to the existing Italian/English guest guide. Guests must be able to select `FR` from the header and use every visible flow in natural, polite French using `vous`.

## Scope

- Add a French locale under `content.locale.fr` with the same data shape and section order as Italian and English.
- Translate all guest-facing copy: navigation, cards, sheets, check-in, Wi-Fi, house rules, supermarkets, transport, health, banks/post office, check-out, recycling, reminders, emergency contacts, reviews, errors, accessibility labels, and image alternative text.
- Preserve proper names, addresses, phone numbers, Wi-Fi credentials, URLs, bus numbers, hospital/pharmacy names, app names, and the literal booking platform placeholder `HOUSE`.
- Add a `FR` button after `IT` and `EN`. Its accessible name is `Français`.
- Accept `fr` in stored-language initialization, set `<html lang="fr">`, and persist the selection in `guest-guide-language`.
- Keep Italian as the fallback for missing or invalid stored values.
- Keep the current visual design; only make the minimum responsive adjustment needed for three language buttons.

## Architecture and data flow

The current localization architecture remains unchanged. `App` owns the selected language, persists it, and requests a merged guide from `getLocalizedContent`. `Header` only renders language controls. The French locale is a peer of the Italian and English locales, so all shared operational data continues to come from the existing top-level constants.

Language selection follows this flow:

1. Read `guest-guide-language` at startup and accept `it`, `en`, or `fr`.
2. Render the matching locale through `getLocalizedContent`.
3. On `FR`, update state, local storage, and the document language immediately.
4. If storage is unavailable, keep French active for the current session.

## Translation rules

- Use professional, welcoming French and address guests with `vous`.
- Prefer familiar travel vocabulary over literal translation.
- Keep operational instructions unambiguous, especially for access, waste collection, health, and emergencies.
- In the recycling notice, only `VERRE` is highlighted in red; its article remains normal text, matching the Italian treatment of `Il VETRO`.
- Calendar titles and descriptions are translated, while dates and recurrence behavior remain unchanged.

## Error handling

Existing fallbacks remain in place: invalid language values fall back to Italian, local-storage errors do not block switching, and calendar/copy failures display the localized French error message.

## Verification

- Add a content test proving French has all eight sections, both health tabs, seven recycling days, and key translated strings.
- Add an interaction test proving `FR` switches immediately, persists `fr`, and updates the document language.
- Verify the French button and the three-button selector at mobile width.
- Run the complete automated test suite and production build.

## Out of scope

No automatic translation service, new i18n dependency, URL localization, content-management interface, or change to the existing Italian and English wording.
