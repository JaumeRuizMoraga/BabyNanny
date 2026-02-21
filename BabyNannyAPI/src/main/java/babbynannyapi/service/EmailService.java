package babbynannyapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class EmailService {
	@Autowired
    private JavaMailSender mailSender;

    public void sendConfirmationEmail(String correo, String codigo) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tu-correo@gmail.com");
        message.setTo(correo);
        message.setSubject("Correo de verificación de registro en BabyNanny");
        message.setText("Hola buenos dias.\nAlguien ha intentado crear una cuenta en nuestra app"
        		+ " utilizando este correo. Si es usted, ponga este codigo "+codigo+" en la app"+"\n Que tenga buen dia.");
        mailSender.send(message);
        System.out.println("Correo enviado con éxito a: " + correo);
    }
}
