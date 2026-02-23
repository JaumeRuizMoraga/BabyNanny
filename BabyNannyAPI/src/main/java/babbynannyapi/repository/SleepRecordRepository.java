package babbynannyapi.repository;

import babbynannyapi.model.IntakeRecord;
import babbynannyapi.model.SleepRecord;
import babbynannyapi.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

import babbynannyapi.model.Baby;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing SleepRecord entities in MongoDB.
 *
 * Extends MongoRepository to provide standard CRUD operations for SleepRecord documents.
 * Used to store and retrieve records of a Baby's sleep duration over time.
 */
public interface SleepRecordRepository extends MongoRepository<SleepRecord, String> {

}
