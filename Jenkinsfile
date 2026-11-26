
def run(String cmd) {
  if (isUnix()) { sh cmd } else { bat cmd }
}

pipeline {
  agent any

  tools { nodejs 'node22' }

  options {
    timestamps()
    timeout(time: 20, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  environment {
    DATABASE_URL    = 'postgresql://aura:aura@localhost:5432/aura?schema=public'
    SESSION_SECRET  = 'ci-only-secret-change-me-0123456789abcdef'
    NEXT_TELEMETRY_DISABLED = '1'
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps {
        run 'npm ci'
        run 'npx prisma generate'
      }
    }

    stage('Lint') {
      steps { run 'npm run lint' }
    }

    stage('Component tests') {
      steps { run 'npm run test:components' }
      post {
        always {
          // Результати Jest (jest-junit) завжди потрапляють у звіт, навіть при падінні тестів.
          junit allowEmptyResults: true, testResults: 'reports/junit-components.xml'
        }
      }
    }

    stage('Build') {
      steps { run 'npm run build' }
    }

    stage('Smoke') {
      environment {
        SMOKE_PORT  = '3100'
        SMOKE_PATHS = '/'
      }
      steps { run 'npm run test:smoke' }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'reports/smoke-junit.xml'
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
    }
    success { echo 'Усі етапи пройшли успішно.' }
    failure { echo 'Збірка впала: подробиці дивіться в Console Output і Test Result.' }
  }
}