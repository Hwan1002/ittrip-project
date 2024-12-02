package project.map.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.map.entity.MapEntity;

@Repository
public interface MapRepository extends JpaRepository<MapEntity, String>{

}
