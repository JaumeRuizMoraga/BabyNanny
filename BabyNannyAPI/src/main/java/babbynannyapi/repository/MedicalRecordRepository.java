package babbynannyapi.repository;

import babbynannyapi.model.IntakeRecord;
import babbynannyapi.model.MedicalRecord;
import babbynannyapi.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

import babbynannyapi.model.Baby;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing MedicalRecord entities in MongoDB.
 *
 * Extends MongoRepository to provide standard CRUD operations for MedicalRecord documents.
 * Includes a custom query method (though note it may need correction) intended to find
 * medical records associated with a specific tutor.
 */
public interface MedicalRecordRepository extends MongoRepository<MedicalRecord, String> {

}
