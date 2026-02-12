package babbynannyapi.controller;

import org.bson.json.JsonObject;
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
@RequestMapping("/BabyNanny")
public class Controlador {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private TokenRepository tokenRepository;

	@PostMapping("/login")
	public ResponseEntity<Object> login(@RequestBody String user) throws JSONException {
		JSONObject obj = new JSONObject(user);
		boolean existe = usuarioRepository.buscarUsuario(obj.getString("nombre"), obj.getString("password"));
		if (existe) {

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