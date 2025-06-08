pipeline {
    agent {
        docker {
            image 'maven:3.9.2-eclipse-temurin-17'
            args '-v /var/run/docker.sock:/var/run/docker.sock'  // Let Jenkins run Docker inside Docker
        }
    }

    environment {
        DB_NAME = 'banking_central'
        DB_USER = 'root'
        DB_PASSWORD = 'lpk2005'
        DB_PORT = '3306'
    }

    stages {
        stage('Start MySQL') {
            steps {
                sh '''
                docker rm -f mysql || true  # Remove existing container if any
                docker run -d --name mysql \
                  -e MYSQL_ROOT_PASSWORD=$DB_PASSWORD \
                  -e MYSQL_DATABASE=$DB_NAME \
                  -p $DB_PORT:3306 \
                  mysql:8.0

                echo "Waiting for MySQL to start..."
                sleep 25
                '''
            }
        }

        stage('Build & Test') {
            steps {
                sh './mvnw clean install'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker stop mysql && docker rm mysql || true'
            }
        }
    }

    post {
        always {
            junit 'target/surefire-reports/*.xml'  // Collect test results
        }
    }
}
