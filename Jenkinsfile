pipeline {

    agent any

    environment {
        DOCKER_HUB = "singhkpritam"
        BACKEND_IMAGE = "skillconnect-backend"
        FRONTEND_IMAGE = "skillconnect-frontend"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh """
                        docker build -t ${DOCKER_HUB}/${BACKEND_IMAGE}:${IMAGE_TAG} .
                    """
                }
            }
        }

        stage('Push Backend') {
            steps {
                sh """
                    docker push ${DOCKER_HUB}/${BACKEND_IMAGE}:${IMAGE_TAG}
                """
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh """
                        docker build -t ${DOCKER_HUB}/${FRONTEND_IMAGE}:${IMAGE_TAG} .
                    """
                }
            }
        }

        stage('Push Frontend') {
            steps {
                sh """
                    docker push ${DOCKER_HUB}/${FRONTEND_IMAGE}:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    kubectl set image deployment/backend-deployment backend=${DOCKER_HUB}/${BACKEND_IMAGE}:${IMAGE_TAG}

                    kubectl set image deployment/frontend-deployment frontend=${DOCKER_HUB}/${FRONTEND_IMAGE}:${IMAGE_TAG}

                    kubectl rollout status deployment/backend-deployment

                    kubectl rollout status deployment/frontend-deployment
                """
            }
        }

    }

    post {

        success {
            echo "Build and deployment completed successfully."
            sh "docker image prune -f"
        }

        failure {
            echo "Build failed. Check Jenkins console output."
        }

        always {
            cleanWs()
        }

    }

}
