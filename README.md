# Tycoon

A simple idle tycoon game. Click to make money, buy businesses that make money for you, and buy upgrades so they earn more. You keep earning even when the game is closed.

## How to get it running

Step 1: clone the repo

```
git clone https://github.com/Joseph-Rus/tycoon-midterm-web.git
cd tycoon-midterm-web

```

Step 2: set up the backend (only the first time)

You will need Python 3.12 or newer and Node.js installed.

```
cd backend
cp .env.example .env
python3 -m venv .venv
source .venv/bin/activate
pip install -r req.txt
python manage.py migrate
python manage.py loaddata starter_data
```

On Windows use `.venv\Scripts\activate` instead of the source line.

Step 3: start the backend

```
python manage.py runserver
```

Step 4: open another terminal, go into the frontend folder and start it

```
cd tycoon-midterm-web/frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## How to play

Step 1: create an account

Step 2: log in with the account you just made or one you made before

Step 3: play the game


## 15 Features:

* Account registration with Django password validation
* Token-based login
* Logout
* Stay logged in across page reloads
* Auto-logout with a message when the session token is invalid 401 error
* Click to earn money
* Buy businesses
* Scaling cost
* Offline earnings calculated from the time elapsed since the last visit
* Upgrades that increase a business's income
* Server-side purchase validation
* Race-condition protection that makes every purchase wait its turn
* Live-ticking balance isolated in its own component
* Admin-only create/edit/delete of businesses and upgrades using a role guard as well as Django admin
* Toast notifications form field errors, and an error boundary

## Tech Features:

* Model relationships such as one-to-one such as player to user foreign key and many-to-many
* No N+1 queries when loading player data
* Model validation for minimum values on costs and a unique player and business constraint
* DRF viewsets and a router with custom click and buy actions
* Duplicate user registration retuns a 400
* State managed with React Context
* All API calls go through one fetch client api.ts
* Smart pages and dumb components
* Strict TypeScript with no "any", enforced by a lint rule
* Secret key kept in .env which is in the .gitignore with a copy command in the README

## Pictures:


## Login:
<img width="1505" height="859" alt="Screenshot 2026-11-10 at 6 00 03 PM" src="https://github.com/user-attachments/assets/d8c150c0-6e5f-451d-810c-293e7a8eaa73" />

<img width="1505" height="859" alt="Screenshot 2026-11-10 at 5 59 57 PM" src="https://github.com/user-attachments/assets/81314d12-afea-4337-acbd-ffaf4376c9cd" />


## Sign up:

<img width="1505" height="859" alt="Screenshot 2026-11-10 at 6 00 17 PM" src="https://github.com/user-attachments/assets/7bd4076d-b41f-465e-b25d-999b491f130b" />


## Main Game area:

<img width="1505" height="859" alt="Screenshot 2026-11-10 at 6 00 43 PM" src="https://github.com/user-attachments/assets/59f3e9d1-cfac-4c7f-9c96-750bfba7b53b" />

<img width="1505" height="859" alt="Screenshot 2026-11-10 at 6 01 04 PM" src="https://github.com/user-attachments/assets/4485918c-c8f6-4d5f-a787-6453a80908af" />


<img width="1505" height="859" alt="Screenshot 2026-11-10 at 6 01 11 PM" src="https://github.com/user-attachments/assets/8570040f-22b7-4a87-83d5-c4831035af36" />




