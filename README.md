Gift Wishlist Manager

A wishlist app where you create a gift list, share it with friends, and they can reserve or buy items — without ruining the surprise. Built with React, Node.js, Express, and MongoDB.
What it does

Owners create wishlists, add/edit/delete items, and share a link with friends
Guests open the link, browse items, and reserve or mark them as purchased
Surprise protection — the owner never sees what's been reserved or bought

Branches

feature/auth — login and register
feature/wishlist-management — create, edit, delete wishlists
feature/item-management — add, edit, delete items
feature/guest-interaction — share, reserve, unreserve, purchase
feature/testing-cicd — unit tests and CI/CD pipeline

Testing
Backend tests using Mocha, Chai, and Sinon. Run with npm test in the backend folder.

CI/CD
GitHub Actions pipeline runs tests and deploys to AWS EC2 automatically on every push to main.
