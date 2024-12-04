package project.map.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.map.entity.TripEntity;

@Repository
public interface TripRepository extends JpaRepository<TripEntity, Integer> {

	
}
