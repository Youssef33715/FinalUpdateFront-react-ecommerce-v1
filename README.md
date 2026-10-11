# Full-Stack E-Commerce Platform

A feature-rich e-commerce web application built with **React.js, Node.js, Express.js, and MongoDB**. This project brings together a complete online shopping experience and an administrative dashboard, with a RESTful API powering authentication, product management, shopping carts, orders, and payments.

The project was developed to put full-stack development concepts into practice, from building reusable React components and managing application state to implementing backend services, database operations, authentication, and payment integration.

**Frontend Repository:** [FinalUpdateFront-react-ecommerce-v1](https://github.com/Youssef33715/FinalUpdateFront-react-ecommerce-v1)  
**Backend Repository:** [ecommerce-api](https://github.com/Youssef33715/ecommerce-api)  
**Developer:** [Youssef Mohamed on LinkedIn](https://www.linkedin.com/in/youssef-mohamed-a67a65399/)

---

## Project Overview

This project is more than a product catalog. It includes customer-facing shopping pages, account management, order workflows, and a dedicated admin dashboard for managing the store.

The frontend communicates with a custom REST API and uses Redux for application state management. The backend follows a structured Express.js architecture with services, models, routes, authentication middleware, and reusable request handlers.

## Features

### Customer Experience

- **Authentication & Account Management**
  - User registration and login.
  - Password recovery and reset flows.
  - Protected account functionality.
  - Profile and saved-address management.

- **Product Discovery**
  - Browse products, categories, subcategories, and brands.
  - Product listing with filtering, sorting, and pagination.
  - Detailed product pages with image galleries and thumbnails.
  - Product ratings, reviews, and related product recommendations.

- **Shopping Cart & Wishlist**
  - Add products to the cart and update quantities.
  - Remove individual items and clear the cart.
  - Apply discount coupons.
  - Manage a personal wishlist.
  - Review cart totals before checkout.

- **Checkout & Orders**
  - Select a saved delivery address.
  - Cash-on-delivery checkout.
  - Stripe payment integration.
  - View order history and order details.
  - Track payment and delivery status.

- **User Interface**
  - Arabic, right-to-left shopping experience.
  - Responsive layouts for different screen sizes.
  - Dedicated account pages for orders, addresses, wishlist, and profile management.

### Admin Dashboard

A dedicated administration interface for managing the store's data and daily operations.

- **Dashboard:** View available store statistics and operational information.
- **Product Management:** Create, edit, and manage products.
- **Catalog Management:** Manage categories, subcategories, and brands.
- **Order Management:** View orders and update payment and delivery states.
- **User Management:** Manage customer accounts.
- **Review Management:** View and manage product reviews.
- **Coupon Management:** Create and manage discount coupons.

Administrative features use the existing backend API and authorization rules.

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Component-based user interface |
| Redux | Application state management |
| Redux Thunk | Asynchronous Redux actions |
| React Router | Client-side navigation |
| Axios | HTTP requests to the backend API |
| Bootstrap / React-Bootstrap | UI components and responsive layouts |
| JavaScript | Application logic |
| CSS | Custom styling and layout |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API and request handling |
| MongoDB | Database |
| Mongoose | Data modeling and database operations |
| JWT | Authentication |
| Stripe | Online payment integration |
| Sharp | Product image processing |
| Express middleware | Authentication, authorization, validation, and request handling |

### Security & API Capabilities

The backend also uses middleware and utilities for concerns such as HTTP security headers, request rate limiting, request compression, and input handling.

The API covers authentication, users, products, categories, subcategories, brands, reviews, wishlists, addresses, coupons, shopping carts, and orders.

## Architecture & Engineering

The application separates the frontend from the backend, allowing the React application to communicate with the server through HTTP API requests.

The backend uses a layered structure that separates routing, business logic, database models, and shared request-handling utilities.

Key development concepts applied in the project include:

- Reusable React components and custom hooks.
- Centralized application state with Redux.
- RESTful API integration.
- Authentication and role-based authorization.
- Database relationships and data population with Mongoose.
- Asynchronous request handling and error management.
- Image processing and file uploads.
- Cart, checkout, coupon, and order workflows.
- Separation of customer-facing pages from administrative interfaces.

## Project Structure

### Frontend

```text
src/
├── Api/
├── Components/
├── Page/
├── hook/
├── redux/
├── App.js
└── index.js
```

The frontend is organized into API configuration, reusable components, pages, custom hooks, and Redux state management.

### Backend

The backend is maintained in a separate repository:

[View the Backend Source Code](https://github.com/Youssef33715/ecommerce-api)

Its structure separates routes, services, models, middleware, validators, and shared utilities.

## Getting Started

### Prerequisites

- Node.js and npm.
- Access to a configured backend API.
- MongoDB configured for the backend if running the entire application locally.
- Stripe credentials for testing payment functionality.

### 1. Clone the frontend

```bash
git clone https://github.com/Youssef33715/FinalUpdateFront-react-ecommerce-v1.git
cd FinalUpdateFront-react-ecommerce-v1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

Create a `.env` file in the frontend root and set `REACT_APP_API_URL` to the backend API base URL expected by the application.

Use the provided `.env.example` as a reference. Do not commit real secrets or private credentials.

### 4. Start the development server

```bash
npm start
```

The application will start using the local development server configured by Create React App.

### Running the Backend

Follow the setup instructions in the [backend repository](https://github.com/Youssef33715/ecommerce-api) to configure its environment variables, database connection, and payment integration.

## Demo

A full project walkthrough video will be linked here.

The walkthrough demonstrates the application's main shopping experience and administrative functionality.

## Future Improvements

Potential areas for further development include stronger automated integration testing, additional checkout validation, persistent production image storage, and continued security hardening.

## Author

**Youssef Mohamed**  
Computer Science and Artificial Intelligence Student | Full-Stack Developer

- **GitHub:** [Youssef33715](https://github.com/Youssef33715)
- **LinkedIn:** [Youssef Mohamed](https://www.linkedin.com/in/youssef-mohamed-a67a65399/)

---

*Built as a hands-on full-stack development project, combining frontend engineering, backend API development, database integration, and e-commerce workflows.*

