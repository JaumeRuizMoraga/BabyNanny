package babbynannyapi.controller;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.ArrayList;

@RestController
public class Controlador {
    @RequestMapping("/APIpelis")
        //PLANTILLAS
    String home() {
        return "Hola món!";
    }

    @PostMapping("verne/registro")
    ResponseEntity<Object> registro(@RequestBody String cuerpoPeticion) throws JSONException, IOException {
        JSONObject obj = new JSONObject(cuerpoPeticion);


        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}