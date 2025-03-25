🛡️ Data Download Duplication Alert System (DDAS)

📌  Overview

The Data Download Duplication Alert System (DDAS) is designed to address the problem of duplicate data downloads in an organization or institute. By checking for duplicate files using content hashes, it optimizes storage, saves bandwidth, and promotes efficient data management.

🎯 Features

Prevent Duplicate Downloads:

The system checks if a file has already been downloaded by any user in the organization.

If a duplicate is detected, the user is alerted with details about the existing file (e.g., file name, size, location, and who downloaded it).

This helps avoid unnecessary downloads, saving bandwidth and storage space.

Efficient Data Management:

Maintains a centralized repository of all downloaded files with metadata (e.g., file name, size, type, content hash, download location, and user who downloaded it).

Provides a clear overview of all downloads, making it easier to manage and track data usage.

User Authentication and Authorization:

Users must log in to access the system.

Admins have additional privileges (e.g., adding users, viewing all downloads).

File Metadata Tracking:

Tracks metadata such as:

File Name: Name of the downloaded file.

File Size: Size of the file in bytes.

File Type: Type of the file (e.g., CSV, PDF).

File Content Hash: A unique hash generated from the file content to identify duplicates.

Download Location: Path where the file is stored.

Metadata: Additional information like period (start and end dates) and spatial domain.

Alerts for Duplicate Files:

When a user attempts to download a file, the system checks for duplicates based on:

File Content Hash: Ensures identical files are detected even if the file names differ.

File Size: Helps identify potential duplicates.

Metadata: Checks for files with similar attributes (e.g., same time period or spatial domain).

Download History:

Users can view their download history.

Admins can view all downloads across the organization.

🔧 Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Token)

Utilities: Crypto (for file hashing), Bcrypt (for password hashing)

🚀 Future Enhancements

File Sharing: Allow users to share files directly within the system.

Advanced Search: Add search functionality to find files by metadata.

Notifications: Send email or in-app notifications for duplicate alerts.

Analytics Dashboard: Provide insights into download trends and usage patterns.

Role-Based Access Control: Add more granular permissions for different user roles.

🤝 Contributing

We welcome contributions! 🎉
If you’d like to contribute:

Fork the repository.

Create a feature branch.

Commit your changes.

Submit a pull request.
