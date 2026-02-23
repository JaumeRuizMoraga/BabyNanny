package babbynannyapi.controller;

import babbynannyapi.model.*;
import babbynannyapi.repository.*;
import babbynannyapi.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;


/**
 * Controller responsible for handling all Baby-related API requests.
 *
 * This class manages creation, updates, deletion, and retrieval
 * of Baby entities, including associated records such as medical,
 * sleep, and intake records.
 */

@RestController
@RequestMapping("/BabyNanny")
public class Controller {

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
    
    @Autowired
    private EmailRepository emailRepository;
    
    @Autowired
    private FeaturesRecordRepository featuresRecordRepository;
    
    @Autowired
    private EmailService emailService;

/**
* Get method that allows to get all the babies registered by a user
*
* @param token token used to verify that the user is active
* @return responseEntity OK in case that the endpoint returns the babies, Unauthorized in case that the token is not on the database
* */
	@GetMapping("/babies")
	ResponseEntity<?> getBabies(@RequestParam(name = "token") String token) {
		Optional<Token> t = tokenRepository.searchToken(token);
		Map<String, List<Map<String, Object>>> response = new HashMap<>();
		if (t.isPresent()) {
			Optional<User> optionalUser = userRepository.findByName(t.get().getUser());
			if (optionalUser.isPresent()) {
				List<Baby> babyList = babyRepository.searchBabies(optionalUser.get().getId());
				List<Map<String, Object>> list = new ArrayList<>();
				System.out.println(babyList.size());
				for (Baby b : babyList) {
					list.add(createParsedBaby(b));
				}
				response.put("babies", list);
			}
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	/**
	 * Builds a structured representation of a Baby entity ready to be serialized
	 * and returned in an API response.
	 * @param b the Baby entity to be parsed and transformed
	 * @return a Map containing the serialized representation of the Baby and its related data
	 */
	public Map<String, Object> createParsedBaby(Baby b) {
		Map<String, Object> baby = new HashMap<>();
		baby.put("id",b.getId());
		baby.put("name",b.getName());
		baby.put("tutors",b.getTutors());
		baby.put("image",b.getImage());
		baby.put("intakeRecord",intakeRecordRepository.findAllById(b.getIntakeRecord()));
		baby.put("medicalRecord",medicalRecordRepository.findAllById(b.getMedicalRecord()));
		baby.put("sleepRecord",sleepRecordRepository.findAllById(b.getSleepRecord()));
		baby.put("features",b.getFeatures());
		baby.put("featuresRecord",featuresRecordRepository.findAllById(b.getFeaturesRecord()));
		baby.put("events",b.getEvents());
		return baby;
	}

	/**
	 * Returns the user linked to the given token.
	 *
	 * If the token exists, the method looks up the related User
	 * and returns it in the response body.
	 * If the token is not valid, it returns 401 Unauthorized.
	 *
	 * @param token authentication token received as a request parameter
	 * @return 200 OK with the user (as Optional) if valid,
	 *         or 401 Unauthorized if the token is not found
	 */
	@GetMapping("/getUser")
	ResponseEntity<Object> searchUser(@RequestParam(name = "token") String token){
		Optional<Token> t = tokenRepository.searchToken(token);
		if (t.isPresent()) {
			Optional<User> user = userRepository.findByName(t.get().getUser());
			return ResponseEntity.status(HttpStatus.OK).body(user);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	/**
	 * Deletes a Baby entity identified by its ID.
	 *
	 * The request must include a valid authentication token in the header.
	 * If the token exists, the method retrieves the Baby, removes its
	 * association with the user, and deletes it from the database.
	 *
	 * If the token is not valid, the request is rejected with 401 Unauthorized.
	 *
	 * @param id    the identifier of the Baby to delete
	 * @param token authentication token provided in the request header
	 * @return 204 No Content if deletion succeeds,
	 *         or 401 Unauthorized if the token is invalid
	 */

	@DeleteMapping("/deleteBaby/{id}")
    public ResponseEntity<Void> deleteBaby(@PathVariable String id, @RequestHeader String token) {
		Optional<Token> t = tokenRepository.searchToken(token);
		if(t.isPresent()){
			Optional<Baby> optionalBaby = babyRepository.findById(id);
			Baby baby = optionalBaby.get();
			deleteBabyFromUser(baby);
			babyRepository.deleteById(id);
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
    }

	/**
	 * Removes the given Baby from all users listed as its tutors.
	 *
	 * For each tutor username stored in the Baby entity, the method
	 * looks up the corresponding User. If the user exists and contains
	 * the Baby's ID in their babies list, the ID is removed and the
	 * updated User entity is saved.
	 * @param baby the Baby entity whose references must be removed
	 */
	
	@PutMapping
	public void deleteBabyFromUser(Baby baby) {
		List<String> userList = baby.getTutors();
		for(String s : userList) {
			Optional<User> optionalUser = userRepository.findByName(s);
			if (optionalUser.isPresent()) {
				User user = optionalUser.get();
				List<String> babyList = user.getBabies();
				boolean removed = babyList.remove(baby.getId());
				if (removed) {
	                user.setBabies(new ArrayList<>(babyList));
	                userRepository.save(user);
	            }
				else{
					System.out.println("The baby does not exist");
				}
			}
		}
    }

	/**
	 * Updates the image of a Baby identified by its ID.
	 *
	 * The request must include a valid authentication token in the header.
	 * If the token exists, the method retrieves the Baby entity,
	 * updates its image field with the value received in the request body,
	 * and saves the changes.
	 *
	 * If the token is invalid, the request is rejected with 401 Unauthorized.
	 *
	 * @param id    the identifier of the Baby whose image will be updated
	 * @param token authentication token provided in the request header
	 * @param image request body containing the new image value
	 * @return 204 No Content if the update succeeds,
	 *         or 401 Unauthorized if the token is invalid
	 */

	@PutMapping("/changeImage/{id}")
	public ResponseEntity<Object> changeImage(@PathVariable String id, @RequestHeader String token, @RequestBody Map<String, Object> image) {
		Optional<Token> t = tokenRepository.searchToken(token);
		if(t.isPresent()){
			Optional<Baby> optionalBaby = babyRepository.findById(id);
			Baby baby = optionalBaby.get();
			baby.setImage(image.get("image").toString());
			babyRepository.save(baby);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
    }

	/**
	 * Creates or updates the event information of a Baby identified by its ID.
	 *
	 * The request requires a valid authentication token in the header.
	 * If the token exists, the method retrieves the Baby entity,
	 * sets its event data using the Event object received in the request body,
	 * and saves the updated entity.
	 *
	 * If the token is invalid, the request is rejected with 401 Unauthorized.
	 *
	 * @param id     the identifier of the Baby whose event data will be updated
	 * @param token  authentication token provided in the request header
	 * @param events Event object received in the request body
	 * @return 204 No Content if the operation succeeds,
	 *         or 401 Unauthorized if the token is invalid
	 */

	@PutMapping("/createEvent/{id}")
	public ResponseEntity<Object> changeImage(@PathVariable String id, @RequestHeader String token, @RequestBody Event events) {
		Optional<Token> t = tokenRepository.searchToken(token);
		if(t.isPresent()){
			Optional<Baby> optionalBaby = babyRepository.findById(id);
			Baby baby = optionalBaby.get();
			baby.setEvents(events);
			babyRepository.save(baby);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
    }

	/**
	 * Updates the configuration settings of a User identified by its ID.
	 *
	 * The request must include a valid authentication token in the header.
	 * If the token exists, the method retrieves the User entity,
	 * replaces its configuration with the data received in the request body,
	 * and saves the updated entity.
	 *
	 * If the token is invalid, the request is rejected with 401 Unauthorized.
	 *
	 * @param id     the identifier of the User whose configuration will be updated
	 * @param token  authentication token provided in the request header
	 * @param config map containing the new configuration values
	 * @return 204 No Content if the update succeeds,
	 *         or 401 Unauthorized if the token is invalid
	 */

	@PutMapping("/changeConfig/{id}")
	public ResponseEntity<Object> changeConfig(@PathVariable String id, @RequestHeader String token, @RequestBody Map<String, Object> config) {
		Optional<Token> t = tokenRepository.searchToken(token);
		if(t.isPresent()){
			Optional<User> optionalUser = userRepository.findById(id);
			User user = optionalUser.get();
			user.setConfig(config);
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	/**
	 * Updates the features of a Baby and records the previous features.
	 *
	 * The request requires a valid authentication token in the header.
	 * If the token exists, the method retrieves the Baby entity,
	 * creates a new FeaturesRecord to store the current features,
	 * adds it to the Baby's feature history, updates the Baby's features
	 * with the new data from the request body, and saves the Baby entity.
	 *
	 * If the token is invalid, the request is rejected with 401 Unauthorized.
	 *
	 * @param id       the identifier of the Baby whose features will be updated
	 * @param token    authentication token provided in the request header
	 * @param features new features data received in the request body
	 * @return 204 No Content if the update succeeds,
	 *         or 401 Unauthorized if the token is invalid
	 */

	@PutMapping("/updateFeatures/{id}")
	public ResponseEntity<Object> updateFeatures(@PathVariable String id, @RequestHeader String token, @RequestBody Features features) {
		Optional<Token> t = tokenRepository.searchToken(token);
		if(t.isPresent()){
			Optional<Baby> optionalBaby = babyRepository.findById(id);
			Baby baby = optionalBaby.get();
			FeaturesRecord fRecord = new FeaturesRecord(baby.getFeatures());
			featuresRecordRepository.save(fRecord);
			List<String> featuresList= baby.getFeaturesRecord();
			featuresList.add(fRecord.getId());
            baby.setFeaturesRecord(featuresList);
			baby.setFeatures(features);
			babyRepository.save(baby);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	/**
	 * Logs out a user by deleting their authentication token.
	 *
	 * The method receives the token ID as a path variable. If the token exists,
	 * it is removed from the repository, effectively logging the user out.
	 * If the token does not exist, the request is rejected with 401 Unauthorized.
	 *
	 * @param id the identifier of the token to delete
	 * @return 204 No Content if the token is deleted successfully,
	 *         or 401 Unauthorized if the token is not found
	 */

	@DeleteMapping("/logOut/{id}")
    public ResponseEntity<Void> logOut(@PathVariable String id) {
		Optional<Token> t = tokenRepository.findById(id);
		if(t.isPresent()){
			tokenRepository.deleteById(id);
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
    }

	/**
	 * Adds a new record (intake, medical, or sleep) to a Baby.
	 *
	 * The request requires a valid authentication token in the header.
	 * The request body must include a "type" field indicating the record type
	 * ("intakeRecord", "medicalRecord", or "sleepRecord") and the necessary data
	 * for that record.
	 *
	 * If the token is valid and the Baby exists, a new record is created,
	 * saved in the corresponding repository, and its ID is added to the Baby's
	 * list of records. The Baby entity is then updated.
	 *
	 * Responses:
	 * - 200 OK: The record was added successfully.
	 * - 404 Not Found: The Baby with the given ID does not exist.
	 * - 401 Unauthorized: The token is invalid.
	 *
	 * @param id    the identifier of the Baby to update
	 * @param token authentication token provided in the request header
	 * @param obj   map containing the record type and data
	 * @return ResponseEntity with the appropriate HTTP status code
	 */

	@PutMapping("/newEntry/{id}")
	ResponseEntity<Object> newEntry(@PathVariable String id, @RequestHeader String token, @RequestBody Map<String, Object> obj) {
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
     * Creates a new token in the database with the information provided in the request body.
     * @param user The user object containing the registration details.
     * @return a {@code ResponseEntity} with HTTP 200 OK if the baby is created successfully, 
     * or HTTP 401 Unauthorized if the user don't have a correct token.
     */
	
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody User user){
        Optional<User> userObj = userRepository.findByNameAndPassword(user.getName(), user.getPassword());
        Optional<Token> userToken = tokenRepository.searchUserToken(user.getName());
        if (userObj.isPresent()) {
            if (userToken.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(userToken.get());
            } else {
                Token token = new Token(user.getName());
                tokenRepository.save(token);
                return ResponseEntity.status(HttpStatus.OK).body(token);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    
    /**
     * Creates a new baby in the database with the information provided in the request body.
     * @param baby The baby object containing the baby information.
     * @param token A identification for the user.
     * @return a {@code ResponseEntity} with HTTP 200 OK if the baby is created successfully, 
     * or HTTP 401 Unauthorized if the user don't have a correct token.
     */
    @PostMapping("/newBaby")
    public ResponseEntity<Object> newBaby(@RequestBody Baby baby, @RequestHeader String token){
    	Optional<Token> t = tokenRepository.searchToken(token);
    	if (t.isPresent()) {
            Optional<User> optionalUser = userRepository.findByName(t.get().getUser());
            User user = optionalUser.get();
            List<String> babyList;
            List<String> userList = baby.getTutors();
            userList.add(user.getId());
            baby.setTutors(userList);
            babyList = user.getBabies();
            babyRepository.save(baby);
            babyList.add(baby.getId());
            user.setBabies(babyList);
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
	 * Creates a new user in the database with the information provided in the
	 * request body.
	 * 
	 * @param user The user object containing the registration details.
	 * @return a {@code ResponseEntity} with HTTP 200 OK if the user is created
	 *         successfully, or HTTP 403 Forbidden if the user already exists.
	 */
	@PostMapping("/register")
	ResponseEntity<?> register(@RequestBody User user) {
		Optional<User> newUser = userRepository.findByName(user.getName());
		Optional<User> newEmail = userRepository.findByEmail(user.getEmail());
		if (newUser.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} else {
			if (newEmail.isPresent()) {
				
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			}
			else {
				String code = createCode();
				emailService.sendConfirmationEmail(user.getEmail(), code );
				Emails email = new Emails(code,user.getEmail());
				emailRepository.save(email);
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			}
		}
	}

	/**
	 * Verifies a registration or confirmation code for a new user.
	 *
	 * The request body must include a User object, and the code is passed
	 * in the request header.
	 * @param user the User object from the request body containing registration details
	 * @param code the verification code sent in the request header
	 * @return ResponseEntity with 200 OK and Token if successful,
	 *         or 401 Unauthorized if verification fails
	 */

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody User user,@RequestHeader String code) {
    	Optional<User> newUser = userRepository.findByName(user.getName());
		Optional<User> newEmail = userRepository.findByEmail(user.getName());
		Optional<Emails> email = emailRepository.findByCodeAndEmail(code,user.getEmail());
		if (newUser.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		} else {
			if (newEmail.isPresent()) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			}
			else {
				if(email.isPresent()) {
					Emails deleteEmail = email.get();
					Token token = new Token(user.getName());
					userRepository.save(user);
					tokenRepository.save(token);
					emailRepository.delete(deleteEmail);
					return ResponseEntity.status(HttpStatus.OK).body(token);
				}
				else {
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
				}
			}
		}
    }

	/**
	 * Generates a random 6-digit numeric code as a String.
	 * @return a 6-digit random code as a String
	 */

    public String createCode() {
        int numero = ThreadLocalRandom.current().nextInt(100000, 1000000);
        return String.valueOf(numero);
    }
}
