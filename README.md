<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Banking Spring Boot Application</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
      color: #333;
    }
    header, section {
      max-width: 900px;
      margin: auto;
      padding: 20px;
    }
    h1, h2, h3 {
      text-align: center;
    }
    code, pre {
      background: #eee;
      padding: 5px;
      border-radius: 5px;
      display: block;
      overflow-x: auto;
    }
    .badges img {
      margin: 5px;
    }
    a {
      color: #0077cc;
    }
    footer {
      text-align: center;
      margin: 40px 0;
      font-size: 0.9em;
      color: #666;
    }
  </style>
</head>
<body>
  <header>
    <h1>💰 Banking Spring Boot Application 💰</h1>
    <h3>A Simple Banking Backend using Spring Boot, MySQL, and Java</h3>
    <div class="badges" align="center">
      <img src='https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=java&logoColor=white' />
      <img src='https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white' />
      <img src='https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white' />
      <img src='https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white' />
      <img src='https://img.shields.io/badge/Apache NetBeans-1B6AC6?style=for-the-badge&logo=apachenetbeanside&logoColor=white' />
    </div>
  </header>

  <section>
    <h2>📌 About the Project</h2>
    <p>This <strong>Banking System</strong> is a backend API service developed with Spring Boot. It includes:</p>
    <ul>
      <li>✅ User Registration and Login</li>
      <li>💳 Basic Banking Operations (Deposit, Withdrawal)</li>
      <li>🔐 JWT-based Authentication (if implemented)</li>
      <li>🧩 RESTful APIs with MySQL Integration</li>
      <li>📦 Maven for dependency and project management</li>
    </ul>
    <p>This project was built by <strong>Ganteda Lakshmi Prasanna Kumar</strong> to demonstrate backend development using Spring Boot and serve as a base for future full-stack expansion.</p>
  </section>

  <section>
    <h2>⚙️ Prerequisites</h2>
    <ul>
      <li>Java 17 or higher</li>
      <li>Maven</li>
      <li>MySQL Server</li>
      <li>Git</li>
    </ul>
  </section>

  <section>
    <h2>🚀 Setup Instructions</h2>
    <h3>1. Clone the Repository</h3>
    <pre><code>git clone https://github.com/Chaiudbbhd/banking-springboot.git
cd banking-springboot</code></pre>

    <h3>2. Create MySQL Database</h3>
    <pre><code>CREATE DATABASE banking_central;</code></pre>

    <h3>3. Update application.properties</h3>
    <pre><code>spring.datasource.url=jdbc:mysql://localhost:3306/banking_central
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect</code></pre>

    <h3>4. Build and Run</h3>
    <p>Build the project:</p>
    <pre><code>mvn clean install</code></pre>

    <p>Run the application:</p>
    <pre><code>mvn spring-boot:run</code></pre>
    <p>The backend server will start on <a href="http://localhost:8080">http://localhost:8080</a>.</p>

    <h3>5. Initial Setup Note for <code>account_id</code></h3>
    <p>If you face issues with transactions after signup, manually insert an account:</p>
    <pre><code>INSERT INTO account (account_id, balance, user_id) VALUES (1, 0.00, &lt;your_user_id&gt;);</code></pre>
  </section>

  <section>
    <h2>📚 Technologies Used</h2>
    <ul>
      <li>Spring Boot</li>
      <li>Java 17</li>
      <li>MySQL</li>
      <li>Spring Data JPA</li>
      <li>Maven</li>
      <li>REST API Design</li>
      <li>Apache NetBeans IDE</li>
    </ul>
  </section>

  <section>
    <h2>👨‍💻 Developer Info</h2>
    <p><strong>Ganteda Lakshmi Prasanna Kumar</strong></p>
    <ul>
      <li>Email: <a href="mailto:chaituchaitinya2005@gmail.com">chaituchaitinya2005@gmail.com</a></li>
      <li>Portfolio: <a href="[https://lpk2005.netlify.app/](https://chaiudbbhd.github.io/portfolio-student/)">lpk2005.netlify.app</a></li>
      <li>GitHub: <a href="https://github.com/Chaiudbbhd">github.com/Chaiudbbhd</a></li>
      <li>LinkedIn: <a href="https://www.linkedin.com/in/prasanna-kumar-g-3377a825a/">Prasanna Kumar G</a></li>
    </ul>
  </section>

  <section>
    <h2>❤️ Support This Project</h2>
    <ol>
      <li>⭐ Star the repo on GitHub</li>
      <li>🔗 Share it with others</li>
      <li>☕ Support me on <a href="https://phonepe.com/pay?pa=8328007804@ybl&pn=GANTEDA%20LAKSHMI%20PRASANNA%20KUMAR">PhonePe</a></li>
    </ol>
  </section>

  <footer>
    <p>&copy; 2025 Ganteda Lakshmi Prasanna Kumar. Licensed under MIT.</p>
  </footer>
</body>
</html>
