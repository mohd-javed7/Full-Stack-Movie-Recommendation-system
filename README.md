# 🎬 Content-Based Movie Recommendation System

This project is a **Content-Based Movie Recommendation System** developed as a **BCA Semester V Mini Project**.  
It recommends movies based on **content similarity** using **TF-IDF** and **Cosine Similarity**.  
The application is built using a **full-stack approach** with frontend, backend, and a machine learning model.

---

## 📌 System Overview

The system allows users to search for a movie by typing its name.  
Based on the selected movie, similar movies are recommended by analyzing movie metadata such as genre, cast, crew, and plot.

The application consists of:
- A **React frontend** for user interaction
- A **Node.js backend** for authentication and API handling
- A **Machine Learning model** hosted using FastAPI for generating recommendations

---


## 🛠️ Technologies Used

### Frontend
- React.js  
- Tailwind CSS  

### Backend
- Node.js  
- Express.js  
- JSON Web Tokens (JWT)  
- bcrypt  

### Machine Learning
- Python  
- Pandas  
- Scikit-learn (TF-IDF, Cosine Similarity)  

### API & Database
- FastAPI  
- MongoDB  

---

## ✨ Features

- Movie search functionality  
- Content-based movie recommendations  
- User authentication using JWT  
- Secure password hashing using bcrypt  
- Responsive UI  
- Works without user ratings (cold-start friendly)

---

## 🧠 Recommendation Model

- Movie textual data is cleaned and combined
- TF-IDF is used to convert text into vectors
- Cosine similarity is used to find similar movies
- Top similar movies are returned as recommendations

---

## 🏗️ System Flow
User
→ React Frontend
→ Node.js + Express Backend
→ FastAPI (ML Model)
→ Movie Recommendations


Screenshots:
<img width="1366" height="768" alt="{4549E81B-8B0E-4068-BCF1-8A9DB07F66AC}" src="https://github.com/user-attachments/assets/a23ec0b4-e6bd-4709-8cfa-dec2eede0f3f" />
<img width="1366" height="768" alt="{6EFA5DFE-0CE2-4D49-8E61-B8862BD2AF3F}" src="https://github.com/user-attachments/assets/b6605f7f-6ee7-42a1-88be-b4c85a3c9691" />
<img width="1366" height="768" alt="{C16E13CF-2EB9-4D4C-9488-C1AD73F47F9F}" src="https://github.com/user-attachments/assets/1531280e-d3e6-411f-aab6-4acea12ab957" />
<img width="1366" height="768" alt="{50BFC0BA-5EF8-494E-9225-ECEDF61F22B2}" src="https://github.com/user-attachments/assets/99039c41-5e60-4024-b9c7-bd5117584733" />
<img width="1366" height="768" alt="{9CB92FE7-D2C7-43D2-9C22-3A082DB56AF7}" src="https://github.com/user-attachments/assets/a84807d4-bc21-45cd-a1b2-fa3812c51b31" />
<img width="1366" height="768" alt="{3A1145A6-6103-4A15-AB01-2F0E52834327}" src="https://github.com/user-attachments/assets/7c64580c-c92b-4940-a865-f5269d230f38" />

<img width="1366" height="768" alt="{4483EEA0-DCBC-4506-A5F3-91C188718E90}" src="https://github.com/user-attachments/assets/646beb7d-5bf6-4973-9ff0-fe59e13388d7" />
