# 📖 Book-Talk

Book-Talk is a frontend application that allows users to interact with the Book-Talk API through a user-friendly interface.

## Purpose

Book-Talk was created as the final project for Coding Factory 5 at Athens University of Economics and Business. This project aims to demonstrate our skills and knowledge in frontend development, API integration, user interface design, and application deployment.

## 📋 Table of Contents

- [Link to Deployed Version](#link-to-deployed-version)
- [Link to Backend API Repository](#link-to-backend-api-repository)
- [Features](#features)
- [Installation Instructions](#installation-instructions)
- [Technologies Used](#technologies-used)

## Link to Backend API Repository

The backend API repository for this project can be found [here](https://github.com/TennoAndros/be-cf5-project).

## Features

The Book Talk App includes the following features and functionality:

### Books

- **Global Header & Footer**: Users can access their profile, links to social media, and the developer's GitHub profile.

- **Home Page**: The home page features a popular books carousel, showcasing the highest-rated books displayed using a swiper, an introduction, and an explore section to see all books. Additionally, it has a header/navbar with a search bar, functional dark/light mode, and an icon displaying the logged-in user's image, from which they can access their profile.

- **Sorting and Filtering**: Users can sort books based on various criteria such as title, genre, author, rating, and reviews count. They can also choose to show books of a specific genre only.

- **Pagination**: The list of books is initially limited to 18, with a "Load More" button at the bottom of the page to load additional books.

- **Book Page**: When a book card is selected, users are redirected to the book page displaying the full book, including the title, image URL, description, author, publisher, Amazon book URL, ISBN, genre, average rating, and a list of reviews.

- **Posting Books**: Logged-in users can post new books.

### Reviews

- **Displaying Reviews**: Reviews are displayed on the related book's page.

- **Posting, Updating, and Deleting Reviews**: Logged-in users can post reviews on books, update their own reviews, and delete their own reviews.

- **Ratings**: Reviews include a rating from logged-in users. The application calculates and displays the average rating for each book. Users can also update their ratings.

### Authentication and Authorization

- **Authentication**: Users can sign up and sign in using cookies for authentication. This ensures a secure and personalized experience.

- **Admin Privileges**: Only the Admin user has the ability to delete books from the platform.

## 🛠️ Installation Instructions

### Prerequisites

- Node.js (v20.14.0 or later) must be installed on your system.

### Setup

1. Clone the repository:

```bash
git clone https://github.com/TennoAndros/be-cf5-project
cd FE-Book-Talk
```

2. Install dependencies:

```bash
npm i
```

3. Launch the application in your browser::

```bash
npm run dev
```

### Note on Authentication

In order to enable authentication using cookies, ensure both the frontend and backend servers are running locally. This feature has not been tested in a hosted environment.

## Technologies Used

The FE-Book-Talk app was created using the following technologies:

- [React](https://react.dev/): JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): Fast build tool and development server.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for rapid UI development.
- [Firebase](https://firebase.google.com/): Platform for building web and mobile applications, used for authentication, database, and hosting.
- [Redux](https://redux.js.org/): Predictable state container for JavaScript apps, used for managing application state.
