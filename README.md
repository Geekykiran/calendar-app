# Calendar App

A modern, responsive calendar application built with React Vite and TailwindCSS. This project allows users to create, view, and manage events efficiently, with a focus on usability and performance.

## Live Demo

Check out the live deployed app here: [https://geekykiran.github.io/calendar-app/](https://geekykiran.github.io/calendar-app/)

## Features

- **Add, edit, and delete events**
- **Monthly calendar view**
- **Event details modal**
- **LocalStorage persistence** (Bonus)
- **Search events by title** (Bonus)
- **Responsive design for desktop and mobile**

## Bonus Features Implemented

- **LocalStorage Persistence:** All events are saved in the browser, so your data remains after refreshing or closing the app.
- **Search Events by Title:** Quickly find events using the search bar.

## Bonus Features Open for Contribution

- **Color-coded categories** (e.g., Personal, Work)
- **Drag & drop event rescheduling**
- **Recurring events** (simple weekly/daily toggle)
- **Day view or Week view**

See [Contribution Guidelines](#contributing) below if you’d like to help implement these features!

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Geekykiran/calendar-app.git
    cd calendar-app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the app locally:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173` (or as indicated in your terminal).

## Project Structure

```
/src
  /components      # Reusable React components (Calendar, EventModal, DayCell)
  /context         # Utility functions (state and function management, storage)
  /hooks           # Custom hooks for days generations
  App.jsx          # Main app component
  main.jsx         # Entry point
index.html
vite.config.js
package.json
```

## Time Taken

Development time: **~7 hours**  

## Contributing

Contributions are welcome! To work on bonus features:

1. Fork the repository and create a new branch for your feature.
2. Follow existing code style and structure.
3. Submit a pull request with a clear description of your changes.

For bonus features, please reference the feature in your PR title (e.g., `[Feature] Color-coded categories`).

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Inspired by the Calendar App by Google

---

Feel free to open issues for bugs, suggestions, or feature requests!
