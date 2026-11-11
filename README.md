# Tycoon

A simple idle tycoon game. Click to make money, buy businesses that make money for you, and buy upgrades so they earn more. You keep earning even when the game is closed.

## How to get it running

Step 1: clone the repo

```
git clone https://github.com/Joseph-Rus/tycoon-midterm-web.git
cd tycoon-midterm-web

cp .env.example .env
```

Step 2: set up the backend (only the first time)

```
cd backend
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
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## How to play

Step 1: create an account

Step 2: log in with the account you just made or one you made before

Step 3: play the game
