# Kittikorn Kasaetip Academic Portfolio

A responsive GitHub Pages portfolio for presenting an academic profile, doctoral research, publications, and conference presentations.

## Updating content

Most routine updates require editing only `portfolio-data.js`.

### Add a publication

1. Open `portfolio-data.js`.
2. Copy one object inside the `publications` array.
3. Update the year, type, title, venue, and link.
4. Place the newest item at the top.
5. Update `lastUpdated`.

Use `conference-proceeding` or `research-output` for the `type` field so the website filter continues to work.

### Add a presentation

Copy one object inside the `presentations` array, update the date, event, location, and title, then place the newest item at the top.

## Main files

- `index.html` contains the page structure and profile narrative.
- `portfolio-data.js` contains publications and presentations.
- `style.css` controls the visual design and responsive layout.
- `script.js` renders portfolio entries, filters outputs, and manages navigation.
- `assets/profile-research-avatar.png` is the profile image.

## Publishing

GitHub Pages should publish from the repository's configured Pages branch. Review proposed changes in a pull request before merging them into `main`.
