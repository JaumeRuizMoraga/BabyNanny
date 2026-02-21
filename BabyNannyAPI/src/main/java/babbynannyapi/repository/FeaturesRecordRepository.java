package babbynannyapi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import babbynannyapi.model.FeaturesRecord;


public interface FeaturesRecordRepository extends MongoRepository<FeaturesRecord, String> {

}
