pipeline {
//    agent { docker { image 'node:16.13.1-alpine' } }
    agent any

    stages {
        stage('echo npm version') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 16 LTS') {
                    sh 'npm --version'
                }
            }
        }
        stage('test') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 16 LTS') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        stage('build') {
            steps {
                nodejs(nodeJSInstallationName: 'Node 16 LTS') {
                    sh 'npm run build'
                }
            }
        }
        stage('package') {
            steps {
                sh 'docker ps'
            }
        }
    }
}
