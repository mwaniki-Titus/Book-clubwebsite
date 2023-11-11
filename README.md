# Book-clubwebsite
Book Club Website
Flask API with SQLAlchemy and Flask-Admin
This React application is a book club website that allows users to explore book clubs, view book details, create clubs, and interact with other members. Users can log in, sign up, and access various features based on their authentication status. The website uses React Router for navigation and state management to provide a seamless user experience.

The application is structured into different routes, including the landing page, user profile, club creation, and book details. Users can log in, and their authentication status is maintained using local storage. The website is designed to be user-friendly and engaging for book enthusiasts.

This project is a Flask-based API for managing clubs, users, book summaries, and ratings. It uses SQLAlchemy for database management and Flask-Admin for administrative access to the database. This README provides an overview of the project and instructions on how to set it up and use it.

Table of Contents
Features
Overview
Prerequisites
Installation
Configuration
Usage
Endpoints
Admin Access
Contributing
License
Features
User registration and login.
Club management with details such as name, description, image, location, and date founded.
Book management with details such as title, author, image, club association, summaries, and ratings.
User-written book summaries.
User-following system.
User ratings and comments on clubs.
Administrative access to manage users, clubs, books, ratings, and summaries.
Overview
Book Club Website provides a seamless and interactive experience for users with various features and components. It enables users to access a wide range of functionalities:

1.Landing Page: A welcoming landing page where users can get a glimpse of the book club world.

2.Club Display: Explore and join existing book clubs to connect with like-minded readers.

3.Create Club: Organize your book club, set up club details, and manage memberships.

4.User Profile: Personalized user profiles to track activities, manage book clubs, and access book summaries.

5.About Section: Learn more about the platform, its mission, and vision.

6.Log In/Sign Up: User authentication with a smooth transition between login and signup.

7.Club Section: Dive deep into specific book clubs, view book details, and participate in discussions.

8.Book Details: Explore the intricate details of books, including summaries, authors, and more.

Prerequisites
Before setting up the project, make sure you have the following installed:

Python 3.x
pip
PostgreSQL or another supported database (with the necessary environment variables set)
Virtual environment (recommended)
Installation
Clone the repository:
git clone https://github.com/your-username/your-project.git
cd your-project
Create a virtual environment (optional but recommended):
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies:
pip install -r requirements.txt
Configuration
Create a .env file in the project's root directory and add the following environment variables:
SECRET_KEY=your-secret-key
DB_URL=your-database-url
Replace your-secret-key with a secure secret key and your-database-url with the URL to your PostgreSQL database.
Usage
Start the Flask application:
 npm run dev
Access the API at http://localhost:5173/.
Endpoints
Here are some of the API endpoints available:

/usersignup: Register a new user.
/userlogin: Log in a user.
/userprofile: Retrieve the user's profile.
/userlogout: Log out a user.
/user: Get the current user's information.
/clubs: Get a list of all clubs.
/club/<int:id>/rating: Get ratings for a specific club.
/rating: Create a new rating.
/clubs/<int:id>: Get details about a specific club and its books.
/createClub: Create a new club.
/getbooks: Get a list of all books.
/createbook: Create a new book.
/summaries: Create a book summary.
/book/<int:id>: Get summaries and reviews for a specific book.
Admin Access
To access the administrative interface:

Go to http://localhost:5173/admin.
Log in with admin credentials.
You can manage users, clubs, books, ratings, summaries, and more using the admin interface.
Contributing
We welcome contributions from the community. If you find a bug, have a feature request, or want to contribute code, please read our Contribution Guidelines for details on how to get involved.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Team Members
1.Titus Munyoki - Backend

2.Natalie Wanjiru- Backend

3.Abdi Halake - Frontend

4.Faith Kaburu-Frontend

5.Philip Ogaye - Frontend

