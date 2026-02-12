package babbynannyapi.controller;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import babbynannyapi.model.Token;
import babbynannyapi.model.Usuario;
import babbynannyapi.repository.TokenRepository;
import babbynannyapi.repository.UsuarioRepository;

import java.io.*;
import java.util.ArrayList;

@RestController
public class Controlador {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private TokenRepository tokenRepository;

	@PostMapping("/login")
	public ResponseEntity<Object> login(@RequestBody Usuario usuario) throws JSONException {
		boolean existe = usuarioRepository.buscarUsuario(usuario.getNombre(), usuario.getPassword());
		if (existe) {
			Token token = new Token(usuario.getNombre());
			tokenRepository.save(token);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	@PostMapping("/register")
	ResponseEntity<Object> registro(@RequestBody String cuerpoPeticion) throws JSONException, IOException {
		JSONObject obj = new JSONObject(cuerpoPeticion);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}