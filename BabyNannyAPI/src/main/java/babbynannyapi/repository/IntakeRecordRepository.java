package babbynannyapi.repository;

import babbynannyapi.model.IntakeRecord;
import babbynannyapi.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

import babbynannyapi.model.Baby;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing IntakeRecord entities in MongoDB.
 *
 * Extends MongoRepository to provide standard CRUD operations for IntakeRecord documents.
 * Used to store and retrieve records of a Baby's intake (e.g., milk or food amounts).
 */
public interface IntakeRecordRepository extends MongoRepository<IntakeRecord, String> {

}
