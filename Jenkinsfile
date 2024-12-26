pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = "" // Docker Image tag <repository-name>/<image-name>:<version>
        DOCKER_IMAGE_FRONTEND = "" // Docker Image tag <repository-name>/<image-name>:<version>
        DOCKER_CREDENTIALS = "" // Docker Hub credentials ID in Jenkins
        SSH_CREDENTIALS = "" // SSH credentials ID in Jenkins
        KUBE_MANIFEST_DIR = "" // Path to Kubernetes manifest files on the remote server
        REMOTE_USER = "" // Remote server username
        REMOTE_HOST = "" // Remote server hostname or IP
    }

    stages {
        stage('Build Backend') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE_BACKEND} ./backend"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE_FRONTEND} ./frontend"
                }
            }
        }

        stage('Scan Vulnerabilities') {
            steps {
                script {
                    sh "trivy image ${DOCKER_IMAGE_BACKEND}"
                    sh "trivy image ${DOCKER_IMAGE_FRONTEND}"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withDockerRegistry([credentialsId: "${DOCKER_CREDENTIALS}", url: ""]) { // Docker registry URL
                        sh "docker push ${DOCKER_IMAGE_BACKEND}"
                        sh "docker push ${DOCKER_IMAGE_FRONTEND}"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sshagent(credentials: ["${SSH_CREDENTIALS}"]) {
                        // SSH into the remote server and apply Kubernetes manifests
                        sh """
                            ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "
                                cd ${KUBE_MANIFEST_DIR} &&
                                kubectl apply -f backend-deployment.yaml &&
                                kubectl apply -f frontend-deployment.yaml &&
                                kubectl apply -f db-deployment.yaml &&
                                kubectl apply -f prometheus-deployment.yaml &&
                                kubectl apply -f grafana-deployment.yaml
                            "
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline executed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}