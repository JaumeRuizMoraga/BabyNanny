package babbynannyapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for enabling and customizing CORS (Cross-Origin Resource Sharing)
 * in the BabyNanny API.
 *
 * This class allows the backend to accept requests from different origins, enabling
 * frontend applications hosted on other domains or ports to interact with the API.
 */
@Configuration
public class CorsConfig {


    /**
     * Configures global CORS settings for the application.
     *
     * @return a WebMvcConfigurer that customizes CORS mappings
     */

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/BabyNanny/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}