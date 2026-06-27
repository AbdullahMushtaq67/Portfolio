# Certificates

Certificate images are organized into one folder per category (issuer).
Each folder maps to a category key in the `certifications` object in `src/app/App.tsx`.

## Folder structure

```
public/certs/
  ibm/                -> "IBM"
  google/             -> "Google"
  cisco/              -> "Cisco"
  hp-life/            -> "HP Life"
  eu-cyber-academy/   -> "EU Cyber Academy"
  govt-punjab/        -> "Govt. of Punjab"
  other/              -> "Other"
```

## How to add a new certificate

1. Drop the image file into the matching category folder
   (e.g. `public/certs/google/my-new-cert.png`).
   If the category has no folder yet, create one.

2. Add an entry to the matching category array in
   `src/app/App.tsx` -> `certifications`:

   ```ts
   { name: 'Certificate Title', year: '2026', image: '/certs/google/my-new-cert.png' },
   ```

   - `name`  (required) – the title shown under the thumbnail.
   - `year`  (optional) – shown as a small caption.
   - `verify`(optional) – verification URL.
   - `image` (optional) – path under `/public`. Omit it and the cert is
     listed as a text-only row until an image is added.

Images render as thumbnails (full certificate visible, click to enlarge).
