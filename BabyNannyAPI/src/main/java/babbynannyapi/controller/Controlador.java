package babbynannyapi.controller;

import org.bson.json.JsonObject;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import babbynannyapi.model.Bebe;
import babbynannyapi.model.Token;
import babbynannyapi.model.Usuario;
import babbynannyapi.repository.BebeRepository;
import babbynannyapi.repository.TokenRepository;
import babbynannyapi.repository.UsuarioRepository;

import java.io.*;
import java.util.ArrayList;
import java.util.Optional;


@RestController
@RequestMapping("/BabyNanny")
public class Controlador {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private BebeRepository bebeRepository;

    /**
     * Función utilitzada para que un usuario haga login y se le genere un token
     *
     * @param usuario
     * @return ResponseEntity<?>
     */
    @PostMapping("/login")

    public ResponseEntity<Object> login(@RequestBody Usuario usuario) throws JSONException {

        System.out.println(usuario.getNombre());
        System.out.println(usuario.getPassword());
        Optional<Usuario> user = usuarioRepository.findByNombreAndPassword(usuario.getNombre(), usuario.getPassword());
        Optional<Token> usertoken = tokenRepository.buscarUsuarioToken(usuario.getNombre());
        if (user.isPresent()) {
            if (usertoken.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            } else {
                Token token = new Token(usuario.getNombre());
                tokenRepository.save(token);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
     * Función utilitzada pera registrar un usuario en la base de datos
     *
     * @param usuario
     * @return ResponseEntity<?>
     */
    @PostMapping("/register")
    ResponseEntity<?> registro(@RequestBody Usuario usuario) {
        Optional<Usuario> userPassEmail = usuarioRepository.buscarUserPassEmail(usuario.getNombre(), usuario.getPassword(), usuario.getCorreo());
        if (userPassEmail.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        else {
            usuarioRepository.save(usuario);
            return ResponseEntity.status(HttpStatus.OK).build();
        }

    }
}