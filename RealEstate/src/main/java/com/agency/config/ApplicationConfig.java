package com.agency.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@Configuration
@EnableJpaRepositories(basePackages="com.agency.repo")
@EntityScan(basePackages="com.agency.entity")

public class ApplicationConfig {

}
