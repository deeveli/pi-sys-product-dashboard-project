# PiSys Product Dashboard Project

This project is a React-based product management interface that connects to a public API to display, manage, and filter a list of products.

## Live Demo

You can view the live deployment of this project here: `https://pi-sys-product-dashboard-project.vercel.app`

## Features

This dashboard provides the following functionalities:

- **Product Display:** Fetches and displays products from `https://mock-data-josw.onrender.com/products` with their name, price, category, and rating.

- **CRUD Operations:**

  - **Create:** Add new products to the inventory.

  - **Edit:** Modify details of existing products.

  - **Delete:** Remove products from the list.

- **Favorites:** Mark and unmark products as favorites, with persistence across sessions using `localStorage`.

- **Search & Filter:**

  - Search products by `name`.

  - Filter products by `category` (fetched from `https://mock-data-josw.onrender.com/categories`).

  - Sort products by `price` (Low → High, High → Low).

- **Modal Details:** Clicking on a product row opens a modal displaying its name, price, description, and category.

- **Pagination:** Manages the display of large product lists efficiently.

- **Toast Notifications:** Provides feedback for successful operations (creation, update, deletion) and API errors.

## Tech Stack

- **Required:** React

- **Optional (Used):**

  - [State Management Library (e.g., Redux, Zustand, Context API)] - _Specify which one you used here if any._

  - [UI Library/Framework (e.g., Tailwind CSS, Material UI, Shadcn UI)] - _Specify which one you used here if any._

## Getting Started

### 1. Clone this template

You can simply click the **`Use this template`** button on this repository. Please be aware that there will be an attribution on your repository. It would be greatly appreciated if you could leave this attribution intact, as it will help others discover and benefit from this template as well. Thank you! 😄"

Alternatively, you can clone using `create-next-app`:

```bash
npx create-next-app -e [https://github.com/deeveli/pi-sys-product-dashboard-project](https://github.com/deeveli/pi-sys-product-dashboard-project) project-name
```

Or using `degit`:

```bash
npx degit deeveli/pi-sys-product-dashboard-project YOUR_APP_NAME
```

### 2. Install dependencies

It's encouraged to use **yarn** so the husky hooks can work properly.

```bash
yarn install
```

### 3. Run development server

You can start the server using this command:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/app/(dashboard)/page.tsx`.

## Assumptions and Decisions Made

- **State Management:** I have been using context API for a while however, researching Zustand made mw come the conclusion that it'd be best to use Zustand, It was chosen for its lightweight nature and simplicity, providing an efficient way to manage global application state without the boilerplate of Redux."

## Navigation Flow

- **View Products:** Upon loading, the dashboard displays a paginated list of all products.

- **Add Product:** Click the **`Add Product`** button to open a form for creating a new product. Fill in the details and submit.

- **Edit Product:** Click the **`Edit`** icon next to a product in the table to open a pre-filled form for updating its details.

- **Delete Product:** Click the **`Delete`** icon next to a product to remove it from the list. A confirmation prompt may appear.

- **View Product Details:** Click on any row in the product table to open a modal with more detailed information about that product.

- **Mark as Favorite:** Click the **`Star`** icon next to a product to toggle its favorite status.

- **Search:** Use the search bar to filter products by name.

- **Filter Toggle (Mobile):** Use the filter icon to to toggle filter section.

- **Filter by Category:** Select a category from the dropdown to display products belonging to that category.

- **Sort by Price:** Use the sort options to arrange products by price in ascending or descending order.

- **Pagination:** Use the pagination controls at the bottom of the table to navigate through different pages of products.

## What I'd Improve with More Time

- **Robust Form Validation:** Implement more comprehensive client-side form validation for product creation and editing to provide immediate feedback to users.

- **User Authentication:** For a production-ready application, implementing user authentication and authorization would be crucial to control access to CRUD operations.

- **Backend Integration for Favorites:** While `localStorage` works, persisting favorites to a backend database would allow users to access their favorites across different devices and sessions more reliably.

- **Debouncing Search Input:** Implement debouncing on the search input to reduce the number of API calls as the user types.

- **Testing:** Add unit, integration, and end-to-end tests to ensure the application's stability and reliability.

Feel free to explore the project and provide any feedback!
