                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
package com.example.banking.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.util.*;

@Configuration
public class MultiTenantDataSourceConfig {

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    @Value("${spring.datasource.driver-class-name:com.mysql.cj.jdbc.Driver}")
    private String dbDriver;

    @Bean
    public DataSource dataSource() {
        RoutingDataSource routingDataSource = new RoutingDataSource();
        routingDataSource.setTargetDataSources(new HashMap<>()); // will be added dynamically
        routingDataSource.setDefaultTargetDataSource(defaultDataSource());
        return routingDataSource;
    }

    public DataSource createUserDataSource(String dbName) {
        String url = "jdbc:mysql://localhost:3306/" + dbName + "?useSSL=false&serverTimezone=UTC";
        DriverManagerDataSource dataSource = new DriverManagerDataSource(url, dbUser, dbPassword);
        dataSource.setDriverClassName(dbDriver);
        return dataSource;
    }

    public DataSource defaultDataSource() {
        return createUserDataSource("banking_central");
    }
}
