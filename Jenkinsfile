pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = "project-devops/backend" 
        DOCKER_IMAGE_FRONTEND = "project-devops/client" 
        DOCKER_CREDENTIALS = "dockerhub" 
        SSH_CREDENTIALS = "" 
        KUBE_MANIFEST_DIR = "./k8s" 
  
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
                    withDockerRegistry([credentialsId: "${DOCKER_CREDENTIALS}", url: ""]) { 
                        sh "docker push ${DOCKER_IMAGE_BACKEND}"
                        sh "docker push ${DOCKER_IMAGE_FRONTEND}"
                    }
                }
            }
        }

        // stage('Deploy to Kubernetes') {
        //     steps {
        //         script {
        //             sshagent(credentials: ["${SSH_CREDENTIALS}"]) {
        //                 // SSH into the remote server and apply Kubernetes manifests
        //                 sh """
        //                     ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "
        //                         cd ${KUBE_MANIFEST_DIR} &&
        //                         kubectl apply -f backend-deployment.yaml &&
        //                         kubectl apply -f frontend-deployment.yaml &&
        //                         kubectl apply -f db-deployment.yaml &&
        //                         kubectl apply -f prometheus-deployment.yaml &&
        //                         kubectl apply -f grafana-deployment.yaml
        //                     "
        //                 """
        //             }
        //         }
        //     }
        // }
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