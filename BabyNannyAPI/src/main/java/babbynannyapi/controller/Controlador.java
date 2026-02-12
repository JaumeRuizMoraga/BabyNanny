package babbynannyapi.controller;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import babbynannyapi.repository.UsuarioRepository;

import java.io.*;
import java.util.ArrayList;

@RestController
public class Controlador {
	@RequestMapping("/BabyNanny")

	String home() {
		return "Hola món!";
	}

	@Autowired
	private UsuarioRepository usuarioRepository;

	@PostMapping("/login")
	public ResponseEntity<Object> login(@RequestBody String cuerpoPeticion) throws JSONException {
		JSONObject obj = new JSONObject(cuerpoPeticion);
		boolean existe = usuarioRepository.buscarUsuario(obj.getString("name"), obj.getString("pwss"));
		if (existe) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
	}

	@PostMapping("/register")
	ResponseEntity<Object> registro(@RequestBody String cuerpoPeticion) throws JSONException, IOException {
		JSONObject obj = new JSONObject(cuerpoPeticion);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}