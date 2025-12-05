pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "dhaval0308"   
        BACKEND_IMAGE = "${DOCKERHUB_USER}/feedback-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/feedback-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                // Jenkins will checkout from GitHub (we also set it in job config)
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ./backend"
                    sh "docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend"
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    sh "docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}"
                    sh "docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                }
            }
        }

        // Optional: Tag as 'latest' too
        stage('Tag as latest') {
            steps {
                script {
                    sh "docker tag ${BACKEND_IMAGE}:${BUILD_NUMBER} ${BACKEND_IMAGE}:latest"
                    sh "docker tag ${FRONTEND_IMAGE}:${BUILD_NUMBER} ${FRONTEND_IMAGE}:latest"
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }
    }
}
