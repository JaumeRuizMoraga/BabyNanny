package babbynannyapi.controller;

import babbynannyapi.model.*;
import babbynannyapi.repository.*;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/BabyNanny")
public class Controlador {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TokenRepository tokenRepository;

	@Autowired
	private BabyRepository babyRepository;

    @Autowired
    private IntakeRecordRepository intakeRecordRepository;

    @Autowired
    private SleepRecordRepository sleepRecordRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;


	@GetMapping("/babies")
	ResponseEntity<Object> buscarBebes(@RequestParam(name = "token") String token){
		Optional<Token> t = tokenRepository.searchToken(token);
		if (t.isPresent()) {
			List<Baby> babyList = babyRepository.searchBabies(t.get().getUser());
		    Map<String, List<Baby>> response = new HashMap<>();
		    response.put("babies", babyList);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}
	
	@DeleteMapping("/deleteBaby/{id}")
    public ResponseEntity<Void> deleteBaby(@PathVariable String id, @RequestHeader String token) {
		Optional<Token> t = tokenRepository.searchToken(token);
		if(t.isPresent()){
			babyRepository.deleteById(id);
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
    }


	@PutMapping("/newEntry/{id}")
	ResponseEntity<Object> newEntry(@PathVariable String id, @RequestHeader String token, @RequestBody Map<String, Object> obj) throws JSONException {
		Optional<Token> t = tokenRepository.searchToken(token);

		if (t.isPresent()) {
			Optional<Baby> b = babyRepository.findById(id);
            List<String> babyList;

            if (b.isPresent()) {
                String type = (String) obj.get("type");

                switch (type) {
                    case "intakeRecord" : {
                        IntakeRecord irecord = new IntakeRecord();
                        irecord.setDate(new Date());
                        irecord.setIntakeAmount(Double.parseDouble(obj.get("amount").toString()));
                        intakeRecordRepository.save(irecord);
                        babyList= b.get().getIntakeRecord();
                        babyList.add(irecord.getId());
                        b.get().setIntakeRecord(babyList);
                        babyRepository.save(b.get());
                        return ResponseEntity.status(HttpStatus.OK).build();

                    }
                    case "medicalRecord" : {
                        MedicalRecord mrecord = new MedicalRecord();
                        Recipe recipe = new Recipe();
                        recipe.setDosisTime(Integer.parseInt(obj.get("dosisTime").toString()));
                        recipe.setDosis(Double.parseDouble(obj.get("dosis").toString()));
                        recipe.setMedicine(obj.get("medicine").toString());
                        mrecord.setDate(new Date());
                        mrecord.setRecipe(recipe);
                        medicalRecordRepository.save(mrecord);
                        babyList= b.get().getMedicalRecord();
                        babyList.add(mrecord.getId());
                        b.get().setMedicalRecord(babyList);
                        babyRepository.save(b.get());
                        return ResponseEntity.status(HttpStatus.OK).build();
                    }
                    case "sleepRecord" : {
                        SleepRecord srecord = new SleepRecord();
                        srecord.setDate(new Date());
                        srecord.setTimeSleep(Double.parseDouble(obj.get("timeSleep").toString()));
                        sleepRecordRepository.save(srecord);
                        babyList= b.get().getSleepRecord();
                        babyList.add(srecord.getId());
                        b.get().setSleepRecord(babyList);
                        babyRepository.save(b.get());
                        return ResponseEntity.status(HttpStatus.OK).build();
                    }
                }
            }
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}
    /**
     * Función utilitzada para que un usuario haga login y se le genere un token
     *
     * @param user
     * @return ResponseEntity<?>
     */
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user){
        Optional<User> userObj = userRepository.findByNameAndPassword(user.getName(), user.getPassword());
        Optional<Token> userToken = tokenRepository.searchUserToken(user.getName());
        if (userObj.isPresent()) {
            if (userToken.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(userToken.get().getToken());
            } else {
                Token token = new Token(user.getName());
                tokenRepository.save(token);
                return ResponseEntity.status(HttpStatus.OK).body(token);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    @PostMapping("/newBaby")
    public ResponseEntity<Object> newBaby(@RequestBody Baby baby, @RequestHeader String token){
    	Optional<Token> t = tokenRepository.searchToken(token);
    	if (t.isPresent()) {
    		babyRepository.save(baby);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
     * Función utilitzada pera registrar un usuario en la base de datos
     * @param user
     * @return ResponseEntity<?>
     */
    @PostMapping("/register")
    ResponseEntity<?> registro(@RequestBody User user) {
        Optional<User> userPassEmail = userRepository.searchUserPassEmail(user.getName(), user.getPassword(), user.getEmail());
        if (userPassEmail.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        else {
        	userRepository.save(user);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
    }
}