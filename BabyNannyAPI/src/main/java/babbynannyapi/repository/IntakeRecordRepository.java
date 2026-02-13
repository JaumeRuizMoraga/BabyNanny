package babbynannyapi.repository;

import babbynannyapi.model.IntakeRecord;
import babbynannyapi.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

import babbynannyapi.model.Bebe;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IntakeRecordRepository extends MongoRepository<IntakeRecord, String> {

}
