package com.nativenavs.NativeNavs_BackEnd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.UUID;


@SpringBootApplication
@ComponentScan(basePackages = {"com.nativenavs"})
@EntityScan("com.nativenavs")
@EnableJpaRepositories("com.nativenavs")
@EnableMongoRepositories("com.nativenavs")
@EnableJpaAuditing

public class NativeNavsBackEndApplication {
	public static void main(String[] args) {
		SpringApplication.run(NativeNavsBackEndApplication.class, args);
	}

}
