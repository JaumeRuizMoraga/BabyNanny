package babbynannyapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.concurrent.ThreadLocalRandom;

/**
 * Service class for sending emails related to user registration and verification.
 *
 * This service uses Spring's JavaMailSender to send emails. Currently, it provides
 * a method to send a confirmation email containing a verification code to a user
 * registering in the BabyNanny application.
 */

@Service
public class EmailService {
    /** JavaMailSender injected by Spring to send emails. */
	@Autowired
    private JavaMailSender mailSender;

    /**
     * Sends a professional registration confirmation email to the specified user.
     *
     * The email contains a verification code that the user must enter in the BabyNanny app
     * to complete the registration. If the user did not request registration, they can ignore this email.
     *
     * @param correo the recipient's email address
     * @param codigo the verification code to include in the email
     */

    public void sendConfirmationEmail(String correo, String codigo) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tu-correo@gmail.com");
        message.setTo(correo);
        message.setSubject("Verificación de registro en BabyNanny");
        message.setText("Estimado usuario,\n\n"
                + "Se ha recibido una solicitud de registro en la aplicación BabyNanny utilizando esta dirección de correo electrónico.\n"
                + "Si usted ha realizado esta solicitud, por favor ingrese el siguiente código en la aplicación para completar el registro:\n\n"
                + "Código de verificación: " + codigo + "\n\n"
                + "Si usted no solicitó este registro, puede ignorar este correo.\n\n"
                + "Atentamente,\n"
                + "El equipo de BabyNanny");
        mailSender.send(message);
        System.out.println("Correo enviado con éxito a: " + correo);
    }
}
