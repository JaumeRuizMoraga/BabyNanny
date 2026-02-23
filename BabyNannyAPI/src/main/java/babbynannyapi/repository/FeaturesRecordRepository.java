package babbynannyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import babbynannyapi.model.FeaturesRecord;

/**
 * Repository interface for managing FeaturesRecord entities in MongoDB.
 *
 * Extends MongoRepository to provide standard CRUD operations for FeaturesRecord documents.
 * Used to store and retrieve historical snapshots of a Baby's features over time.
 */
public interface FeaturesRecordRepository extends MongoRepository<FeaturesRecord, String> {

}
