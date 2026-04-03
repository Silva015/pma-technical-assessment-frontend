# DEPENDENCIES AND REQUIREMENTS

Welcome! In a Node.js ecosystem (like this Next.js project), developers do not traditionally use static files like python's `requirements.txt` to track required packages.

Instead, all application prerequisites are permanently registered inside the `package.json` file, and completely version-locked down by `yarn.lock` or `package-lock.json`. 

By simply declaring:
`yarn install` (or `npm install`)

The underlying package manager reads `package.json` and perfectly matches identically requested package builds for the whole project automatically—fetching React, Next.js, and Tailwind binaries completely seamlessly.

If you are strictly auditing the packages that this application leverages out-of-the-box, look directly into the `dependencies` mapping of `package.json`. Below is a quick abstract visualization:

PRODUCTION:
- next (16.2.2) -> powers the fundamental framework, APIs, routing.
- react (19.2.4) -> React DOM.
- tailwindcss (^4) -> styling mechanisms.
- lucide-react -> layout iconography.

For more technical integration details and instructions on how to boot this Application, view the main `README.md`!
