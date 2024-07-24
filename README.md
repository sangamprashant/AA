
# The A to Z Classes

Welcome to The A to Z Classes project! This project is designed to handle various class-related functionalities including payment processing, sending confirmation emails, and more. Below you will find information on how to set up and run the project, as well as details about its features and functionality.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with The A to Z Classes project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/a-to-z-classes.git
   ```

2. Navigate to the project directory:
   ```bash
   cd frontend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add your environment variables as shown in the `.env.example` file.

5. Start the server:
   ```bash
   node app.js
   ```

## Usage

After completing the installation steps, you can start using the application by visiting `http://localhost:3000` in your web browser.

## Features

- **Payment Processing**: Handles payment processing using Razorpay.
- **Email Notifications**: Sends email notifications to users and admins upon payment completion.
- **HTML Content**: Serves a welcoming HTML page from the server.

## API Endpoints

Here are the main API endpoints available in the project:

### Add Study Material
- **Endpoint**: `/add-material`
- **Method**: `POST`
- **Description**: Adds new study material to the database.
- **Body Parameters**:
  - `title`: Title of the study material.
  - `pdf`: URL to the PDF file.
  - `image`: URL to the image.
  - `content`: Content of the study material.
  - `category`: Category of the study material.

### Delete Study Material
- **Endpoint**: `/delete-material/:id`
- **Method**: `DELETE`
- **Description**: Deletes study material by ID.
- **URL Parameters**:
  - `id`: ID of the study material to be deleted.

### Payment Processing
- **Endpoint**: `/create-payment`
- **Method**: `POST`
- **Description**: Creates a payment order.
- **Body Parameters**:
  - `name`: Name of the payer.
  - `mobileNumber`: Mobile number of the payer.
  - `email`: Email of the payer.
  - `purpose`: Purpose of the payment.
  - `amount`: Amount to be paid.
  - `selectClass`: Class for which the payment is made.

### Payment Completion
- **Endpoint**: `/complete-payment`
- **Method**: `POST`
- **Description**: Completes the payment process.
- **Body Parameters**: Payment details as required by Razorpay.

## Configuration

Make sure to configure the following environment variables in your `.env` file:

- `EMAIL`: Your email address used to send notifications.
- `EMAIL_PASSWORD`: Password for the email account.
- `FRONTEND_DOMAIN`: Domain of your frontend application for generating invoice URLs.

## Contributing

We welcome contributions to enhance the functionality of this project. If you wish to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch with your feature or bugfix.
3. Commit your changes to the branch.
4. Push the branch to your forked repository.
5. Create a Pull Request with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
