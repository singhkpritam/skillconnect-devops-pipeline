# SkillConnect DevOps CI/CD Pipeline

![GitHub last commit](https://img.shields.io/github/last-commit/singhkpritam/skillconnect-devops-pipeline)
![GitHub repo size](https://img.shields.io/github/repo-size/singhkpritam/skillconnect-devops-pipeline)
![GitHub stars](https://img.shields.io/github/stars/singhkpritam/skillconnect-devops-pipeline?style=social)
![Docker](https://img.shields.io/badge/Docker-Containerization-blue)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)

---

# About The Project

SkillConnect is a full-stack MERN application that I built to learn and implement a complete DevOps workflow using modern tools like Jenkins, Docker, and Kubernetes.

Instead of deploying the application manually, I automated the entire deployment process. Whenever I push new code to GitHub, Jenkins automatically triggers the CI/CD pipeline, builds the Docker images, pushes them to Docker Hub, and deploys the latest version to a Kubernetes cluster running on Minikube .

Through this project, I gained hands-on experience with Continuous Integration and Continuous Deployment (CI/CD). It helped me understand how an application moves from development to production in a real-world DevOps environment.

---

# Project Objectives

The main goal of this project is to automate the deployment process and reduce manual work by implementing a complete CI/CD pipeline.

The project focuses on:

- Automating application deployment
- Containerizing frontend and backend
- Deploying containers on Kubernetes
- Implementing Jenkins Pipeline
- Using GitHub Webhook for automatic builds
- Managing application configuration
- Learning production-like DevOps workflow

---

# Features

## Application

- MERN Stack Application
- React Frontend
- Express.js Backend
- MongoDB Database
- REST API Integration
- Responsive UI

## DevOps

- Dockerized Frontend
- Dockerized Backend
- Docker Hub Image Registry
- Jenkins CI/CD Pipeline
- GitHub Webhook Integration
- Kubernetes Deployment
- Kubernetes Services
- ConfigMap
- Secret Management
- Ingress Controller
- Horizontal Pod Autoscaler
- Rolling Update Deployment

---

# Project Architecture

```text
                 Developer
                     │
              Push Source Code
                     ▼
          GitHub Repository (Main)
                     │
            GitHub Webhook Trigger
                     ▼
               Jenkins Pipeline
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   Checkout      Docker Build   Docker Login
        ▼
 Push Images to Docker Hub
        ▼
 Kubernetes Deployment Update
        ▼
 Rolling Update
        ▼
  SkillConnect Application
```

---

# Tech Stack

| Category         | Technology           |
| ---------------- | -------------------- |
| Frontend         | React + Vite         |
| Backend          | Node.js + Express.js |
| Database         | MongoDB Atlas        |
| Version Control  | Git & GitHub         |
| CI/CD            | Jenkins              |
| Containerization | Docker               |
| Image Registry   | Docker Hub           |
| Orchestration    | Kubernetes           |
| Local Cluster    | Minikube             |
| Web Server       | Nginx                |
| API Testing      | Postman              |
| Operating System | Ubuntu Linux         |

---

# Project Structure

```
skillconnect-devops-pipeline
│
├── backend
│   ├── config
│   ├── models
│   ├── routes
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── public
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
├── kubernetes
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-configmap.yaml
│   ├── backend-secret.yaml
│   ├── ingress.yaml
│   ├── hpa-backend.yaml
│   └── hpa-frontend.yaml
│
├── Jenkinsfile
├── README.md
└── .gitignore
```

---

# DevOps Workflow

This project follows a complete CI/CD workflow.

1. Developer pushes code to GitHub.
2. GitHub Webhook automatically triggers Jenkins.
3. Jenkins checks out the latest source code.
4. Docker images are built for frontend and backend.
5. Images are pushed to Docker Hub.
6. Jenkins updates Kubernetes deployments.
7. Kubernetes performs a Rolling Update.
8. Latest version becomes available without downtime.

<!-- **************************************************************** -->

# Docker Implementation

The application is containerized using Docker to ensure that it runs consistently across different environments.

Both the frontend and backend have their own Dockerfiles.

## Backend Docker Image

The backend image performs the following steps:

- Uses Node.js 18 Alpine image
- Creates application working directory
- Installs project dependencies
- Copies backend source code
- Exposes port **5000**
- Starts the Express server

Build backend image

```bash
docker build -t skillconnect-backend .
```

---

## Frontend Docker Image

The frontend uses a multi-stage Docker build.

### Build Stage

- Uses Node.js Alpine image
- Installs dependencies
- Builds React production files

### Production Stage

- Uses lightweight Nginx image
- Copies production build
- Serves application using Nginx

Build frontend image

```bash
docker build -t skillconnect-frontend .
```

---

# Docker Hub

After successfully building both Docker images, Jenkins pushes them automatically to Docker Hub.

Images used in this project:

```
singhkpritam/skillconnect-backend
singhkpritam/skillconnect-frontend
```

Every Jenkins build creates a new image tag using the Jenkins Build Number.

Example

```
skillconnect-backend:1
skillconnect-backend:2
skillconnect-backend:3

skillconnect-frontend:1
skillconnect-frontend:2
skillconnect-frontend:3
```

Using build numbers makes it easier to identify each deployment version.

---

# Jenkins CI/CD Pipeline

The complete deployment process is automated using Jenkins Declarative Pipeline.

Pipeline Stages

### 1. Checkout Source Code

Jenkins downloads the latest project source code from GitHub.

```
GitHub
      ↓
 Jenkins Workspace
```

---

### 2. Docker Login

Jenkins securely logs in to Docker Hub using stored Jenkins Credentials.

Sensitive information like username and password is never hardcoded inside the Jenkinsfile.

---

### 3. Build Backend Image

Jenkins enters the backend directory and builds a Docker image.

```
Backend Source
        ↓
 Docker Build
        ↓
Backend Image
```

---

### 4. Push Backend Image

After successful image creation, Jenkins pushes the backend image to Docker Hub.

---

### 5. Build Frontend Image

The frontend React application is built using Docker Multi-stage Build.

```
React Build
      ↓
Static Files
      ↓
Nginx Image
```

---

### 6. Push Frontend Image

The latest frontend image is uploaded to Docker Hub.

---

### 7. Deploy to Kubernetes

Finally Jenkins updates both Kubernetes Deployments using:

```bash
kubectl set image
```

Kubernetes automatically performs a Rolling Update without deleting the running application.

---

# Kubernetes Resources

This project uses multiple Kubernetes resources.

| Resource   | Purpose                      |
| ---------- | ---------------------------- |
| Deployment | Runs application Pods        |
| Service    | Exposes Pods internally      |
| ConfigMap  | Stores environment variables |
| Secret     | Stores sensitive credentials |
| Ingress    | Provides external access     |
| HPA        | Automatically scales Pods    |

---

## Backend Deployment

The backend deployment manages Express.js containers.

Features

- Multiple replicas
- Rolling Updates
- Docker Hub image
- ConfigMap support
- Secret support

---

## Frontend Deployment

The frontend deployment runs React application using Nginx.

Features

- Multiple replicas
- High availability
- Rolling Updates

---

## Services

Both frontend and backend communicate through Kubernetes Services.

```
Frontend Service
        ▼
 Backend Service
        ▼
 MongoDB Atlas
```

---

## ConfigMap

The ConfigMap stores application configuration like:

- API URLs
- Environment variables
- Application configuration

Keeping configuration outside the application makes deployments easier.

---

## Secret

Sensitive information such as database connection strings is stored inside Kubernetes Secrets.

This improves application security by avoiding hardcoded credentials.

---

## Ingress

Ingress provides a single entry point to access the application.

Instead of exposing multiple ports, Ingress routes requests to the appropriate service.

---

## Horizontal Pod Autoscaler (HPA)

The project also implements automatic scaling.

If CPU usage increases, Kubernetes automatically creates additional Pods.

When load decreases, extra Pods are removed automatically.

This helps maintain application performance while efficiently using cluster resources.

---

# CI/CD Workflow

```
Developer
     ▼
Git Push
     ▼
GitHub Repository
     ▼
GitHub Webhook
     ▼
Jenkins Pipeline
     ▼
Checkout Source
     ▼
Docker Build
     ▼
Docker Hub
     ▼
kubectl set image
     ▼
Rolling Update
     ▼
Updated SkillConnect Application
```

<!-- ********************************************** -->

# Getting Started

Follow the steps below to run this project on your local system.

---

# Clone the Repository

```bash
git clone https://github.com/singhkpritam/skillconnect-devops-pipeline.git
```

Move into the project directory.

```bash
cd skillconnect-devops-pipeline
```

---

# Prerequisites

Make sure the following tools are installed before running the project.

- Git
- Docker
- Docker Compose
- Jenkins
- Kubernetes (kubectl)
- Minikube
- Node.js
- npm

---

# Backend Setup

Move to backend directory.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a **.env** file.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend.

```bash
npm start
```

---

# Frontend Setup

Move to frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run frontend.

```bash
npm run dev
```

---

# Build Docker Images

Backend

```bash
cd backend

docker build -t skillconnect-backend .
```

Frontend

```bash
cd frontend

docker build -t skillconnect-frontend .
```

---

# Push Images to Docker Hub

```bash
docker login

docker tag skillconnect-backend singhkpritam/skillconnect-backend:1

docker push singhkpritam/skillconnect-backend:1
```

```bash
docker tag skillconnect-frontend singhkpritam/skillconnect-frontend:1

docker push singhkpritam/skillconnect-frontend:1
```

---

# Start Minikube

```bash
minikube start
```

Verify cluster.

```bash
kubectl get nodes
```

---

# Deploy Application

Apply Kubernetes manifests.

```bash
kubectl apply -f kubernetes/
```

Check Deployments.

```bash
kubectl get deployments
```

Check Pods.

```bash
kubectl get pods
```

Check Services.

```bash
kubectl get services
```

Check Ingress.

```bash
kubectl get ingress
```

---

# Jenkins Pipeline Setup

Create a new Pipeline Job.

Configure:

- GitHub Repository
- Branch: **main**
- Script Path: **Jenkinsfile**

Save and Build the pipeline.

The pipeline automatically performs:

- Source Code Checkout
- Docker Login
- Backend Image Build
- Backend Image Push
- Frontend Image Build
- Frontend Image Push
- Kubernetes Deployment

---

# GitHub Webhook

To trigger Jenkins automatically after every push, configure a GitHub Webhook.

Payload URL

```
https://your-ngrok-url/github-webhook/
```

Content Type

```
application/json
```

Event

```
Just the push event
```

---

# Expose Jenkins using Ngrok

Run

```bash
ngrok http 8080
```

Copy the generated HTTPS URL and use it in the GitHub Webhook.

---

# Verify Deployment

Check Pods

```bash
kubectl get pods
```

Check Services

```bash
kubectl get services
```

Check Ingress

```bash
kubectl get ingress
```

Open the application

```bash
http://<MINIKUBE-IP>
```

Example

```bash
http://192.168.49.2
```

---

# CI/CD Workflow

```
Code Change
      ▼
Git Commit
      ▼
Git Push
      ▼
GitHub
      ▼
Webhook
      ▼
Jenkins
      ▼
Build Docker Images
      ▼
Push Images
      ▼
Kubernetes Deployment
      ▼
Rolling Update
      ▼
Updated Application
```

---

# Project Highlights

- End-to-End CI/CD Pipeline
- Dockerized MERN Application
- Jenkins Automation
- Kubernetes Deployment
- GitHub Webhook Integration
- Docker Hub Image Registry
- ConfigMap and Secret Management
- Ingress Configuration
- Horizontal Pod Autoscaler (HPA)
- Rolling Updates with Zero Downtime


```
Developer
    ▼
Git Commit & Push
    ▼
GitHub Repository
    ▼
GitHub Webhook
    ▼
Jenkins Pipeline
    ▼
Checkout Build Images Test
    ▼
Docker Build
    ▼
Docker Hub Push
    ▼
Kubernetes Deployment
    ▼
Rolling Update
    ▼
SkillConnect Running
```

---

# project-images

## Application project-images

### Application Dashboard
<img width="960" height="540" alt="application-dashboard" src="https://github.com/user-attachments/assets/63d04173-3296-432d-9bf4-e5d74ed8cacf" />

### Application Home Page 1
<img width="960" height="540" alt="application-home1" src="https://github.com/user-attachments/assets/e1d5f012-7862-477e-84fc-ef67194ef056" />

### Application Home Page 2
<img width="1600" height="960" alt="application-home2" src="https://github.com/user-attachments/assets/9d929ca6-82be-4081-b8ab-2bb085641c15" />

---

## Jenkins CI/CD project-images

### Jenkins Pipeline
<img width="1600" height="971" alt="build-history" src="https://github.com/user-attachments/assets/6920eec7-dc9f-48a4-bae5-7b891bdbc382" />

### Jenkins Build Success
<img width="1600" height="964" alt="jenknis-build-success" src="https://github.com/user-attachments/assets/eb12ee99-59b7-451e-bf40-f4bcb8427dfa" />

### Build History
<img width="1600" height="971" alt="build-history" src="https://github.com/user-attachments/assets/0b1527d9-69c3-4e59-bb39-fd2a550b2cf1" />

---

## Docker project-images

### Docker Hub Image
<img width="960" height="540" alt="dockerhub-image" src="https://github.com/user-attachments/assets/44fb4079-f398-4689-87ff-4b9ee5b01009" />

---

## Database project-images

### MongoDB Atlas
<img width="960" height="540" alt="mongodb1-atlas" src="https://github.com/user-attachments/assets/8d6c76bf-875f-45b1-87cf-de62ae8f3929" />

### Backend Data
<img width="1600" height="964" alt="data-backend" src="https://github.com/user-attachments/assets/a02ac67f-debb-4996-a2af-9b4f1aad6905" />

---

## Application Running

### Localhost Output
<img width="960" height="540" alt="localhost" src="https://github.com/user-attachments/assets/acf41779-1fc0-492b-8003-e093ad3eb850" />





